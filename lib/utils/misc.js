"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAnnotationData = exports.convertAnnotationResult = void 0;
const convertAnnotationResult = (annotation) => ({
    job: {
        'id': annotation.job.id,
        'run_id': annotation.job.run_id,
        'status': annotation.job.status,
        'conclusion': annotation.job.conclusion,
        'name': annotation.job.name,
    },
    annotations: annotation.annotations,
});
exports.convertAnnotationResult = convertAnnotationResult;
const convertAnnotationData = (annotations) => annotations.flatMap(annotation => annotation.annotations);
exports.convertAnnotationData = convertAnnotationData;
