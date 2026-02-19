import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NewscatcherApi implements ICredentialType {
	name = 'newscatcherApi';

	displayName = 'Newscatcher API';

	documentationUrl = 'https://newscatcherapi.com/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'nc_live_xxx...',
			description: 'Your Newscatcher API key (sent as x-api-key header)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://catchall.newscatcherapi.com',
			url: '/catchAll/monitors',
			method: 'GET',
		},
	};
}
