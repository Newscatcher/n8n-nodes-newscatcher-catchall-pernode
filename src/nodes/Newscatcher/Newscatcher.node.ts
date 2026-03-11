import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError, NodeConnectionTypes } from 'n8n-workflow';

export class Newscatcher implements INodeType {
	description: INodeTypeDescription = {
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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
				description:
					'Custom validators for filtering web page clusters. JSON array of objects with name, description, and type (boolean). Example: [{"name": "is_acquisition_event", "description": "true if web page describes a merger or acquisition event", "type": "boolean"}]',
				placeholder:
					'[{"name": "is_acquisition_event", "description": "true if web page describes a merger or acquisition event", "type": "boolean"}]',
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
				description:
					'Custom enrichment fields for data extraction. JSON array of objects with name, description, and type (text, number, date, option, url, dict, company). Example: [{"name": "acquiring_company", "description": "Extract the acquiring company name", "type": "text"}]',
				placeholder:
					'[{"name": "acquiring_company", "description": "Extract the acquiring company name", "type": "text"}]',
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Shared helper to avoid circular JSON issues on errors
		const doRequest = async (options: IHttpRequestOptions, itemIndex: number) => {
			try {
				return await this.helpers.httpRequestWithAuthentication.call(this, 'newscatcherApi', options);
			} catch (error) {
				// NodeApiError expects error response data as JsonObject
				// Pass the original error - NodeApiError will extract response details
				// Using type assertion to work around strict JsonObject type requirement
				throw new NodeApiError(this.getNode(), error as any, { itemIndex });
			}
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				const baseUrl = 'https://catchall.newscatcherapi.com';
				let responseData: IDataObject | IDataObject[] | string = {};

				// Job resource operations
				if (resource === 'job' && operation === 'submit') {
					// ------------------------------------------------
					// Submit job
					// ------------------------------------------------
					const query = this.getNodeParameter('query', i) as string;
					const context = this.getNodeParameter('context', i) as string;
					const schema = this.getNodeParameter('schema', i) as string;
					const limit = this.getNodeParameter('limit', i) as number | undefined;
					const startDate = this.getNodeParameter('startDate', i) as string | undefined;
					const endDate = this.getNodeParameter('endDate', i) as string | undefined;
					const validatorsRaw = this.getNodeParameter('validators', i) as string | undefined;
					const enrichmentsRaw = this.getNodeParameter('enrichments', i) as string | undefined;

					const body: IDataObject = {
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
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON for Validators: ${(error as Error).message}`,
								{ itemIndex: i },
							);
						}
					}

					if (enrichmentsRaw) {
						try {
							body.enrichments = JSON.parse(enrichmentsRaw);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON for Enrichments: ${(error as Error).message}`,
								{ itemIndex: i },
							);
						}
					}

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/catchAll/submit`,
						body,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'job' && operation === 'initialize') {
					// ------------------------------------------------
					// Initialize job
					// ------------------------------------------------
					const query = this.getNodeParameter('query', i) as string;
					const context = this.getNodeParameter('context', i) as string;
					const schema = this.getNodeParameter('schema', i) as string;
					const limit = this.getNodeParameter('limit', i) as number | undefined;
					const startDate = this.getNodeParameter('startDate', i) as string | undefined;
					const endDate = this.getNodeParameter('endDate', i) as string | undefined;
					const validatorsRaw = this.getNodeParameter('validators', i) as string | undefined;
					const enrichmentsRaw = this.getNodeParameter('enrichments', i) as string | undefined;

					const body: IDataObject = {
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
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON for Validators: ${(error as Error).message}`,
								{ itemIndex: i },
							);
						}
					}

					if (enrichmentsRaw) {
						try {
							body.enrichments = JSON.parse(enrichmentsRaw);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON for Enrichments: ${(error as Error).message}`,
								{ itemIndex: i },
							);
						}
					}

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/catchAll/initialize`,
						body,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'job' && operation === 'pull') {
					// ------------------------------------------------
					// Pull job results
					// ------------------------------------------------
					const jobId = this.getNodeParameter('jobId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/pull/${encodeURIComponent(jobId)}`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'job' && operation === 'status') {
					// ------------------------------------------------
					// Job status
					// ------------------------------------------------
					const jobId = this.getNodeParameter('jobId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/status/${encodeURIComponent(jobId)}`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'job' && operation === 'listUserJobs') {
					// ------------------------------------------------
					// List user jobs
					// ------------------------------------------------
					const page = this.getNodeParameter('page', i) as number | undefined;
					const pageSize = this.getNodeParameter('pageSize', i) as number | undefined;

					const queryParams: IDataObject = {};
					if (page) {
						queryParams.page = page;
					}
					if (pageSize) {
						queryParams.page_size = pageSize;
					}

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/jobs/user`,
						qs: queryParams,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'job' && operation === 'continue') {
					// ------------------------------------------------
					// Continue job
					// ------------------------------------------------
					const jobId = this.getNodeParameter('jobId', i) as string;
					const newLimit = this.getNodeParameter('newLimit', i) as number;

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/catchAll/continue`,
						body: {
							job_id: jobId,
							new_limit: newLimit,
						},
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'monitor' && operation === 'create') {
				// ------------------------------------------------
				// Create monitor
				// ------------------------------------------------
				const referenceJobId = this.getNodeParameter('referenceJobId', i) as string;
				const schedule = this.getNodeParameter('schedule', i) as string;
				const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
				const webhookMethod = this.getNodeParameter('webhookMethod', i) as string;

				const webhookHeadersRaw = this.getNodeParameter('webhookHeaders', i) as string;
				const webhookParamsRaw = this.getNodeParameter('webhookParams', i) as string;
				const webhookAuthRaw = this.getNodeParameter('webhookAuth', i) as string;

				const webhook: IDataObject = {
					url: webhookUrl,
					method: webhookMethod,
				};

				// Parse optional JSON fields if provided
				if (webhookHeadersRaw) {
					try {
						webhook.headers = JSON.parse(webhookHeadersRaw);
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON for Webhook Headers: ${(error as Error).message}`,
							{ itemIndex: i },
						);
					}
				}

				if (webhookParamsRaw) {
					try {
						webhook.params = JSON.parse(webhookParamsRaw);
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON for Webhook Params: ${(error as Error).message}`,
							{ itemIndex: i },
						);
					}
				}

				if (webhookAuthRaw) {
					try {
						const parsedAuth = JSON.parse(webhookAuthRaw);
						if (!Array.isArray(parsedAuth)) {
							throw new NodeOperationError(
								this.getNode(),
								'Webhook Auth must be a JSON array',
								{ itemIndex: i },
							);
						}
						webhook.auth = parsedAuth;
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON for Webhook Auth: ${(error as Error).message}`,
							{ itemIndex: i },
						);
					}
				}

				const body: IDataObject = {
					reference_job_id: referenceJobId,
					schedule,
					webhook,
				};

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${baseUrl}/catchAll/monitors/create`,
					body,
					headers: {
						'Content-Type': 'application/json',
					},
					json: true,
				};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'monitor' && operation === 'list') {
					// ------------------------------------------------
					// List monitors
					// ------------------------------------------------
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/monitors`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'monitor' && operation === 'listJobs') {
					// ------------------------------------------------
					// List monitor jobs
					// ------------------------------------------------
					const monitorId = this.getNodeParameter('monitorId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/jobs`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject[];
				} else if (resource === 'monitor' && operation === 'get') {
					// ------------------------------------------------
					// Get monitor details
					// ------------------------------------------------
					const monitorId = this.getNodeParameter('monitorId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/catchAll/monitors/pull/${encodeURIComponent(monitorId)}`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'monitor' && operation === 'enable') {
					// ------------------------------------------------
					// Enable monitor
					// ------------------------------------------------
					const monitorId = this.getNodeParameter('monitorId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/enable`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else if (resource === 'monitor' && operation === 'disable') {
					// ------------------------------------------------
					// Disable monitor
					// ------------------------------------------------
					const monitorId = this.getNodeParameter('monitorId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/catchAll/monitors/${encodeURIComponent(monitorId)}/disable`,
						json: true,
					};

					responseData = (await doRequest(options, i)) as IDataObject;
				} else {
					throw new NodeOperationError(this.getNode(), `Unsupported resource/operation: ${resource}/${operation}`, {
						itemIndex: i,
					});
				}

				returnData.push({
					json: Array.isArray(responseData) ? { data: responseData } : (responseData as IDataObject),
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
