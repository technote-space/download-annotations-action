import {Context} from '@actions/github/lib/context';
import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {Logger} from '@technote-space/github-action-log-helper';
import {getAnnotations} from './utils/annotation';
import {filterByJobName, filterByLevel, filterByMessage} from './utils/filter';
import {createFile} from './utils/io';
import {convertAnnotationResult} from './utils/misc';
import {
  getWorkspace,
  getFilename,
  getResultFilename,
  getIncludeJobNamePatterns,
  getExcludeJobNamePatterns,
  getIncludeJobNamePatternFlags,
  getExcludeJobNamePatternFlags,
  getIncludeLevels,
  getExcludeLevels,
  getIncludeMessagePatterns,
  getExcludeMessagePatterns,
  getIncludeMessagePatternFlags,
  getExcludeMessagePatternFlags,
} from './utils/params';

export const execute = async(logger: Logger, octokit: Octokit, context: Context): Promise<void> => {
  logger.startProcess('Annotations:');
  const annotations = await getAnnotations(octokit, context);
  annotations.forEach(annotation => console.log(convertAnnotationResult(annotation)));

  logger.startProcess('Filtered Annotations:');
  const filtered = filterByMessage(
    filterByLevel(
      filterByJobName(
        annotations,
        getIncludeJobNamePatterns(),
        getExcludeJobNamePatterns(),
        getIncludeJobNamePatternFlags(),
        getExcludeJobNamePatternFlags(),
      ),
      getIncludeLevels(),
      getExcludeLevels(),
    ),
    getIncludeMessagePatterns(),
    getExcludeMessagePatterns(),
    getIncludeMessagePatternFlags(),
    getExcludeMessagePatternFlags(),
  );
  filtered.forEach(annotation => console.log(convertAnnotationResult(annotation)));

  createFile(getWorkspace(), getFilename(), getResultFilename(), filtered, logger);
};
