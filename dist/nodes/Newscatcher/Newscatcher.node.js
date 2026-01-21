"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newscatcher = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Newscatcher {
    description = {
        displayName: 'Newscatcher CatchAll',
        name: 'newscatcher',
        icon: 'file:newscatcher-new.png',
        group: ['transform'],
        version: 1,
        description: 'Submit and pull CatchAll jobs from Newscatcher',
        defaults: {
            name: 'Newscatcher CatchAll',
        },
        subtitle: '={{$parameter["resource"]}}: {{$parameter["operation"]}}',
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // ----------------------------------------------------
            // Auth
            // ----------------------------------------------------
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                placeholder: 'nc_live_xxx...',
                description: 'Your Newscatcher API key (sent as x-api-key header)',
                required: true,
            },
            // ----------------------------------------------------
            // Resource selector
            // ----------------------------------------------------
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Job',
                        value: 'job',
                    },
                    {
                        name: 'Monitor',
                        value: 'monitor',
                    },
                ],
                default: 'job',
            },
            // ----------------------------------------------------
            // Operation selector
            // ----------------------------------------------------
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['job'],
                    },
                },
                options: [
                    {
                        name: 'Submit',
                        value: 'submit',
                        action: 'Submit a job',
                        description: 'Create a job with query/context/schema',
                    },
                    {
                        name: 'Pull',
                        value: 'pull',
                        action: 'Pull job results',
                        description: 'Fetch results by job_id',
                    },
                    {
                        name: 'Get Status',
                        value: 'status',
                        action: 'Check job status',
                        description: 'Get the status of a job by job_id',
                    },
                ],
                default: 'submit',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        action: 'Create a monitor',
                        description: 'Create a monitor based on an existing reference job',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        action: 'List monitors',
                        description: 'List all monitors for this API key',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        action: 'Get monitor details',
                        description: 'Get full details and records for a monitor',
                    },
                    {
                        name: 'List Jobs',
                        value: 'listJobs',
                        action: 'List jobs for a monitor',
                        description: 'List jobs created by a given monitor',
                    },
                    {
                        name: 'Enable',
                        value: 'enable',
                        action: 'Enable a monitor',
                        description: 'Enable a monitor by monitor_id',
                    },
                    {
                        name: 'Disable',
                        value: 'disable',
                        action: 'Disable a monitor',
                        description: 'Disable a monitor by monitor_id',
                    },
                ],
                default: 'list',
            },
            // ----------------------------------------------------
            // Submit fields
            // ----------------------------------------------------
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit'],
                    },
                },
                placeholder: 'Tech company earnings this quarter',
                required: true,
            },
            {
                displayName: 'Context',
                name: 'context',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit'],
                    },
                },
                placeholder: 'Focus on revenue and profit margins',
            },
            {
                displayName: 'Schema',
                name: 'schema',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit'],
                    },
                },
                placeholder: 'Company [NAME] earned [REVENUE] in [QUARTER]',
            },
            // ----------------------------------------------------
            // Pull / Status fields
            // ----------------------------------------------------
            {
                displayName: 'Job ID',
                name: 'jobId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['pull', 'status'],
                    },
                },
                required: true,
            },
            // ----------------------------------------------------
            // Create Monitor fields
            // ----------------------------------------------------
            {
                displayName: 'Reference Job ID',
                name: 'referenceJobId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                placeholder: '3c90c3cc-0d44-4b50-8888-8dd25736052a',
                description: 'Existing job_id to base the monitor on',
                required: true,
            },
            {
                displayName: 'Schedule',
                name: 'schedule',
                type: 'string',
                default: 'every day at 12 PM UTC',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                description: 'Natural language schedule, e.g. "every day at 12 PM UTC"',
                required: true,
            },
            {
                displayName: 'Webhook URL',
                name: 'webhookUrl',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                description: 'Webhook URL to receive monitor job results',
                placeholder: 'https://example.com/webhook',
                required: true,
            },
            {
                displayName: 'Webhook Method',
                name: 'webhookMethod',
                type: 'options',
                default: 'POST',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                options: [
                    { name: 'POST', value: 'POST' },
                    { name: 'GET', value: 'GET' },
                ],
                description: 'HTTP method used for the webhook',
            },
            {
                displayName: 'Webhook Headers (JSON)',
                name: 'webhookHeaders',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                description: 'Optional JSON object of headers, e.g. {"Authorization": "Bearer token"}',
            },
            {
                displayName: 'Webhook Params (JSON)',
                name: 'webhookParams',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                description: 'Optional JSON object of query params, e.g. {"source": "catchall"}',
            },
            {
                displayName: 'Webhook Auth (JSON Array)',
                name: 'webhookAuth',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['create'],
                    },
                },
                description: 'Optional JSON array for auth, e.g. ["user", "password"]',
            },
            // ----------------------------------------------------
            // Monitor ID fields (shared)
            // ----------------------------------------------------
            {
                displayName: 'Monitor ID',
                name: 'monitorId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['monitor'],
                        operation: ['get', 'listJobs', 'enable', 'disable'],
                    },
                },
                placeholder: '7f3a8b2c-1e4d-4a5b-9c8d-6e7f8a9b0c1d',
                description: 'Monitor ID for which to list jobs, pull details or change status',
                required: true,
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        // Shared helper to avoid circular JSON issues on errors
        const doRequest = async (options) => {
            try {
                return await this.helpers.httpRequest(options);
            }
            catch (error) {
                const err = error;
                const apiBody = err.response?.data;
                const apiStatus = err.response?.status;
                let message = 'Newscatcher API error';
                if (apiStatus) {
                    message += ` (status ${apiStatus})`;
                }
                if (apiBody) {
                    try {
                        message += `: ${JSON.stringify(apiBody)}`;
                    }
                    catch {
                        message += `: ${String(apiBody)}`;
                    }
                }
                else if (err.message) {
                    message += `: ${err.message}`;
                }
                throw new Error(message);
            }
        };
        for (let i = 0; i < items.length; i++) {
            try {
                const apiKey = this.getNodeParameter('apiKey', i);
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                const baseUrl = 'https://catchall.newscatcherapi.com';
                let responseData = {};
                const headers = { 'x-api-key': apiKey };
                // Job resource operations
                if (resource === 'job' && operation === 'submit') {
                    // ------------------------------------------------
                    // Submit job
                    // ------------------------------------------------
                    const query = this.getNodeParameter('query', i);
                    const context = this.getNodeParameter('context', i);
                    const schema = this.getNodeParameter('schema', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/submit`,
                        body: { query, context, schema },
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'job' && operation === 'pull') {
                    // ------------------------------------------------
                    // Pull job results
                    // ------------------------------------------------
                    const jobId = this.getNodeParameter('jobId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/pull/${encodeURIComponent(jobId)}`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'job' && operation === 'status') {
                    // ------------------------------------------------
                    // Job status
                    // ------------------------------------------------
                    const jobId = this.getNodeParameter('jobId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/status/${encodeURIComponent(jobId)}`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'create') {
                    // ------------------------------------------------
                    // Create monitor
                    // ------------------------------------------------
                    const referenceJobId = this.getNodeParameter('referenceJobId', i);
                    const schedule = this.getNodeParameter('schedule', i);
                    const webhookUrl = this.getNodeParameter('webhookUrl', i);
                    const webhookMethod = this.getNodeParameter('webhookMethod', i);
                    const webhookHeadersRaw = this.getNodeParameter('webhookHeaders', i);
                    const webhookParamsRaw = this.getNodeParameter('webhookParams', i);
                    const webhookAuthRaw = this.getNodeParameter('webhookAuth', i);
                    const webhook = {
                        url: webhookUrl,
                        method: webhookMethod,
                    };
                    // Parse optional JSON fields if provided
                    if (webhookHeadersRaw) {
                        try {
                            webhook.headers = JSON.parse(webhookHeadersRaw);
                        }
                        catch (error) {
                            throw new Error(`Invalid JSON for Webhook Headers: ${error.message}`);
                        }
                    }
                    if (webhookParamsRaw) {
                        try {
                            webhook.params = JSON.parse(webhookParamsRaw);
                        }
                        catch (error) {
                            throw new Error(`Invalid JSON for Webhook Params: ${error.message}`);
                        }
                    }
                    if (webhookAuthRaw) {
                        try {
                            const parsedAuth = JSON.parse(webhookAuthRaw);
                            if (!Array.isArray(parsedAuth)) {
                                throw new Error('Webhook Auth must be a JSON array');
                            }
                            webhook.auth = parsedAuth;
                        }
                        catch (error) {
                            throw new Error(`Invalid JSON for Webhook Auth: ${error.message}`);
                        }
                    }
                    const body = {
                        reference_job_id: referenceJobId,
                        schedule,
                        webhook,
                    };
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/monitors/create`,
                        body,
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json',
                        },
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'list') {
                    // ------------------------------------------------
                    // List monitors
                    // ------------------------------------------------
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'listJobs') {
                    // ------------------------------------------------
                    // List monitor jobs
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/jobs`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'get') {
                    // ------------------------------------------------
                    // Get monitor details
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors/pull/${encodeURIComponent(monitorId)}`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'enable') {
                    // ------------------------------------------------
                    // Enable monitor
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/enable`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else if (resource === 'monitor' && operation === 'disable') {
                    // ------------------------------------------------
                    // Disable monitor
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/disable`,
                        headers,
                        json: true,
                    };
                    responseData = (await doRequest(options));
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource/operation: ${resource}/${operation}`, {
                        itemIndex: i,
                    });
                }
                returnData.push({
                    json: Array.isArray(responseData) ? { data: responseData } : responseData,
                    pairedItem: { item: i },
                });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error instanceof Error ? error.message : String(error),
                        },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, { itemIndex: i });
            }
        }
        return [returnData];
    }
}
exports.Newscatcher = Newscatcher;
