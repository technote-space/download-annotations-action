# Download Annotations Action

[![CI Status](https://github.com/technote-space/download-annotations-action/workflows/CI/badge.svg)](https://github.com/technote-space/download-annotations-action/actions)
[![codecov](https://codecov.io/gh/technote-space/download-annotations-action/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/download-annotations-action)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/download-annotations-action/badge)](https://www.codefactor.io/repository/github/technote-space/download-annotations-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/download-annotations-action/blob/master/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

GitHub actions to download annotations.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Usage](#usage)
- [Options](#options)
- [Outputs](#outputs)
  - [number](#number)
  - [messages](#messages)
  - [path](#path)
  - [result_path](#result_path)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
e.g. `.github/workflows/check-warnings.yml`  
```yaml
on:
  workflow_run:
    workflows:
      - Workflow name1
      - Workflow name2
      # ...
    types:
      - completed

name: Check Warnings

jobs:
  annotations:
    name: Annotations
    runs-on: ubuntu-latest
    timeout-minutes: 3
    steps:
      - uses: technote-space/download-annotations-action@v1
        id: annotations
        with:
          TARGET_RUN_ID: ${{ github.event.workflow_run.id }}
          INCLUDE_LEVELS: warning
          # EXCLUDE_MESSAGE_PATTERNS: |
          #  *warning jest*
      - name: Build attachments
        run: |
          arr1='[{"fields":[{"title":"repo","value":"<https://github.com/${{ github.repository }}|${{ github.repository }}>","short":true},{"title":"action","value":"<${{ github.event.workflow_run.html_url }}|action>","short":true}]}]'
          arr2=$(echo '${{ steps.annotations.outputs.messages }}' | jq -c 'map({"color":"warning","text":"```\(.)```"})')
          echo "SLACK_ATTACHMENTS=$(jq --argjson arr1 "$arr1" --argjson arr2 "$arr2" -nc '$arr1 + $arr2')" >> $GITHUB_ENV
        if: steps.annotations.outputs.number > 0
      - uses: 8398a7/action-slack@v3
        with:
          status: custom
          fields: repo
          custom_payload: |
            {
              text: "Warning annotations",
              attachments: ${{ env.SLACK_ATTACHMENTS }}
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        if: steps.annotations.outputs.number > 0 && env.SLACK_WEBHOOK_URL
```


![result](https://raw.githubusercontent.com/technote-space/download-annotations-action/images/slack.png)

## Options
Please see [actions.yml](./action.yml)

## Outputs
### number
Number of annotations

e.g.
```shell script
echo ${{ steps.annotations.outputs.messages }}
```

```shell script
1
```

### messages
All messages of annotations

e.g.
```shell script
echo '${{ steps.annotations.outputs.number }}' | jq
```

```shell script
[
  "Warning test message",
  "Failure test message",
  "Notice test message"
]
```

### path
Annotations file path

e.g.
```json
[
    {
        "path": "README.md",
        "start_line": 2,
        "end_line": 2,
        "start_column": 5,
        "end_column": 10,
        "annotation_level": "warning",
        "title": "Warning test",
        "message": "Warning test message",
        "raw_details": "Warning test details",
        "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
    },
    {
        "path": "README.md",
        "start_line": 2,
        "end_line": 2,
        "start_column": 5,
        "end_column": 10,
        "annotation_level": "failure",
        "title": "Failure test",
        "message": "Failure test message",
        "raw_details": "Failure test details",
        "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
    },
    {
        "path": "README.md",
        "start_line": 2,
        "end_line": 2,
        "start_column": 5,
        "end_column": 10,
        "annotation_level": "notice",
        "title": "Notice test",
        "message": "Notice test message",
        "raw_details": "Notice test details",
        "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
    }
]
```

### result_path
Result file path

e.g.
```json
[
    {
        "job": {
          "id": 1511906976,
          "run_id": 406257557,
          "status": "completed",
          "conclusion": "success",
          "name": "ESLint"
        },
        "annotations": [
            {
                "path": "README.md",
                "start_line": 2,
                "end_line": 2,
                "start_column": 5,
                "end_column": 10,
                "annotation_level": "warning",
                "title": "Warning test",
                "message": "Warning test message",
                "raw_details": "Warning test details",
                "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
            },
            {
                "path": "README.md",
                "start_line": 2,
                "end_line": 2,
                "start_column": 5,
                "end_column": 10,
                "annotation_level": "failure",
                "title": "Failure test",
                "message": "Failure test message",
                "raw_details": "Failure test details",
                "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
            }
        ]
    },
    {
        "job": {
            "id": 1511909554,
            "run_id": 406257557,
            "status": "completed",
            "conclusion": "success",
            "name": "Jest"
        },
        "annotations": [
            {
                "path": "README.md",
                "start_line": 2,
                "end_line": 2,
                "start_column": 5,
                "end_column": 10,
                "annotation_level": "notice",
                "title": "Notice test",
                "message": "Notice test message",
                "raw_details": "Notice test details",
                "blob_href": "https://api.github.com/repos/github/rest-api-description/git/blobs/abc"
            }
        ]
    }
]
```

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
