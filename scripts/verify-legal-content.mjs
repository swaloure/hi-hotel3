import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/legal-content.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { parseLegalCell } = await import(moduleUrl);

assert.equal(parseLegalCell([['  Первая строка\n\nВторая строка  ']]), 'Первая строка\n\nВторая строка');
assert.equal(parseLegalCell([]), '');
assert.equal(parseLegalCell(undefined), '');

console.log('Verified Google Sheets legal content parser.');
