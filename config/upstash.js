import { Client as WorkflowClient } from '@upstash/workflow';

import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

console.log('entered worflow');
export const workflowClient = new WorkflowClient( {
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});