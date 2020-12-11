"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExcludeMessagePatterns = exports.getIncludeMessagePatterns = exports.getExcludeLevels = exports.getIncludeLevels = exports.getExcludeJobNamePatterns = exports.getIncludeJobNamePatterns = exports.getResultFilename = exports.getFilename = exports.getWorkspace = exports.getTargetRunId = exports.getMatchOptions = void 0;
const core_1 = require("@actions/core");
const github_action_helper_1 = require("@technote-space/github-action-helper");
const getMatchOptions = () => ({
    nobrace: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_NOBRACE')),
    noglobstar: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_NOGLOBSTAR')),
    dot: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_DOT')),
    noext: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_NOEXT')),
    nocase: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_NOCASE')),
    matchBase: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_MATCH_BASE')),
    nonegate: github_action_helper_1.Utils.getBoolValue(core_1.getInput('MINIMATCH_OPTION_NONEGATE')),
});
exports.getMatchOptions = getMatchOptions;
const getTargetRunId = (context) => /^\d+$/.test(core_1.getInput('TARGET_RUN_ID')) ? Number(core_1.getInput('TARGET_RUN_ID')) : context.runId;
exports.getTargetRunId = getTargetRunId;
const getWorkspace = () => core_1.getInput('WORKSPACE');
exports.getWorkspace = getWorkspace;
const getFilename = () => core_1.getInput('FILENAME');
exports.getFilename = getFilename;
const getResultFilename = () => core_1.getInput('RESULT_FILENAME');
exports.getResultFilename = getResultFilename;
const getIncludeJobNamePatterns = () => github_action_helper_1.Utils.getArrayInput('INCLUDE_JOB_NAME_PATTERNS');
exports.getIncludeJobNamePatterns = getIncludeJobNamePatterns;
const getExcludeJobNamePatterns = () => github_action_helper_1.Utils.getArrayInput('EXCLUDE_JOB_NAME_PATTERNS');
exports.getExcludeJobNamePatterns = getExcludeJobNamePatterns;
const getIncludeLevels = () => github_action_helper_1.Utils.getArrayInput('INCLUDE_LEVELS');
exports.getIncludeLevels = getIncludeLevels;
const getExcludeLevels = () => github_action_helper_1.Utils.getArrayInput('EXCLUDE_LEVELS');
exports.getExcludeLevels = getExcludeLevels;
const getIncludeMessagePatterns = () => github_action_helper_1.Utils.getArrayInput('INCLUDE_MESSAGE_PATTERNS');
exports.getIncludeMessagePatterns = getIncludeMessagePatterns;
const getExcludeMessagePatterns = () => github_action_helper_1.Utils.getArrayInput('EXCLUDE_MESSAGE_PATTERNS');
exports.getExcludeMessagePatterns = getExcludeMessagePatterns;
