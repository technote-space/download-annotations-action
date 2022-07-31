import type { components } from '@octokit/openapi-types';
export declare type AnnotationData = components['schemas']['check-annotation'];
export declare type JobData = components['schemas']['job'];
export declare type Annotation = {
    job: JobData;
    annotations: Array<AnnotationData>;
};
export declare type Annotations = Array<Annotation>;
export declare type AnnotationResult = {
    job: Pick<JobData, 'id' | 'run_id' | 'status' | 'conclusion' | 'name'>;
    annotations: Array<AnnotationData>;
};
