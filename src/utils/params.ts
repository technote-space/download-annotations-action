import {Options} from 'multimatch';
import {getInput} from '@actions/core' ;
import {Utils} from '@technote-space/github-action-helper';
import {Context} from '@actions/github/lib/context';

export const getMatchOptions = (): Options => ({
  nobrace: Utils.getBoolValue(getInput('MINIMATCH_OPTION_NOBRACE')),
  noglobstar: Utils.getBoolValue(getInput('MINIMATCH_OPTION_NOGLOBSTAR')),
  dot: Utils.getBoolValue(getInput('MINIMATCH_OPTION_DOT')),
  noext: Utils.getBoolValue(getInput('MINIMATCH_OPTION_NOEXT')),
  nocase: Utils.getBoolValue(getInput('MINIMATCH_OPTION_NOCASE')),
  matchBase: Utils.getBoolValue(getInput('MINIMATCH_OPTION_MATCH_BASE')),
  nonegate: Utils.getBoolValue(getInput('MINIMATCH_OPTION_NONEGATE')),
});

export const getTargetRunId            = (context: Context): number => /^\d+$/.test(getInput('TARGET_RUN_ID')) ? Number(getInput('TARGET_RUN_ID')) : context.runId;
export const getWorkspace              = (): string => getInput('WORKSPACE');
export const getFilename               = (): string => getInput('FILENAME');
export const getResultFilename         = (): string => getInput('RESULT_FILENAME');
export const getIncludeJobNamePatterns = (): Array<string> => Utils.getArrayInput('INCLUDE_JOB_NAME_PATTERNS');
export const getExcludeJobNamePatterns = (): Array<string> => Utils.getArrayInput('EXCLUDE_JOB_NAME_PATTERNS');
export const getIncludeLevels          = (): Array<string> => Utils.getArrayInput('INCLUDE_LEVELS');
export const getExcludeLevels          = (): Array<string> => Utils.getArrayInput('EXCLUDE_LEVELS');
export const getIncludeMessagePatterns = (): Array<string> => Utils.getArrayInput('INCLUDE_MESSAGE_PATTERNS');
export const getExcludeMessagePatterns = (): Array<string> => Utils.getArrayInput('EXCLUDE_MESSAGE_PATTERNS');
