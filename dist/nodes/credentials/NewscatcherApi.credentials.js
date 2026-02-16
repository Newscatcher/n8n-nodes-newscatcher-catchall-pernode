"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewscatcherApi = void 0;
class NewscatcherApi {
    name = 'newscatcherApi';
    displayName = 'Newscatcher API';
    documentationUrl = 'https://newscatcherapi.com/docs';
    properties = [
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
}
exports.NewscatcherApi = NewscatcherApi;
