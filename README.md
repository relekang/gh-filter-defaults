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
