import multimatch, {Options} from 'multimatch';
import {Utils} from '@technote-space/github-action-helper';
import {Annotations} from '../types';

const isMatched = (value: string | null, includePatterns: Array<string>, excludePatterns: Array<string>, options: Options): boolean => {
  if (!value) {
    return !includePatterns.length;
  }

  return (!includePatterns.length || !!multimatch(value, includePatterns, options).length) && (!excludePatterns.length || !multimatch(value, excludePatterns, options).length);
};

export const filterByJobName = (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, options: Options): Annotations => annotations.filter(
  annotation => isMatched(annotation.job.name, includePatterns, excludePatterns, options),
);

export const filterByLevel = (annotations: Annotations, includeLevels: Array<string>, excludeLevels: Array<string>): Annotations => annotations.map(
  annotation => ({
    job: annotation.job,
    annotations: annotation.annotations.filter(annotation => (!includeLevels.length || includeLevels.includes(Utils.ensureNotNull(annotation.annotation_level))) && !excludeLevels.includes(Utils.ensureNotNull(annotation.annotation_level))),
  }),
);

export const filterByMessage = (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, options: Options): Annotations => {
  return annotations.map(
    annotation => ({
      job: annotation.job,
      annotations: annotation.annotations.filter(annotation => isMatched(annotation.message, includePatterns, excludePatterns, options)),
    }),
  );
};
