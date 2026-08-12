"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newscatcher = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Newscatcher {
    description = {
        displayName: 'Newscatcher CatchAll',
        name: 'newscatcher',
        icon: 'file:newscatcher-new.svg',
        group: ['transform'],
        version: 1,
        description: 'Submit and pull CatchAll jobs from Newscatcher',
        defaults: {
            name: 'Newscatcher CatchAll',
        },
        subtitle: '={{$parameter["resource"]}}: {{$parameter["operation"]}}',
        inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
        outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
        credentials: [
            {
                name: 'newscatcherApi',
                required: true,
            },
        ],
        properties: [
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
                    {
                        name: 'Project',
                        value: 'project',
                    },
                    {
                        name: 'Webhook',
                        value: 'webhook',
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
                        name: 'Initialize',
                        value: 'initialize',
                        action: 'Initialize a job',
                        description: 'Initialize a job with query/context/schema',
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
                    {
                        name: 'List User Jobs',
                        value: 'listUserJobs',
                        action: 'List user jobs',
                        description: 'Returns all jobs created by the authenticated user',
                    },
                    {
                        name: 'Continue',
                        value: 'continue',
                        action: 'Continue a job',
                        description: 'Continue an existing job to process more records beyond the initial limit',
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
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['project'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        action: 'Create a project',
                        description: 'Create a new project to group jobs, monitors, datasets, monitor groups, and webhooks',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        action: 'List projects',
                        description: 'List all projects in the organization',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        action: 'Get project details',
                        description: 'Get the full detail of a project by project_id',
                    },
                    {
                        name: 'Get Overview',
                        value: 'getOverview',
                        action: 'Get project overview',
                        description: 'Get resource counts by type (jobs, monitors, datasets, monitor groups, webhooks)',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        action: 'Update a project',
                        description: 'Update the name or description of a project',
                    },
                    {
                        name: 'Add Resource',
                        value: 'addResource',
                        action: 'Add a resource to a project',
                        description: 'Attach an existing job, monitor, dataset, monitor group, or webhook to a project',
                    },
                    {
                        name: 'Remove Resource',
                        value: 'removeResource',
                        action: 'Remove a resource from a project',
                        description: 'Detach a resource from a project without deleting the resource itself',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        action: 'Delete a project',
                        description: 'Delete a project, optionally deleting its resources too (webhooks are only detached, never deleted)',
                    },
                ],
                default: 'list',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        action: 'Create a webhook',
                        description: 'Create a new webhook endpoint for the organization',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        action: 'List webhooks',
                        description: 'List all webhooks belonging to the organization',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        action: 'Get webhook details',
                        description: 'Get the full configuration of a webhook by webhook_id',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        action: 'Update a webhook',
                        description: 'Partially update a webhook; only supplied fields are changed',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        action: 'Delete a webhook',
                        description: 'Permanently delete a webhook and remove all its resource assignments',
                    },
                ],
                default: 'list',
            },
            // ----------------------------------------------------
            // Submit / Initialize fields
            // ----------------------------------------------------
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
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
                        operation: ['submit', 'initialize'],
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
                        operation: ['submit', 'initialize'],
                    },
                },
                placeholder: 'Company [NAME] earned [REVENUE] in [QUARTER]',
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
                    },
                },
                description: 'Maximum number of records to return. If not specified, defaults to your plan limit.',
                typeOptions: {
                    minValue: 1,
                },
            },
            {
                displayName: 'Start Date',
                name: 'startDate',
                type: 'dateTime',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
                    },
                },
                description: 'Start date for web search (ISO 8601 format with UTC timezone). Defines the start of the search window by web page discovery date.',
            },
            {
                displayName: 'End Date',
                name: 'endDate',
                type: 'dateTime',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
                    },
                },
                description: 'End date for web search (ISO 8601 format with UTC timezone). Defines the end of the search window by web page discovery date.',
            },
            {
                displayName: 'Validators (JSON)',
                name: 'validators',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
                    },
                },
                description: 'Custom validators for filtering web page clusters. JSON array of objects with name, description, and type (boolean). Example: [{"name": "is_acquisition_event", "description": "true if web page describes a merger or acquisition event", "type": "boolean"}]',
                placeholder: '[{"name": "is_acquisition_event", "description": "true if web page describes a merger or acquisition event", "type": "boolean"}]',
            },
            {
                displayName: 'Enrichments (JSON)',
                name: 'enrichments',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['submit', 'initialize'],
                    },
                },
                description: 'Custom enrichment fields for data extraction. JSON array of objects with name, description, and type (text, number, date, option, url, dict, company). Example: [{"name": "acquiring_company", "description": "Extract the acquiring company name", "type": "text"}]',
                placeholder: '[{"name": "acquiring_company", "description": "Extract the acquiring company name", "type": "text"}]',
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
            // Continue fields
            // ----------------------------------------------------
            {
                displayName: 'Job ID',
                name: 'jobId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['continue'],
                    },
                },
                description: 'Job identifier of the completed job to continue',
                placeholder: 'af7a26d6-cf0b-458c-a6ed-4b6318c74da3',
                required: true,
            },
            {
                displayName: 'New Limit',
                name: 'newLimit',
                type: 'number',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['continue'],
                    },
                },
                description: 'New record limit for continued processing. Must be greater than the previous limit.',
                typeOptions: {
                    minValue: 1,
                },
                required: true,
            },
            // ----------------------------------------------------
            // List User Jobs fields
            // ----------------------------------------------------
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: 1,
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['listUserJobs'],
                    },
                },
                description: 'Page number to retrieve',
                typeOptions: {
                    minValue: 1,
                },
            },
            {
                displayName: 'Page Size',
                name: 'pageSize',
                type: 'number',
                default: 100,
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['listUserJobs'],
                    },
                },
                description: 'Number of records per page',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000,
                },
            },
            {
                displayName: 'Mode',
                name: 'mode',
                type: 'options',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['job'],
                        operation: ['listUserJobs'],
                    },
                },
                options: [
                    { name: 'All', value: '' },
                    { name: 'Base', value: 'base' },
                    { name: 'Lite', value: 'lite' },
                ],
                description: 'Filter jobs by processing mode. "base" runs the full pipeline with clustering and enrichment; "lite" is a faster mode that skips clustering. Leave as "All" to return jobs of every mode.',
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
            // ----------------------------------------------------
            // Project fields
            // ----------------------------------------------------
            {
                displayName: 'Project Name',
                name: 'projectName',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['create'],
                    },
                },
                placeholder: 'My Research Project',
                description: 'Name for the project',
                required: true,
            },
            {
                displayName: 'Project Name',
                name: 'projectName',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['update'],
                    },
                },
                description: 'New name for the project. Leave empty to keep the current name.',
            },
            {
                displayName: 'Description',
                name: 'projectDescription',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['create', 'update'],
                    },
                },
                description: 'Optional description for the project',
            },
            {
                displayName: 'Project ID',
                name: 'projectId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['get', 'getOverview', 'update', 'delete', 'addResource', 'removeResource'],
                    },
                },
                placeholder: 'b275503a-419f-4770-9472-8e263ef85738',
                description: 'Project identifier',
                required: true,
            },
            {
                displayName: 'Delete Resources',
                name: 'deleteResources',
                type: 'boolean',
                default: false,
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['delete'],
                    },
                },
                description: 'Whether to also delete the jobs, monitors, datasets, and monitor groups in the project. Webhooks are never deleted by this operation — they are only detached and stay usable on their own.',
            },
            {
                displayName: 'Resource Type',
                name: 'resourceType',
                type: 'options',
                default: 'job',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['addResource', 'removeResource'],
                    },
                },
                options: [
                    { name: 'Job', value: 'job' },
                    { name: 'Monitor', value: 'monitor' },
                    { name: 'Dataset', value: 'dataset' },
                    { name: 'Monitor Group', value: 'monitor_group' },
                    { name: 'Webhook', value: 'webhook' },
                ],
                description: 'Type of the resource to attach or detach',
                required: true,
            },
            {
                displayName: 'Resource ID',
                name: 'resourceId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project'],
                        operation: ['addResource', 'removeResource'],
                    },
                },
                placeholder: '84e68462-67ff-4755-8373-57c2b9513f31',
                description: 'ID of the resource to attach or detach',
                required: true,
            },
            // ----------------------------------------------------
            // Webhook fields
            // ----------------------------------------------------
            {
                displayName: 'Name',
                name: 'webhookName',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                placeholder: 'Layoffs Alert',
                description: 'Human-readable label for this webhook',
                required: true,
            },
            {
                displayName: 'Name',
                name: 'webhookName',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['update'],
                    },
                },
                description: 'Updated webhook name. Leave empty to keep the current name.',
            },
            {
                displayName: 'URL',
                name: 'webhookTargetUrl',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                placeholder: 'https://hooks.slack.com/services/T000/B000/xxxx',
                description: 'Destination URL that receives the payload',
                required: true,
            },
            {
                displayName: 'URL',
                name: 'webhookTargetUrl',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['update'],
                    },
                },
                description: 'Updated webhook endpoint URL. Leave empty to keep the current URL.',
            },
            {
                displayName: 'Type',
                name: 'webhookType',
                type: 'options',
                default: 'generic',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                options: [
                    { name: 'Generic', value: 'generic' },
                    { name: 'Slack', value: 'slack' },
                    { name: 'Teams', value: 'teams' },
                    { name: 'Custom', value: 'custom' },
                ],
                description: 'Webhook target type. "slack" and "teams" send pre-formatted payloads; "generic" and "custom" send the raw result payload.',
            },
            {
                displayName: 'Delivery Mode',
                name: 'deliveryMode',
                type: 'options',
                default: 'full',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                options: [
                    { name: 'Full', value: 'full' },
                    { name: 'Per Record', value: 'per_record' },
                ],
                description: '"full" delivers the entire result set in one call; "per_record" sends one call per article',
            },
            {
                displayName: 'Method',
                name: 'webhookHttpMethod',
                type: 'options',
                default: 'POST',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                options: [
                    { name: 'GET', value: 'GET' },
                    { name: 'POST', value: 'POST' },
                    { name: 'PUT', value: 'PUT' },
                    { name: 'PATCH', value: 'PATCH' },
                    { name: 'DELETE', value: 'DELETE' },
                ],
                description: 'HTTP method used for delivery',
            },
            {
                displayName: 'Headers (JSON)',
                name: 'webhookCustomHeaders',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create', 'update'],
                    },
                },
                description: 'Optional JSON object of custom HTTP headers forwarded with each delivery, e.g. {"X-Source": "catchall"}',
            },
            {
                displayName: 'Params (JSON)',
                name: 'webhookCustomParams',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create', 'update'],
                    },
                },
                description: 'Optional JSON object of query parameters appended to the webhook URL, e.g. {"source": "catchall"}',
            },
            {
                displayName: 'Auth (JSON)',
                name: 'webhookAuthConfig',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create', 'update'],
                    },
                },
                description: 'Optional JSON object for delivery authentication. Supported types: {"type": "bearer", "token": "..."}, {"type": "api_key", "header": "...", "value": "..."}, {"type": "basic", "username": "...", "password": "..."}. Responses echo this back with secret values masked.',
                placeholder: '{"type": "bearer", "token": "..."}',
            },
            {
                displayName: 'Project ID',
                name: 'webhookProjectId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['create'],
                    },
                },
                placeholder: 'b275503a-419f-4770-9472-8e263ef85738',
                description: 'Optional project ID to associate this webhook with immediately upon creation',
            },
            {
                displayName: 'Active',
                name: 'webhookIsActive',
                type: 'options',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['update'],
                    },
                },
                options: [
                    { name: 'Keep Current', value: '' },
                    { name: 'Active', value: 'true' },
                    { name: 'Inactive', value: 'false' },
                ],
                description: 'Set to Inactive to disable delivery without deleting the webhook',
            },
            {
                displayName: 'Webhook ID',
                name: 'webhookId',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['get', 'update', 'delete'],
                    },
                },
                placeholder: '84e68462-67ff-4755-8373-57c2b9513f31',
                description: 'Webhook identifier',
                required: true,
            },
            // ----------------------------------------------------
            // List fields shared by Project and Webhook
            // ----------------------------------------------------
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: 1,
                displayOptions: {
                    show: {
                        resource: ['project', 'webhook'],
                        operation: ['list'],
                    },
                },
                description: 'Page number to retrieve',
                typeOptions: {
                    minValue: 1,
                },
            },
            {
                displayName: 'Page Size',
                name: 'pageSize',
                type: 'number',
                default: 100,
                displayOptions: {
                    show: {
                        resource: ['project', 'webhook'],
                        operation: ['list'],
                    },
                },
                description: 'Number of records per page',
                typeOptions: {
                    minValue: 1,
                    maxValue: 500,
                },
            },
            {
                displayName: 'Search',
                name: 'search',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        resource: ['project', 'webhook'],
                        operation: ['list'],
                    },
                },
                description: 'Optional name fragment to filter the list by',
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        // Shared helper to avoid circular JSON issues on errors
        const doRequest = async (options, itemIndex) => {
            try {
                return await this.helpers.httpRequestWithAuthentication.call(this, 'newscatcherApi', options);
            }
            catch (error) {
                // NodeApiError expects error response data as JsonObject
                // Pass the original error - NodeApiError will extract response details
                // Using type assertion to work around strict JsonObject type requirement
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error, { itemIndex });
            }
        };
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                const baseUrl = 'https://catchall.newscatcherapi.com';
                let responseData = {};
                // Job resource operations
                if (resource === 'job' && operation === 'submit') {
                    // ------------------------------------------------
                    // Submit job
                    // ------------------------------------------------
                    const query = this.getNodeParameter('query', i);
                    const context = this.getNodeParameter('context', i);
                    const schema = this.getNodeParameter('schema', i);
                    const limit = this.getNodeParameter('limit', i);
                    const startDate = this.getNodeParameter('startDate', i);
                    const endDate = this.getNodeParameter('endDate', i);
                    const validatorsRaw = this.getNodeParameter('validators', i);
                    const enrichmentsRaw = this.getNodeParameter('enrichments', i);
                    const body = {
                        query,
                    };
                    if (context) {
                        body.context = context;
                    }
                    if (schema) {
                        body.schema = schema;
                    }
                    if (limit) {
                        body.limit = limit;
                    }
                    if (startDate) {
                        body.start_date = startDate;
                    }
                    if (endDate) {
                        body.end_date = endDate;
                    }
                    if (validatorsRaw) {
                        try {
                            body.validators = JSON.parse(validatorsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Validators: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (enrichmentsRaw) {
                        try {
                            body.enrichments = JSON.parse(enrichmentsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Enrichments: ${error.message}`, { itemIndex: i });
                        }
                    }
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/submit`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'job' && operation === 'initialize') {
                    // ------------------------------------------------
                    // Initialize job
                    // ------------------------------------------------
                    const query = this.getNodeParameter('query', i);
                    const context = this.getNodeParameter('context', i);
                    const schema = this.getNodeParameter('schema', i);
                    const limit = this.getNodeParameter('limit', i);
                    const startDate = this.getNodeParameter('startDate', i);
                    const endDate = this.getNodeParameter('endDate', i);
                    const validatorsRaw = this.getNodeParameter('validators', i);
                    const enrichmentsRaw = this.getNodeParameter('enrichments', i);
                    const body = {
                        query,
                    };
                    if (context) {
                        body.context = context;
                    }
                    if (schema) {
                        body.schema = schema;
                    }
                    if (limit) {
                        body.limit = limit;
                    }
                    if (startDate) {
                        body.start_date = startDate;
                    }
                    if (endDate) {
                        body.end_date = endDate;
                    }
                    if (validatorsRaw) {
                        try {
                            body.validators = JSON.parse(validatorsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Validators: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (enrichmentsRaw) {
                        try {
                            body.enrichments = JSON.parse(enrichmentsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Enrichments: ${error.message}`, { itemIndex: i });
                        }
                    }
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/initialize`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'job' && operation === 'pull') {
                    // ------------------------------------------------
                    // Pull job results
                    // ------------------------------------------------
                    const jobId = this.getNodeParameter('jobId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/pull/${encodeURIComponent(jobId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'job' && operation === 'status') {
                    // ------------------------------------------------
                    // Job status
                    // ------------------------------------------------
                    const jobId = this.getNodeParameter('jobId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/status/${encodeURIComponent(jobId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'job' && operation === 'listUserJobs') {
                    // ------------------------------------------------
                    // List user jobs
                    // ------------------------------------------------
                    const page = this.getNodeParameter('page', i);
                    const pageSize = this.getNodeParameter('pageSize', i);
                    const mode = this.getNodeParameter('mode', i);
                    const queryParams = {};
                    if (page) {
                        queryParams.page = page;
                    }
                    if (pageSize) {
                        queryParams.page_size = pageSize;
                    }
                    if (mode) {
                        queryParams.mode = mode;
                    }
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/jobs/user`,
                        qs: queryParams,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'job' && operation === 'continue') {
                    // ------------------------------------------------
                    // Continue job
                    // ------------------------------------------------
                    const jobId = this.getNodeParameter('jobId', i);
                    const newLimit = this.getNodeParameter('newLimit', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/continue`,
                        body: {
                            job_id: jobId,
                            new_limit: newLimit,
                        },
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
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
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Webhook Headers: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookParamsRaw) {
                        try {
                            webhook.params = JSON.parse(webhookParamsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Webhook Params: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookAuthRaw) {
                        try {
                            const parsedAuth = JSON.parse(webhookAuthRaw);
                            if (!Array.isArray(parsedAuth)) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Webhook Auth must be a JSON array', { itemIndex: i });
                            }
                            webhook.auth = parsedAuth;
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Webhook Auth: ${error.message}`, { itemIndex: i });
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
                            'Content-Type': 'application/json',
                        },
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'monitor' && operation === 'list') {
                    // ------------------------------------------------
                    // List monitors
                    // ------------------------------------------------
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'monitor' && operation === 'listJobs') {
                    // ------------------------------------------------
                    // List monitor jobs
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/jobs`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'monitor' && operation === 'get') {
                    // ------------------------------------------------
                    // Get monitor details
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/monitors/pull/${encodeURIComponent(monitorId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'monitor' && operation === 'enable') {
                    // ------------------------------------------------
                    // Enable monitor
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/enable`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'monitor' && operation === 'disable') {
                    // ------------------------------------------------
                    // Disable monitor
                    // ------------------------------------------------
                    const monitorId = this.getNodeParameter('monitorId', i);
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/disable`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'create') {
                    // ------------------------------------------------
                    // Create project
                    // ------------------------------------------------
                    const projectName = this.getNodeParameter('projectName', i);
                    const projectDescription = this.getNodeParameter('projectDescription', i);
                    const body = {
                        name: projectName,
                    };
                    if (projectDescription) {
                        body.description = projectDescription;
                    }
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/projects`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'list') {
                    // ------------------------------------------------
                    // List projects
                    // ------------------------------------------------
                    const page = this.getNodeParameter('page', i);
                    const pageSize = this.getNodeParameter('pageSize', i);
                    const search = this.getNodeParameter('search', i);
                    const queryParams = {};
                    if (page) {
                        queryParams.page = page;
                    }
                    if (pageSize) {
                        queryParams.page_size = pageSize;
                    }
                    if (search) {
                        queryParams.search = search;
                    }
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/projects`,
                        qs: queryParams,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'get') {
                    // ------------------------------------------------
                    // Get project
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'getOverview') {
                    // ------------------------------------------------
                    // Get project overview (resource counts by type,
                    // including the webhooks count)
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}/overview`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'update') {
                    // ------------------------------------------------
                    // Update project (only supplied fields are changed)
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const projectName = this.getNodeParameter('projectName', i);
                    const projectDescription = this.getNodeParameter('projectDescription', i);
                    const body = {};
                    if (projectName) {
                        body.name = projectName;
                    }
                    if (projectDescription) {
                        body.description = projectDescription;
                    }
                    const options = {
                        method: 'PATCH',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'addResource') {
                    // ------------------------------------------------
                    // Add a resource to a project (resource_type may be
                    // job, monitor, dataset, monitor_group, or webhook)
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const resourceType = this.getNodeParameter('resourceType', i);
                    const resourceId = this.getNodeParameter('resourceId', i);
                    const body = {
                        resources: [
                            {
                                resource_type: resourceType,
                                resource_id: resourceId,
                            },
                        ],
                    };
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}/resources`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'removeResource') {
                    // ------------------------------------------------
                    // Remove a resource from a project (detach only —
                    // the resource itself is not deleted)
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const resourceType = this.getNodeParameter('resourceType', i);
                    const resourceId = this.getNodeParameter('resourceId', i);
                    const options = {
                        method: 'DELETE',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}/resources/${encodeURIComponent(resourceType)}/${encodeURIComponent(resourceId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'project' && operation === 'delete') {
                    // ------------------------------------------------
                    // Delete project. delete_resources=true also deletes
                    // the project's jobs/monitors/datasets/monitor groups;
                    // webhooks are only detached, never deleted.
                    // ------------------------------------------------
                    const projectId = this.getNodeParameter('projectId', i);
                    const deleteResources = this.getNodeParameter('deleteResources', i);
                    const options = {
                        method: 'DELETE',
                        url: `${baseUrl}/catchAll/projects/${encodeURIComponent(projectId)}`,
                        qs: {
                            delete_resources: deleteResources === true,
                        },
                        json: true,
                    };
                    const deleteResponse = await doRequest(options, i);
                    // The API may answer 204 No Content — normalize to a JSON object.
                    responseData =
                        deleteResponse && typeof deleteResponse === 'object' && Object.keys(deleteResponse).length > 0
                            ? deleteResponse
                            : { success: true, project_id: projectId };
                }
                else if (resource === 'webhook' && operation === 'create') {
                    // ------------------------------------------------
                    // Create webhook. Optional project_id attaches it to
                    // a project immediately; the response echoes the auth
                    // object back with secret values masked.
                    // ------------------------------------------------
                    const webhookName = this.getNodeParameter('webhookName', i);
                    const webhookTargetUrl = this.getNodeParameter('webhookTargetUrl', i);
                    const webhookType = this.getNodeParameter('webhookType', i);
                    const deliveryMode = this.getNodeParameter('deliveryMode', i);
                    const webhookHttpMethod = this.getNodeParameter('webhookHttpMethod', i);
                    const webhookHeadersRaw = this.getNodeParameter('webhookCustomHeaders', i);
                    const webhookParamsRaw = this.getNodeParameter('webhookCustomParams', i);
                    const webhookAuthRaw = this.getNodeParameter('webhookAuthConfig', i);
                    const webhookProjectId = this.getNodeParameter('webhookProjectId', i);
                    const body = {
                        name: webhookName,
                        url: webhookTargetUrl,
                        type: webhookType,
                        delivery_mode: deliveryMode,
                        method: webhookHttpMethod,
                    };
                    if (webhookHeadersRaw) {
                        try {
                            body.headers = JSON.parse(webhookHeadersRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Headers: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookParamsRaw) {
                        try {
                            body.params = JSON.parse(webhookParamsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Params: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookAuthRaw) {
                        try {
                            const parsedAuth = JSON.parse(webhookAuthRaw);
                            if (parsedAuth === null || typeof parsedAuth !== 'object' || Array.isArray(parsedAuth)) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Auth must be a JSON object like {"type": "bearer", "token": "..."}', { itemIndex: i });
                            }
                            body.auth = parsedAuth;
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Auth: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookProjectId) {
                        body.project_id = webhookProjectId;
                    }
                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/catchAll/webhooks`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'webhook' && operation === 'list') {
                    // ------------------------------------------------
                    // List webhooks
                    // ------------------------------------------------
                    const page = this.getNodeParameter('page', i);
                    const pageSize = this.getNodeParameter('pageSize', i);
                    const search = this.getNodeParameter('search', i);
                    const queryParams = {};
                    if (page) {
                        queryParams.page = page;
                    }
                    if (pageSize) {
                        queryParams.page_size = pageSize;
                    }
                    if (search) {
                        queryParams.search = search;
                    }
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/webhooks`,
                        qs: queryParams,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'webhook' && operation === 'get') {
                    // ------------------------------------------------
                    // Get webhook (auth is echoed back masked)
                    // ------------------------------------------------
                    const webhookId = this.getNodeParameter('webhookId', i);
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/catchAll/webhooks/${encodeURIComponent(webhookId)}`,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'webhook' && operation === 'update') {
                    // ------------------------------------------------
                    // Update webhook (only supplied fields are changed)
                    // ------------------------------------------------
                    const webhookId = this.getNodeParameter('webhookId', i);
                    const webhookName = this.getNodeParameter('webhookName', i);
                    const webhookTargetUrl = this.getNodeParameter('webhookTargetUrl', i);
                    const webhookHeadersRaw = this.getNodeParameter('webhookCustomHeaders', i);
                    const webhookParamsRaw = this.getNodeParameter('webhookCustomParams', i);
                    const webhookAuthRaw = this.getNodeParameter('webhookAuthConfig', i);
                    const webhookIsActive = this.getNodeParameter('webhookIsActive', i);
                    const body = {};
                    if (webhookName) {
                        body.name = webhookName;
                    }
                    if (webhookTargetUrl) {
                        body.url = webhookTargetUrl;
                    }
                    if (webhookHeadersRaw) {
                        try {
                            body.headers = JSON.parse(webhookHeadersRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Headers: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookParamsRaw) {
                        try {
                            body.params = JSON.parse(webhookParamsRaw);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Params: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookAuthRaw) {
                        try {
                            const parsedAuth = JSON.parse(webhookAuthRaw);
                            if (parsedAuth === null || typeof parsedAuth !== 'object' || Array.isArray(parsedAuth)) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Auth must be a JSON object like {"type": "bearer", "token": "..."}', { itemIndex: i });
                            }
                            body.auth = parsedAuth;
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON for Auth: ${error.message}`, { itemIndex: i });
                        }
                    }
                    if (webhookIsActive) {
                        body.is_active = webhookIsActive === 'true';
                    }
                    const options = {
                        method: 'PATCH',
                        url: `${baseUrl}/catchAll/webhooks/${encodeURIComponent(webhookId)}`,
                        body,
                        json: true,
                    };
                    responseData = (await doRequest(options, i));
                }
                else if (resource === 'webhook' && operation === 'delete') {
                    // ------------------------------------------------
                    // Delete webhook (returns 204 No Content)
                    // ------------------------------------------------
                    const webhookId = this.getNodeParameter('webhookId', i);
                    const options = {
                        method: 'DELETE',
                        url: `${baseUrl}/catchAll/webhooks/${encodeURIComponent(webhookId)}`,
                        json: true,
                    };
                    const deleteResponse = await doRequest(options, i);
                    // The API answers 204 No Content — normalize to a JSON object.
                    responseData =
                        deleteResponse && typeof deleteResponse === 'object' && Object.keys(deleteResponse).length > 0
                            ? deleteResponse
                            : { success: true, webhook_id: webhookId };
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
