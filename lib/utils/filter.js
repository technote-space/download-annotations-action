"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByMessage = exports.filterByLevel = exports.filterByJobName = void 0;
const github_action_helper_1 = require("@technote-space/github-action-helper");
const multimatch = (value, patterns, flags) => patterns.some(pattern => new RegExp(pattern, flags).test(value));
const isMatched = (value, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags) => {
    if (!value) {
        return !includePatterns.length;
    }
    return (!includePatterns.length || multimatch(value, includePatterns, includePatternFlags)) && (!excludePatterns.length || !multimatch(value, excludePatterns, excludePatternFlags));
};
const filterByJobName = (annotations, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags) => annotations.filter(annotation => isMatched(annotation.job.name, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags));
exports.filterByJobName = filterByJobName;
const filterByLevel = (annotations, includeLevels, excludeLevels) => annotations.map(annotation => ({
    job: annotation.job,
    annotations: annotation.annotations.filter(annotation => (!includeLevels.length || includeLevels.includes(github_action_helper_1.Utils.ensureNotNull(annotation.annotation_level))) && !excludeLevels.includes(github_action_helper_1.Utils.ensureNotNull(annotation.annotation_level))),
}));
exports.filterByLevel = filterByLevel;
const filterByMessage = (annotations, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags) => {
    return annotations.map(annotation => ({
        job: annotation.job,
        annotations: annotation.annotations.filter(annotation => isMatched(annotation.message, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags)),
    }));
};
exports.filterByMessage = filterByMessage;
