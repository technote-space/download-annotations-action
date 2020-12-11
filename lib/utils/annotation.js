"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnotations = void 0;
const params_1 = require("./params");
const getAnnotations = async (octokit, context) => {
    const workflowJobs = await octokit.paginate(octokit.actions.listJobsForWorkflowRun, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        'run_id': params_1.getTargetRunId(context),
    });
    const annotations = await Promise.all(workflowJobs.map(job => job.id).map(id => octokit.paginate(octokit.checks.listAnnotations, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        'check_run_id': id,
    })));
    return workflowJobs.map(job => job.id).map((id, index) => ({
        job: workflowJobs[index],
        annotations: annotations[index],
    }));
};
exports.getAnnotations = getAnnotations;
