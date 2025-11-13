# n8n-nodes-newscatcher-catchall-pernode

Community node for [Newscatcher CatchAll](https://catchall.newscatcherapi.com/) with two operations and **per-node API Key** only:
- **Submit**: Create a job (query/context/schema)
- **Pull**: Fetch results by `job_id`

## Authentication
Enter your API key directly in the node field (**API Key**) — no credentials entity required.

## Install (Local)
```bash
npm install
npm run build
```

## Publish to npm (for n8n Cloud)
```bash
npm login
npm version patch
npm publish --access public
```

Then in **n8n Cloud → Settings → Community Nodes → Install**, enter:
```
n8n-nodes-newscatcher-catchall-pernode
```
