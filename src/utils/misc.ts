import {Annotation, Annotations, AnnotationData, AnnotationResult} from '../types';

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
