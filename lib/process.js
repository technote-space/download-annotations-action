"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const annotation_1 = require("./utils/annotation");
const filter_1 = require("./utils/filter");
const io_1 = require("./utils/io");
const misc_1 = require("./utils/misc");
const params_1 = require("./utils/params");
const execute = async (logger, octokit, context) => {
    const settings = {
        includeJobNamePatterns: (0, params_1.getIncludeJobNamePatterns)(),
        excludeJobNamePatterns: (0, params_1.getExcludeJobNamePatterns)(),
        includeJobNamePatternFlags: (0, params_1.getIncludeJobNamePatternFlags)(),
        excludeJobNamePatternFlags: (0, params_1.getExcludeJobNamePatternFlags)(),
        includeLevels: (0, params_1.getIncludeLevels)(),
        excludeLevels: (0, params_1.getExcludeLevels)(),
        includeMessagePatterns: (0, params_1.getIncludeMessagePatterns)(),
        excludeMessagePatterns: (0, params_1.getExcludeMessagePatterns)(),
        includeMessagePatternFlags: (0, params_1.getIncludeMessagePatternFlags)(),
        excludeMessagePatternFlags: (0, params_1.getExcludeMessagePatternFlags)(),
    };
    logger.startProcess('Settings:');
    console.log(settings);
    logger.startProcess('Annotations:');
    const annotations = await (0, annotation_1.getAnnotations)(octokit, context);
    annotations.forEach(annotation => console.log((0, misc_1.convertAnnotationResult)(annotation)));
    logger.startProcess('Filtered Annotations:');
    const filtered = (0, filter_1.filterByMessage)((0, filter_1.filterByLevel)((0, filter_1.filterByJobName)(annotations, settings.includeJobNamePatterns, settings.excludeJobNamePatterns, settings.includeJobNamePatternFlags, settings.excludeJobNamePatternFlags), settings.includeLevels, settings.excludeLevels), settings.includeMessagePatterns, settings.excludeMessagePatterns, settings.includeMessagePatternFlags, settings.excludeMessagePatternFlags);
    filtered.forEach(annotation => console.log((0, misc_1.convertAnnotationResult)(annotation)));
    (0, io_1.createFile)((0, params_1.getWorkspace)(), (0, params_1.getFilename)(), (0, params_1.getResultFilename)(), filtered, logger);
};
exports.execute = execute;
