# NFL Showdown Research Desk

A reusable browser-local football research and lineup workspace.

Features: player pool and CSV salary import, weekly historical comparisons, defense matchups, hypothetical weekly optimals, editable ownership estimates, lineup construction, and game backup import/export.

The public edition uses **synthetic example salaries**. Import your own CSV before analyzing a real contest. Historical data covers the 2025 regular season and 2026 Weeks 1–4; opening this site does not refresh data.

## Run locally

Serve this directory with a static HTTP server, for example `python -m http.server 8000`, and open http://localhost:8000. No build, backend, API key, account, or database is required.

## GitHub Pages

In Settings → Pages select Deploy from a branch, main, / (root). All asset paths are relative, so project-site URLs are supported. Confirm the Pages build completes before sharing the deployed URL.

## Data and privacy

See [DATA-NOTICE.txt](DATA-NOTICE.txt) for attribution, transformations, limitations and code licensing. Edits stay in your browser; export backups to move them. The public edition excludes private spreadsheets, original Git history, contest IDs and third-party salary snapshots.
