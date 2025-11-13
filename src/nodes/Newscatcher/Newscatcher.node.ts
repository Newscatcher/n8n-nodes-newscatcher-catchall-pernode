import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class Newscatcher implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Newscatcher CatchAll',
		name: 'newscatcher',
		icon: 'file:newscatcher-new.png',
		group: ['transform'],
		version: 1,
		description: 'Submit and pull CatchAll jobs from Newscatcher',
		defaults: {
			name: 'Newscatcher CatchAll',
		},
		subtitle: '={{$parameter["operation"]}}',
		inputs: ['main'],
		outputs: ['main'],
		properties: [
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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
						name: 'Status',
						value: 'status',
						action: 'Check job status',
						description: 'Get the status of a job by job_id',
					},
				],
				default: 'submit',
			},

			// Submit fields
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['submit'] } },
				placeholder: 'Tech company earnings this quarter',
				required: true,
			},
			{
				displayName: 'Context',
				name: 'context',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['submit'] } },
				placeholder: 'Focus on revenue and profit margins',
			},
			{
				displayName: 'Schema',
				name: 'schema',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['submit'] } },
				placeholder: 'Company [NAME] earned [REVENUE] in [QUARTER]',
			},

			// Pull / Status fields
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['pull', 'status'] } },
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const apiKey = this.getNodeParameter('apiKey', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			const baseUrl = 'https://catchall.newscatcherapi.com';
			let responseData: IDataObject | IDataObject[] | string = {};

			const headers: IDataObject = { 'x-api-key': apiKey };

			if (operation === 'submit') {
				const query = this.getNodeParameter('query', i) as string;
				const context = this.getNodeParameter('context', i) as string;
				const schema = this.getNodeParameter('schema', i) as string;

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${baseUrl}/catchAll/submit`,
					body: { query, context, schema },
					headers,
					json: true,
				};

				responseData = (await this.helpers.httpRequest(options)) as IDataObject;
			} else if (operation === 'pull') {
				const jobId = this.getNodeParameter('jobId', i) as string;

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `${baseUrl}/catchAll/pull/${encodeURIComponent(jobId)}`,
					headers,
					json: true,
				};

				responseData = (await this.helpers.httpRequest(options)) as IDataObject;
			} else if (operation === 'status') {
				const jobId = this.getNodeParameter('jobId', i) as string;

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `${baseUrl}/catchAll/status/${encodeURIComponent(jobId)}`,
					headers,
					json: true,
				};

				responseData = (await this.helpers.httpRequest(options)) as IDataObject;
			} else {
				throw new Error(`Unsupported operation: ${operation}`);
			}

			returnData.push({
				json: Array.isArray(responseData) ? { data: responseData } : (responseData as IDataObject),
			});
		}

		return [returnData];
	}
}
