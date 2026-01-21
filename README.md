# n8n-nodes-newscatcher-catchall-pernode

n8n community node for [Newscatcher CatchAll](https://catchall.newscatcherapi.com/) API integration. This node allows you to submit jobs, retrieve results, manage monitors, and receive real-time webhook triggers from Newscatcher CatchAll.

## Features

- **Job Management**: Submit jobs, pull results, and check job status
- **Monitor Management**: Create, list, enable, disable monitors, and retrieve monitor details
- **Webhook Trigger**: Real-time trigger node for monitor results
- **Per-node API Key**: Simple authentication with API key stored directly in the node (not encrypted)

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

Enter your Newscatcher API key directly in the node's **API Key** field. The API key is stored as a node setting (not encrypted). Get your API key from [Newscatcher](https://newscatcherapi.com/).

## Nodes

### Newscatcher CatchAll

Main node for interacting with the Newscatcher CatchAll API.

#### Resources

**Job**
- **Submit**: Create a new CatchAll job with query, context, and schema
- **Pull**: Retrieve results for a completed job by job ID
- **Get Status**: Check the status of a job by job ID

**Monitor**
- **Create**: Create a new monitor based on an existing reference job
- **List**: List all monitors for your API key
- **Get**: Get full details and records for a specific monitor
- **List Jobs**: List all jobs created by a specific monitor
- **Enable**: Enable a monitor by monitor ID
- **Disable**: Disable a monitor by monitor ID

#### Example: Submit a Job

1. Add the **Newscatcher CatchAll** node to your workflow
2. Select **Resource**: `Job`
3. Select **Operation**: `Submit`
4. Enter your **API Key**
5. Fill in:
   - **Query**: "Tech company earnings this quarter"
   - **Context**: (Optional) "Focus on revenue and profit margins"
   - **Schema**: (Optional) "Company [NAME] earned [REVENUE] in [QUARTER]"
6. Execute the workflow

The node returns a job ID that you can use with the **Pull** or **Get Status** operations.

#### Example: Create a Monitor

1. Add the **Newscatcher CatchAll** node to your workflow
2. Select **Resource**: `Monitor`
3. Select **Operation**: `Create`
4. Enter your **API Key**
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
2. Enter your **API Key**
3. Select a **Monitor** from the dropdown (monitors are loaded from your API)
4. Activate the workflow

When the selected monitor has new results, Newscatcher will POST the data to the webhook URL, and your workflow will be triggered automatically.

## Development

### Local Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Lint the code
npx @n8n/scan-community-package n8n-nodes-newscatcher-catchall-pernode
```

### Project Structure

```
src/
  nodes/
    Newscatcher/
      Newscatcher.node.ts              # Main node
      NewscatcherCatchAllTrigger.node.ts # Trigger node
      newscatcher-new.png              # Node icon
```

## API Documentation

For detailed API documentation, visit:
- [Newscatcher CatchAll API](https://catchall.newscatcherapi.com/)
- [Newscatcher Documentation](https://newscatcherapi.com/docs)

## License

MIT

## Support

- **Issues**: [GitHub Issues](https://github.com/Newscatcher/n8n-nodes-newscatcher-catchall-pernode/issues)
- **Repository**: [GitHub](https://github.com/Newscatcher/n8n-nodes-newscatcher-catchall-pernode)
