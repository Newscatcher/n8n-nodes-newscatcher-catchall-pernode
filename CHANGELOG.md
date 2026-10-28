# Changelog

## 2026-10-27 — CatchAll API 1.10.3 sync

- **New Source Group resource**: **List** operation calling `GET /catchAll/source-groups`
  with `page` and `pageSize` (1-500) mapped to `page` / `page_size`. Returns
  `source_groups[{slug, name, description}]`, `total`, `page`, `page_size`.
- **Job > Submit**: added an optional **Source Groups** field (comma-separated slugs, max 20)
  sent as `source_groups` in the `POST /catchAll/submit` body only when set. More than
  20 slugs fails with a clear node error before the request.
- **New Monitor > Update operation**: `PATCH /catchAll/monitors/{monitor_id}` with optional
  **Schedule** (natural language) and **Timezone** (IANA; the API ignores it when no
  schedule is sent). Each is sent as `schedule` / `timezone` only when set.

## 2026-09-30 — 0.1.45

- Added `n8n.n8nNodesApiVersion: 1` so the n8n community-node review can approve the update.

## 2026-08-12 — CatchAll API 1.7.0 sync

- **Job > List User Jobs**: added an optional **Mode** filter (`base` | `lite`) that maps to
  the new `mode` query parameter on `GET /catchAll/jobs/user`.
- **New Webhook resource**: Create / List / Get / Update / Delete operations against
  `/catchAll/webhooks` and `/catchAll/webhooks/{webhook_id}`. Create supports the new
  optional `project_id` field to attach the webhook to a project at creation time, plus
  type (generic/slack/teams/custom), delivery mode (full/per_record), method, headers,
  params, and an `auth` object (`bearer` / `api_key` / `basic`) — responses echo `auth`
  back with secret values masked, and the node passes it through unmodified.
- **New Project resource**: Create / List / Get / Get Overview / Update / Delete plus
  Add Resource and Remove Resource operations against `/catchAll/projects`,
  `/catchAll/projects/{project_id}`, `/catchAll/projects/{project_id}/overview`, and
  `/catchAll/projects/{project_id}/resources[/{resource_type}/{resource_id}]`.
  Add/Remove Resource accept resource_type `job`, `monitor`, `dataset`, `monitor_group`,
  and the new `webhook`. Get Overview surfaces the new `webhooks` count. Delete supports
  `delete_resources`; webhooks are only detached by project deletion, never deleted.
