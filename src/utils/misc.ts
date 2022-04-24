import type { Annotation, Annotations, AnnotationData, AnnotationResult } from '../types';
import type { Logger } from '@technote-space/github-action-log-helper';
import { setOutput } from '@actions/core';

export const convertAnnotationResult = (annotation: Annotation): AnnotationResult => ({
  job: {
    'id': annotation.job.id,
    'run_id': annotation.job.run_id,
    'status': annotation.job.status,
    'conclusion': annotation.job.conclusion,
    'name': annotation.job.name,
  },
  annotations: annotation.annotations,
});
export const convertAnnotationData   = (annotations: Annotations): Array<AnnotationData> => annotations.flatMap(annotation => annotation.annotations);

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const setResult = (name: string, value: any, logger: Logger): void => {
  logger.startProcess('%s:', name);
  console.log(value);
  setOutput(name, value);
};
