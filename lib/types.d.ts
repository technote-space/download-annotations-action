import type { components } from '@technote-space/github-action-helper';
export type AnnotationData = components['schemas']['check-annotation'];
export type JobData = components['schemas']['job'];
export type Annotation = {
    job: JobData;
    annotations: Array<AnnotationData>;
};
export type Annotations = Array<Annotation>;
export type AnnotationResult = {
    job: Pick<JobData, 'id' | 'run_id' | 'status' | 'conclusion' | 'name'>;
    annotations: Array<AnnotationData>;
};
