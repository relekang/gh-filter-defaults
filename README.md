<img src="public/icon/128.png" alt="" width="64" align="right">

# GitHub filter defaults

A browser extension that changes the default filters of GitHub pull request lists.

## Features

### Hide draft pull requests

The extension adds `draft:false` to the search query of pull request lists. It does not change the query if the query already has a `draft:` qualifier.

To see only draft pull requests, add `draft:true` to the query. To see draft and non-draft pull requests, add `draft:any`. GitHub has no `draft:any` value, so the extension replaces it with `(draft:true OR draft:false)`.

The extension changes these pages:

| Page                        | Without `q`                      | With `q`           |
| --------------------------- | -------------------------------- | ------------------ |
| `/<owner>/<repo>/pulls`     | Uses `is:pr is:open draft:false` | Adds `draft:false` |
| `/pulls`, `/pulls/<tab>`    | No change                        | Adds `draft:false` |
| `/search?type=pullrequests` | No change                        | Adds `draft:false` |

When the URL must change, the extension replaces it. If you open a list from a link on GitHub, the page loads two times.

## Releases

Release Please opens a version PR for release changes on `main` and enables auto-merge. It updates `package.json` and `CHANGELOG.md`. After the PR merges, the release workflow builds Chrome and Firefox ZIP files from the release commit. It uploads all ZIP files to a draft release before it publishes the release. Published releases are immutable.

Repository setup:

- Set the `RELEASE_TOKEN` Actions secret to a personal access token with write access to contents, issues, and pull requests in this repository.
- Enable auto-merge and require CI checks on `main` so release PRs cannot merge before the checks pass.
- Enable immutable releases in the repository settings.

### Firefox Add-ons

After the GitHub release is published, the workflow submits the Firefox ZIP and source ZIP to the existing public listing on Mozilla Add-ons. Mozilla can require review before the update is available.

To enable submissions, set the `FIREFOX_JWT_ISSUER` and `FIREFOX_JWT_SECRET` Actions secrets from [Mozilla's API keys page](https://addons.mozilla.org/developers/addon/api/key/). Leave `FIREFOX_JWT_ISSUER` unset until the first manual submission is approved. If it is unset, the workflow skips Firefox submission and still publishes the GitHub release. If it is set but `FIREFOX_JWT_SECRET` is missing, the submission step fails.

The workflow does not publish to the Chrome Web Store.

## Development

The extension uses [WXT](https://wxt.dev). You must have Node.js and pnpm.

```sh
mise install        # Install Node.js and pnpm
pnpm install
pnpm dev            # Open Chrome with the extension
pnpm dev:firefox    # Open Firefox with the extension
```

| Script         | Description                         |
| -------------- | ----------------------------------- |
| `pnpm build`   | Build for all browsers into `dist/` |
| `pnpm test`    | Run the unit tests                  |
| `pnpm compile` | Do a type check                     |
| `pnpm lint`    | Lint with oxlint                    |
| `pnpm fmt`     | Format with oxfmt                   |
| `pnpm zip`     | Make a zip file to publish          |

### Load the build in the browser

- **Chrome:** Go to `chrome://extensions`, set **Developer mode** to on, click **Load unpacked** and select `dist/chrome-mv3`.
- **Firefox:** Go to `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on** and select `dist/firefox-mv2/manifest.json`.
