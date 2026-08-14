// Ambient compile-time declarations for `n8n-workflow`, used only when building
// the node from source in the sandbox. It types every symbol the node/credential
// files import as `any`, so `tsc` compiles the real source unchanged. At runtime
// the same specifier resolves to `n8n_workflow_stub.cjs` (enum + error classes).
// Nothing here affects the emitted JavaScript or the live HTTP behaviour.
declare module 'n8n-workflow' {
	export type IDataObject = any;
	export type IExecuteFunctions = any;
	export type INodeExecutionData = any;
	export type INodeType = any;
	export type INodeTypeDescription = any;
	export type IHttpRequestOptions = any;
	export type IAuthenticateGeneric = any;
	export type ICredentialTestRequest = any;
	export type ICredentialType = any;
	export type INodeProperties = any;
	export type ITriggerFunctions = any;
	export type ITriggerResponse = any;
	export type IWebhookFunctions = any;
	export type IWebhookResponseData = any;
	export type ILoadOptionsFunctions = any;
	export type INodePropertyOptions = any;
	export type IHookFunctions = any;
	export type ICredentialDataDecryptedObject = any;
	export type IWebhookData = any;
	export type NodeParameterValueType = any;

	export const NodeConnectionTypes: any;
	export const NodeConnectionType: any;

	export class NodeApiError extends Error {
		constructor(...args: any[]);
	}
	export class NodeOperationError extends Error {
		constructor(...args: any[]);
	}
}
