"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const misc_1 = require("./misc");
const core_1 = require("@actions/core");
const createFile = (workspace, filename, resultFilename, annotations) => {
    if (!fs_1.existsSync(workspace)) {
        fs_1.mkdirSync(workspace, { recursive: true });
    }
    if (filename) {
        fs_1.writeFileSync(path_1.resolve(workspace, filename), JSON.stringify(misc_1.convertAnnotationData(annotations)));
        core_1.setOutput('ANNOTATIONS_PATH', path_1.resolve(workspace, filename));
    }
    if (resultFilename) {
        fs_1.writeFileSync(path_1.resolve(workspace, resultFilename), JSON.stringify(annotations.map(misc_1.convertAnnotationResult)));
        core_1.setOutput('ANNOTATIONS_RESULT_PATH', path_1.resolve(workspace, resultFilename));
    }
};
exports.createFile = createFile;
