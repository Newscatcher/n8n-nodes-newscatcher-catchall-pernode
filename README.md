# n8n-nodes-newscatcher-catchall-pernode

n8n community node for [Newscatcher CatchAll](https://catchall.newscatcherapi.com/) API integration. This node allows you to submit jobs, retrieve results, manage monitors, and receive real-time webhook triggers from Newscatcher CatchAll.

## Features

- **Job Management**: Submit, initialize, pull results, check status, list jobs, and continue existing jobs
- **Monitor Management**: Create, list, enable, disable monitors, and retrieve monitor details
- **Project Management**: Create, list, update, delete projects, read project overviews, and attach or detach resources (jobs, monitors, datasets, monitor groups, webhooks)
- **Webhook Management**: Create, list, get, update, and delete webhook endpoints, optionally attached to a project
- **Webhook Trigger**: Real-time trigger node for monitor results
- **Secure Credentials**: API key stored securely using n8n's credential system
- **Paired Item Support**: Full support for processing multiple items with proper error tracking
- **Continue on Fail**: Built-in support for continue-on-fail functionality

## Installation

### For n8n Cloud

1. Go to **Settings → Community Nodes → Install**
2. Enter: `n8n-nodes-newscatcher-catchall-pernode`
3. Click **Install**

### For Self-Hosted n8n

```bash
npm install n8n-nodes-newscatcher-catchall-pernode
```

## Authentication

This node uses n8n's credential system for secure API key storage. 

1. Go to **Credentials** in n8n
2. Click **Add Credential**
3. Search for **Newscatcher API**
4. Enter your API key (get it from [Newscatcher](https://newscatcherapi.com/))
5. Save the credential

The API key is automatically sent as the `x-api-key` header in all requests.

## Nodes

### Newscatcher CatchAll

Main node for interacting with the Newscatcher CatchAll API.

#### Resources and Operations

**Job Resource**

- **Submit**: Create a new CatchAll job with query, context, and schema
  - Required: `query`, `context`, `schema`
  - Optional: `limit`, `startDate`, `endDate`, `validators`, `enrichments`
- **Initialize**: Initialize a job with query, context, and schema (similar to Submit)
  - Required: `query`, `context`, `schema`
  - Optional: `limit`, `startDate`, `endDate`, `validators`, `enrichments`
- **Pull**: Retrieve results for a completed job by job ID
  - Required: `jobId`
- **Get Status**: Check the status of a job by job ID
  - Required: `jobId`
- **List User Jobs**: List all jobs created by the authenticated user with pagination
  - Optional: `page`, `pageSize`, `mode` (filter by processing mode: `base` or `lite`)
- **Continue**: Continue an existing job to process more records beyond the initial limit
  - Required: `jobId`, `newLimit`

**Monitor Resource**

- **Create**: Create a new monitor based on an existing reference job
- **List**: List all monitors for your API key
- **Get**: Get full details and records for a specific monitor
- **List Jobs**: List all jobs created by a specific monitor
- **Enable**: Enable a monitor by monitor ID
- **Disable**: Disable a monitor by monitor ID

**Project Resource**

- **Create**: Create a new project to group jobs, monitors, datasets, monitor groups, and webhooks
  - Required: `projectName`
  - Optional: `projectDescription`
- **List**: List all projects in the organization with pagination
  - Optional: `page`, `pageSize`, `search`
- **Get**: Get the full detail of a project by project ID
  - Required: `projectId`
- **Get Overview**: Get resource counts by type, including the webhooks count
  - Required: `projectId`
- **Update**: Update the name or description of a project (only supplied fields change)
  - Required: `projectId`
  - Optional: `projectName`, `projectDescription`
- **Add Resource**: Attach an existing resource to a project
  - Required: `projectId`, `resourceType` (`job`, `monitor`, `dataset`, `monitor_group`, or `webhook`), `resourceId`
- **Remove Resource**: Detach a resource from a project without deleting the resource itself
  - Required: `projectId`, `resourceType`, `resourceId`
- **Delete**: Delete a project; with **Delete Resources** enabled its jobs, monitors, datasets, and monitor groups are deleted too. Webhooks are never deleted by this operation — they are only detached and stay usable on their own.
  - Required: `projectId`
  - Optional: `deleteResources`

**Webhook Resource**

- **Create**: Create a webhook endpoint for the organization
  - Required: `webhookName`, `webhookTargetUrl`
  - Optional: `webhookType` (`generic`, `slack`, `teams`, `custom`), `deliveryMode` (`full` or `per_record`), `webhookHttpMethod`, `webhookCustomHeaders`, `webhookCustomParams`, `webhookAuthConfig`, `webhookProjectId` (attach to a project at creation time)
  - Auth accepts a JSON object: `{"type": "bearer", "token": "..."}`, `{"type": "api_key", "header": "...", "value": "..."}`, or `{"type": "basic", "username": "...", "password": "..."}`. Responses echo the `auth` object back with secret values masked, and the node returns it unmodified so downstream nodes can read it.
- **List**: List all webhooks belonging to the organization with pagination
  - Optional: `page`, `pageSize`, `search`
- **Get**: Get the full configuration of a webhook by webhook ID
  - Required: `webhookId`
- **Update**: Partially update a webhook; only supplied fields are changed. Set **Active** to Inactive to disable delivery without deleting.
  - Required: `webhookId`
  - Optional: `webhookName`, `webhookTargetUrl`, `webhookCustomHeaders`, `webhookCustomParams`, `webhookAuthConfig`, `webhookIsActive`
- **Delete**: Permanently delete a webhook and remove all its resource assignments
  - Required: `webhookId`

#### Example: Submit a Job

1. Add the **Newscatcher CatchAll** node to your workflow
2. Select **Resource**: `Job`
3. Select **Operation**: `Submit`
4. Select your **Newscatcher API** credential
5. Fill in:
   - **Query**: "Tech company earnings this quarter"
   - **Context**: (Optional) "Focus on revenue and profit margins"
   - **Schema**: (Optional) "Company [NAME] earned [REVENUE] in [QUARTER]"
   - **Limit**: (Optional) Maximum number of records
   - **Start Date**: (Optional) Search window start date
   - **End Date**: (Optional) Search window end date
   - **Validators**: (Optional) JSON array of custom validators
   - **Enrichments**: (Optional) JSON array of custom enrichment fields
6. Execute the workflow

The node returns a job ID that you can use with the **Pull**, **Get Status**, or **Continue** operations.

#### Example: Initialize a Job

Similar to Submit, but uses the initialize endpoint:

1. Select **Resource**: `Job`
2. Select **Operation**: `Initialize`
3. Fill in the same parameters as Submit
4. Execute to get a job ID

#### Example: List User Jobs

1. Select **Resource**: `Job`
2. Select **Operation**: `List User Jobs`
3. Optionally set:
   - **Page**: Page number (default: 1)
   - **Page Size**: Number of jobs per page (default: 10)
   - **Mode**: Filter jobs by processing mode (`Base` or `Lite`; default: all modes)
4. Execute to get a paginated list of all your jobs

#### Example: Continue a Job

Continue processing more records from an existing job:

1. Select **Resource**: `Job`
2. Select **Operation**: `Continue`
3. Fill in:
   - **Job ID**: The job ID from a previous Submit/Initialize operation
   - **New Limit**: Additional number of records to process
4. Execute to continue the job

#### Example: Create a Monitor

1. Add the **Newscatcher CatchAll** node to your workflow
2. Select **Resource**: `Monitor`
3. Select **Operation**: `Create`
4. Select your **Newscatcher API** credential
5. Fill in:
   - **Reference Job ID**: An existing job ID to base the monitor on
   - **Schedule**: "every day at 12 PM UTC"
   - **Webhook URL**: Your webhook endpoint URL
   - **Webhook Method**: POST or GET
   - **Webhook Headers/Params/Auth**: (Optional) JSON configuration
6. Execute the workflow

### Newscatcher CatchAll Trigger

Webhook trigger node that activates when a monitor has new results.

#### Setup

1. Add the **Newscatcher CatchAll Trigger** node to your workflow
2. Select your **Newscatcher API** credential
3. Select a **Monitor** from the dropdown (monitors are loaded from your API)
4. Activate the workflow

When the selected monitor has new results, Newscatcher will POST the data to the webhook URL, and your workflow will be triggered automatically.

## API Documentation

For detailed API documentation, visit:
- [Newscatcher CatchAll API](https://catchall.newscatcherapi.com/)
- [Newscatcher Web Search API Documentation](https://www.newscatcherapi.com/docs/web-search-api/)
- [Newscatcher General Documentation](https://newscatcherapi.com/docs)

### API Endpoints Reference

- **Submit Job**: [Create Job](https://www.newscatcherapi.com/docs/web-search-api/api-reference/jobs/create-job)
- **Initialize Job**: [Initialize Job](https://www.newscatcherapi.com/docs/web-search-api/api-reference/jobs/initialize-job)
- **List User Jobs**: [List User Jobs](https://www.newscatcherapi.com/docs/web-search-api/api-reference/jobs/list-user-jobs)
- **Continue Job**: [Continue Job](https://www.newscatcherapi.com/docs/web-search-api/api-reference/jobs/continue-job)

## Development

### Local Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Lint the code
npm run lint
```

### Project Structure

```
src/
  credentials/
    NewscatcherApi.credentials.ts    # Credential type definition
  nodes/
    Newscatcher/
      Newscatcher.node.ts              # Main node
      NewscatcherCatchAllTrigger.node.ts # Trigger node
      newscatcher-new.svg              # Node icon (SVG)
```

## License

MIT

## Support

- **Issues**: [GitHub Issues](https://github.com/Newscatcher/n8n-nodes-newscatcher-catchall-pernode/issues)
- **Repository**: [GitHub](https://github.com/Newscatcher/n8n-nodes-newscatcher-catchall-pernode)
