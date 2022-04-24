import type { Context } from '@actions/github/lib/context';
import { getInput } from '@actions/core' ;
import { Utils } from '@technote-space/github-action-helper';

export const getTargetRunId                = (context: Context): number => /^\d+$/.test(getInput('TARGET_RUN_ID')) ? Number(getInput('TARGET_RUN_ID')) : context.runId;
export const getWorkspace                  = (): string => getInput('WORKSPACE');
export const getFilename                   = (): string => getInput('FILENAME');
export const getResultFilename             = (): string => getInput('RESULT_FILENAME');
export const getIncludeJobNamePatterns     = (): Array<string> => Utils.getArrayInput('INCLUDE_JOB_NAME_PATTERNS');
export const getExcludeJobNamePatterns     = (): Array<string> => Utils.getArrayInput('EXCLUDE_JOB_NAME_PATTERNS');
export const getIncludeJobNamePatternFlags = (): string => getInput('INCLUDE_JOB_NAME_PATTERN_FLAGS');
export const getExcludeJobNamePatternFlags = (): string => getInput('EXCLUDE_JOB_NAME_PATTERN_FLAGS');
export const getIncludeLevels              = (): Array<string> => Utils.getArrayInput('INCLUDE_LEVELS');
export const getExcludeLevels              = (): Array<string> => Utils.getArrayInput('EXCLUDE_LEVELS');
export const getIncludeMessagePatterns     = (): Array<string> => Utils.getArrayInput('INCLUDE_MESSAGE_PATTERNS');
export const getExcludeMessagePatterns     = (): Array<string> => Utils.getArrayInput('EXCLUDE_MESSAGE_PATTERNS');
export const getIncludeMessagePatternFlags = (): string => getInput('INCLUDE_MESSAGE_PATTERN_FLAGS');
export const getExcludeMessagePatternFlags = (): string => getInput('EXCLUDE_MESSAGE_PATTERN_FLAGS');
