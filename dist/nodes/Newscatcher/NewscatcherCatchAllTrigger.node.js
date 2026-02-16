"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewscatcherCatchAllTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class NewscatcherCatchAllTrigger {
    description = {
        displayName: 'Newscatcher CatchAll Trigger',
        name: 'newscatcherCatchAllTrigger',
        icon: 'file:newscatcher-new.png',
        group: ['trigger'],
        version: 1,
        description: 'Triggers when a Newscatcher CatchAll monitor has new results',
        defaults: {
            name: 'New monitor results',
        },
        // Trigger: no inputs, only outputs
        inputs: [],
        outputs: ['main'],
        // Webhook that Newscatcher will call with monitor results
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                // This becomes part of the webhook URL path
                path: 'catchall-monitor',
            },
        ],
        credentials: [
            {
                name: 'newscatcherApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Monitor',
                name: 'monitorId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getMonitors',
                },
                default: '',
                required: true,
                description: 'Monitor that should trigger this workflow when it has new results',
            },
        ],
    };
    // Helper methods (load monitor list, etc.)
    methods = {
        loadOptions: {
            // Populate the "Monitor" dropdown from the API
            async getMonitors() {
                try {
                    const credentials = await this.getCredentials('newscatcherApi');
                    const apiKey = credentials.apiKey;
                    if (!apiKey || apiKey.trim() === '') {
                        throw new Error('API Key is required to load monitors');
                    }
                    const options = {
                        method: 'GET',
                        url: 'https://catchall.newscatcherapi.com/catchAll/monitors',
                        headers: { 'x-api-key': apiKey },
                        json: true,
                    };
                    const response = (await this.helpers.httpRequest(options));
                    // Adjust `response.monitors` if your API responds differently
                    const monitors = (response.monitors ?? response);
                    if (!Array.isArray(monitors)) {
                        return [];
                    }
                    const returnData = [];
                    for (const m of monitors) {
                        const id = (m.monitor_id ?? m.id ?? '');
                        const name = (m.reference_job_query ?? 'Monitor');
                        const cronName = (m.schedule_human_readable ?? '');
                        if (!id)
                            continue;
                        returnData.push({
                            name: `${name} (${id}) (${cronName})`,
                            value: id,
                        });
                    }
                    return returnData;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to load monitors: ${error instanceof Error ? error.message : String(error)}`);
                }
            },
        },
    };
    // Lifecycle for webhook registration
    webhookMethods = {
        default: {
            // n8n calls this to see if the webhook is already registered.
            // You can make this smarter by checking your API, but always
            // returning false is fine (n8n will call create()).
            async checkExists() {
                return false;
            },
            // Workflow gets activated → register webhook on the monitor
            async create() {
                try {
                    const credentials = await this.getCredentials('newscatcherApi');
                    const apiKey = credentials.apiKey;
                    const monitorId = this.getNodeParameter('monitorId', 0);
                    const baseUrl = 'https://catchall.newscatcherapi.com';
                    if (!apiKey || apiKey.trim() === '') {
                        throw new Error('API Key is required');
                    }
                    if (!monitorId || monitorId.trim() === '') {
                        throw new Error('Monitor ID is required');
                    }
                    const staticData = this.getWorkflowStaticData('node');
                    // URL that n8n generated for this webhook
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    // Optional: fetch existing monitor to store old webhook config so we can restore on delete
                    try {
                        const getOptions = {
                            method: 'GET',
                            url: `${baseUrl}/catchAll/monitors/pull/${encodeURIComponent(monitorId)}`,
                            headers: { 'x-api-key': apiKey },
                            json: true,
                        };
                        const monitor = (await this.helpers.httpRequest(getOptions));
                        staticData.oldWebhook = monitor.webhook;
                    }
                    catch {
                        // If this fails, we just won't restore anything later
                    }
                    // Update monitor to point its webhook to this n8n trigger
                    const patchBody = {
                        webhook: {
                            url: webhookUrl,
                            method: 'POST',
                            // Extend with headers/params/auth here if supported/needed
                        },
                    };
                    const patchOptions = {
                        method: 'PATCH', // Adjust to your real method if different
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}`,
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: patchBody,
                        json: true,
                    };
                    await this.helpers.httpRequest(patchOptions);
                    return true;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to create webhook: ${error instanceof Error ? error.message : String(error)}`);
                }
            },
            // Workflow gets deactivated → restore or clear webhook on the monitor
            async delete() {
                try {
                    const credentials = await this.getCredentials('newscatcherApi');
                    const apiKey = credentials.apiKey;
                    const monitorId = this.getNodeParameter('monitorId', 0);
                    const baseUrl = 'https://catchall.newscatcherapi.com';
                    if (!apiKey || apiKey.trim() === '') {
                        throw new Error('API Key is required');
                    }
                    if (!monitorId || monitorId.trim() === '') {
                        throw new Error('Monitor ID is required');
                    }
                    const staticData = this.getWorkflowStaticData('node');
                    const restoreWebhook = staticData.oldWebhook;
                    const body = {};
                    if (restoreWebhook !== undefined) {
                        body.webhook = restoreWebhook;
                    }
                    else {
                        // If we don't have an old webhook, you can either clear it
                        // or leave it as-is depending on your product decision.
                        body.webhook = null;
                    }
                    const patchOptions = {
                        method: 'PATCH', // Adjust to your real method if different
                        url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}`,
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    };
                    await this.helpers.httpRequest(patchOptions);
                    return true;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to delete webhook: ${error instanceof Error ? error.message : String(error)}`);
                }
            },
        },
    };
    // Called whenever Newscatcher POSTs monitor results to the webhook URL
    async webhook() {
        const req = this.getRequestObject();
        const body = req.body;
        // Cast to expected type for TypeScript & n8n
        const data = body;
        const items = this.helpers.returnJsonArray(data);
        // items becomes the output data of this trigger node
        return {
            workflowData: [items],
        };
    }
}
exports.NewscatcherCatchAllTrigger = NewscatcherCatchAllTrigger;
