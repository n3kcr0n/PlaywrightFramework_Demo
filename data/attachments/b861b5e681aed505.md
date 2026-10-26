# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: swagE2e.spec.ts >> E2E Tests >> E2E Test
- Location: tests/swagE2e.spec.ts:16:9

# Error details

```
Error: Missing required environment variable: SAUCEDEMO_URL
```

# Test source

```ts
  1  | import 'dotenv/config';
  2  | 
  3  | export function getEnv(name: string): string {
  4  |   const value = process.env[name];
  5  | 
  6  |   if (!value?.trim()) {
> 7  |     throw new Error(`Missing required environment variable: ${name}`);
     |           ^ Error: Missing required environment variable: SAUCEDEMO_URL
  8  |   }
  9  | 
  10 |   return value;
  11 | }
```