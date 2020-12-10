import {mkdirSync, existsSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {convertAnnotationData, convertAnnotationResult} from './misc';
import {Annotations} from '../types';
import {setOutput} from '@actions/core';

export const createFile = (workspace: string, filename: string, resultFilename: string, annotations: Annotations): void => {
  if (!existsSync(workspace)) {
    mkdirSync(workspace, {recursive: true});
  }

  if (filename) {
    writeFileSync(resolve(workspace, filename), JSON.stringify(convertAnnotationData(annotations)));
    setOutput('ANNOTATIONS_PATH', resolve(workspace, filename));
  }

  if (resultFilename) {
    writeFileSync(resolve(workspace, resultFilename), JSON.stringify(annotations.map(convertAnnotationResult)));
    setOutput('ANNOTATIONS_RESULT_PATH', resolve(workspace, resultFilename));
  }
};
