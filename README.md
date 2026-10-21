# Playwright Framework

Playwright end-to-end and API tests for the QA Cart application, written in TypeScript.

## Requirements

- Node.js and npm
- A reachable QA Cart environment
- Playwright browser binaries (Chromium, Firefox, and WebKit)

## Setup

Install the project dependencies:

```bash
npm install
```

Each person using this framework must create their own `.env` file on their local machine. The `.env` file is intentionally excluded from the repository, so it will not be present after cloning or pulling the project. Copy the tracked `.env.example` template to `.env` in the project root:

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Then edit the local `.env` file and set the URL for the QA Cart environment:

```env
QACART_URL=https://your-qa-cart-environment.example
```

Replace the example URL with the actual environment URL. `.env` is ignored by Git and should not be committed. The `.env.example` file is the shared template; `dotenv/config` loads your local `.env`, and the configuration helper requires `QACART_URL` to be set.

Install the browser binaries used by the Playwright projects:

```bash
npx playwright install
```

## Project structure

```text
.
├── api/                    # API service methods for registration and todo operations
├── configurations/         # Environment-variable configuration helpers
├── models/                 # Test data models, including the generated User
├── pages/                  # Page objects and PageManager
├── tests/                  # Playwright test specs
├── utils/                  # Shared utilities, including the test-step decorator
├── .env.example            # Example environment configuration
├── playwright.config.ts    # Playwright projects, browsers, retries, and reporters
└── package.json            # Dependencies
```

## Running tests

Run all tests across the configured browser projects (Chromium, Firefox, and WebKit):

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/createTodo.spec.ts
```

```bash
npx playwright test tests/registerUser.spec.ts
```

Run a single test by its title:

```bash
npx playwright test tests/createTodo.spec.ts -g "Create Todo Test via API"
```

Run tests in one browser project only:

```bash
npx playwright test --project=chromium
```

To see the browser while tests run, add `--headed`:

```bash
npx playwright test tests/createTodo.spec.ts --project=chromium --headed
```

## Reports

The Playwright configuration writes an HTML report to `playwright-report` and Allure result files to `allure-results`.

Open the HTML report after a test run:

```bash
npx playwright show-report
```
