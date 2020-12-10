"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const misc_1 = require("./misc");
const createFile = (workspace, filename, resultFilename, annotations, logger) => {
    if (!fs_1.existsSync(workspace)) {
        fs_1.mkdirSync(workspace, { recursive: true });
    }
    const annotationsArray = misc_1.convertAnnotationData(annotations);
    if (filename) {
        fs_1.writeFileSync(path_1.resolve(workspace, filename), JSON.stringify(annotationsArray));
        misc_1.setResult('ANNOTATIONS_PATH', path_1.resolve(workspace, filename), logger);
    }
    if (resultFilename) {
        fs_1.writeFileSync(path_1.resolve(workspace, resultFilename), JSON.stringify(annotations.map(misc_1.convertAnnotationResult)));
        misc_1.setResult('ANNOTATIONS_RESULT_PATH', path_1.resolve(workspace, resultFilename), logger);
    }
    misc_1.setResult('ANNOTATIONS_NUMBER', annotationsArray.length, logger);
    misc_1.setResult('ANNOTATION_MESSAGES', annotationsArray.map(annotation => annotation.message).join('\n'), logger);
};
exports.createFile = createFile;
