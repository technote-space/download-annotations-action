import type { Annotations } from '../types';
import { Utils } from '@technote-space/github-action-helper';

const multimatch = (value: string, patterns: Array<string>, flags?: string): boolean => patterns.some(pattern => new RegExp(pattern, flags).test(value));
const isMatched  = (value: string | null, includePatterns: Array<string>, excludePatterns: Array<string>, includePatternFlags?: string, excludePatternFlags?: string): boolean => {
  if (!value) {
    return !includePatterns.length;
  }

  return (!includePatterns.length || multimatch(value, includePatterns, includePatternFlags)) && (!excludePatterns.length || !multimatch(value, excludePatterns, excludePatternFlags));
};

export const filterByJobName = (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, includePatternFlags?: string, excludePatternFlags?: string): Annotations => annotations.filter(
  annotation => isMatched(annotation.job.name, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags),
);

export const filterByLevel = (annotations: Annotations, includeLevels: Array<string>, excludeLevels: Array<string>): Annotations => annotations.map(
  annotation => ({
    job: annotation.job,
    annotations: annotation.annotations.filter(annotation => (!includeLevels.length || includeLevels.includes(Utils.ensureNotNull(annotation.annotation_level))) && !excludeLevels.includes(Utils.ensureNotNull(annotation.annotation_level))),
  }),
);

export const filterByMessage = (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, includePatternFlags?: string, excludePatternFlags?: string): Annotations => {
  return annotations.map(
    annotation => ({
      job: annotation.job,
      annotations: annotation.annotations.filter(annotation => isMatched(annotation.message, includePatterns, excludePatterns, includePatternFlags, excludePatternFlags)),
    }),
  );
};
