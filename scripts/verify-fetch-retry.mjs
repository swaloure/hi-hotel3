import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/fetch-with-retry.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { fetchWithRetry } = await import(moduleUrl);

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;

try {
  globalThis.setTimeout = (callback) => {
    queueMicrotask(callback);
    return 0;
  };

  let attempts = 0;
  globalThis.fetch = async () => {
    attempts += 1;
    return attempts < 3 ? new Response('', { status: 503 }) : new Response('ok', { status: 200 });
  };

  const recoveredResponse = await fetchWithRetry('https://example.com');
  assert.equal(recoveredResponse.status, 200);
  assert.equal(attempts, 3, 'Temporary server errors must be retried automatically');

  attempts = 0;
  globalThis.fetch = async () => {
    attempts += 1;
    return new Response('', { status: 404 });
  };

  const permanentResponse = await fetchWithRetry('https://example.com');
  assert.equal(permanentResponse.status, 404);
  assert.equal(attempts, 1, 'Permanent client errors must not be retried');
} finally {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
}

console.log('Verified automatic retries for temporary Google Sheets failures.');
