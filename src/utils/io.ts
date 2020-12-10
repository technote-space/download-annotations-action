import {mkdirSync, existsSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {convertAnnotationData, convertAnnotationResult, setResult} from './misc';
import {Annotations} from '../types';
import {Logger} from '@technote-space/github-action-log-helper';

export const createFile = (workspace: string, filename: string, resultFilename: string, annotations: Annotations, logger: Logger): void => {
  if (!existsSync(workspace)) {
    mkdirSync(workspace, {recursive: true});
  }

  const annotationsArray = convertAnnotationData(annotations);
  if (filename) {
    writeFileSync(resolve(workspace, filename), JSON.stringify(annotationsArray));
    setResult('ANNOTATIONS_PATH', resolve(workspace, filename), logger);
  }

  if (resultFilename) {
    writeFileSync(resolve(workspace, resultFilename), JSON.stringify(annotations.map(convertAnnotationResult)));
    setResult('ANNOTATIONS_RESULT_PATH', resolve(workspace, resultFilename), logger);
  }

  setResult('ANNOTATIONS_NUMBER', annotationsArray.length, logger);
  setResult('ANNOTATION_MESSAGES', annotationsArray.map(annotation => annotation.message).join('\n'), logger);
};
