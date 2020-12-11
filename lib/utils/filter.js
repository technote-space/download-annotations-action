"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByMessage = exports.filterByLevel = exports.filterByJobName = void 0;
const multimatch_1 = __importDefault(require("multimatch"));
const github_action_helper_1 = require("@technote-space/github-action-helper");
const escapeSlashes = (value) => value.replace(/\//g, '&#x2F;');
const isMatched = (value, includePatterns, excludePatterns, options) => {
    if (!value) {
        return !includePatterns.length;
    }
    return (!includePatterns.length || !!multimatch_1.default(escapeSlashes(value), includePatterns, options).length) && (!excludePatterns.length || !multimatch_1.default(escapeSlashes(value), excludePatterns, options).length);
};
const filterByJobName = (annotations, includePatterns, excludePatterns, options) => annotations.filter(annotation => isMatched(annotation.job.name, includePatterns, excludePatterns, options));
exports.filterByJobName = filterByJobName;
const filterByLevel = (annotations, includeLevels, excludeLevels) => annotations.map(annotation => ({
    job: annotation.job,
    annotations: annotation.annotations.filter(annotation => (!includeLevels.length || includeLevels.includes(github_action_helper_1.Utils.ensureNotNull(annotation.annotation_level))) && !excludeLevels.includes(github_action_helper_1.Utils.ensureNotNull(annotation.annotation_level))),
}));
exports.filterByLevel = filterByLevel;
const filterByMessage = (annotations, includePatterns, excludePatterns, options) => {
    return annotations.map(annotation => ({
        job: annotation.job,
        annotations: annotation.annotations.filter(annotation => isMatched(annotation.message, includePatterns, excludePatterns, options)),
    }));
};
exports.filterByMessage = filterByMessage;
