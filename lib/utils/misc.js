"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResult = exports.convertAnnotationData = exports.convertAnnotationResult = void 0;
const core_1 = require("@actions/core");
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const setResult = (name, value, logger) => {
    logger.startProcess('%s:', name);
    console.log(value);
    (0, core_1.setOutput)(name, value);
};
exports.setResult = setResult;
