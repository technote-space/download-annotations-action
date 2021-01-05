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
        includeJobNamePatterns: params_1.getIncludeJobNamePatterns(),
        excludeJobNamePatterns: params_1.getExcludeJobNamePatterns(),
        includeJobNamePatternFlags: params_1.getIncludeJobNamePatternFlags(),
        excludeJobNamePatternFlags: params_1.getExcludeJobNamePatternFlags(),
        includeLevels: params_1.getIncludeLevels(),
        excludeLevels: params_1.getExcludeLevels(),
        includeMessagePatterns: params_1.getIncludeMessagePatterns(),
        excludeMessagePatterns: params_1.getExcludeMessagePatterns(),
        includeMessagePatternFlags: params_1.getIncludeMessagePatternFlags(),
        excludeMessagePatternFlags: params_1.getExcludeMessagePatternFlags(),
    };
    logger.startProcess('Settings:');
    console.log(settings);
    logger.startProcess('Annotations:');
    const annotations = await annotation_1.getAnnotations(octokit, context);
    annotations.forEach(annotation => console.log(misc_1.convertAnnotationResult(annotation)));
    logger.startProcess('Filtered Annotations:');
    const filtered = filter_1.filterByMessage(filter_1.filterByLevel(filter_1.filterByJobName(annotations, settings.includeJobNamePatterns, settings.excludeJobNamePatterns, settings.includeJobNamePatternFlags, settings.excludeJobNamePatternFlags), settings.includeLevels, settings.excludeLevels), settings.includeMessagePatterns, settings.excludeMessagePatterns, settings.includeMessagePatternFlags, settings.excludeMessagePatternFlags);
    filtered.forEach(annotation => console.log(misc_1.convertAnnotationResult(annotation)));
    io_1.createFile(params_1.getWorkspace(), params_1.getFilename(), params_1.getResultFilename(), filtered, logger);
};
exports.execute = execute;
