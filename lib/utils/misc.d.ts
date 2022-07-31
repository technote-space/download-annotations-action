import type { Annotation, Annotations, AnnotationData, AnnotationResult } from '../types';
import type { Logger } from '@technote-space/github-action-log-helper';
export declare const convertAnnotationResult: (annotation: Annotation) => AnnotationResult;
export declare const convertAnnotationData: (annotations: Annotations) => Array<AnnotationData>;
export declare const setResult: (name: string, value: any, logger: Logger) => void;
