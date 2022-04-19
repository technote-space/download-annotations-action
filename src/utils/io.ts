import fs from 'fs';
import { resolve } from 'path';
import { convertAnnotationData, convertAnnotationResult, setResult } from './misc';
import { Annotations } from '../types';
import { Utils } from '@technote-space/github-action-helper';
import { Logger } from '@technote-space/github-action-log-helper';

export const createFile = (workspace: string, filename: string, resultFilename: string, annotations: Annotations, logger: Logger): void => {
  if (!fs.existsSync(workspace)) {
    fs.mkdirSync(workspace, { recursive: true });
  }

  const annotationsArray = convertAnnotationData(annotations);
  if (filename) {
    fs.writeFileSync(resolve(workspace, filename), JSON.stringify(annotationsArray));
    setResult('path', resolve(workspace, filename), logger);
  }

  if (resultFilename) {
    fs.writeFileSync(resolve(workspace, resultFilename), JSON.stringify(annotations.map(convertAnnotationResult)));
    setResult('result_path', resolve(workspace, resultFilename), logger);
  }

  setResult('number', annotationsArray.length, logger);
  setResult('messages', JSON.stringify(annotationsArray.map(annotation => Utils.ensureNotNull(annotation.message).trim())), logger);
};
