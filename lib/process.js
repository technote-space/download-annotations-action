"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const annotation_1 = require("./utils/annotation");
const filter_1 = require("./utils/filter");
const io_1 = require("./utils/io");
const misc_1 = require("./utils/misc");
const params_1 = require("./utils/params");
const execute = async (logger, octokit, context) => {
    logger.startProcess('Annotations:');
    const annotations = await annotation_1.getAnnotations(octokit, context);
    console.log(annotations.map(misc_1.convertAnnotationResult));
    logger.startProcess('Filtered Annotations:');
    const filtered = filter_1.filterByMessage(filter_1.filterByLevel(filter_1.filterByJobName(annotations, params_1.getIncludeJobNamePatterns(), params_1.getExcludeJobNamePatterns(), params_1.getMatchOptions()), params_1.getIncludeLevels(), params_1.getExcludeLevels()), params_1.getIncludeMessagePatterns(), params_1.getExcludeMessagePatterns(), params_1.getMatchOptions());
    console.log(filtered.map(misc_1.convertAnnotationResult));
    io_1.createFile(params_1.getWorkspace(), params_1.getFilename(), params_1.getResultFilename(), filtered, logger);
};
exports.execute = execute;
