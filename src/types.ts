import type { components } from '@octokit/openapi-types';

export type AnnotationData = components['schemas']['check-annotation'];
export type JobData = components['schemas']['job'];
export type Annotation = { job: JobData; annotations: Array<AnnotationData> };
export type Annotations = Array<Annotation>;
export type AnnotationResult = {
  job: JobData;
  annotations: Array<AnnotationData>;
}
