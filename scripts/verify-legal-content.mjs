import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/legal-content.ts', import.meta.url), 'utf8');
const csvSource = await readFile(new URL('../lib/data/csv.ts', import.meta.url), 'utf8');
const configSource = await readFile(new URL('../lib/data/sheets-config.ts', import.meta.url), 'utf8');
const csvModuleUrl = compileModule(csvSource);
const configModuleUrl = compileModule(configSource);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText
  .replace("'@/lib/data/csv'", `'${csvModuleUrl}'`)
  .replace("'@/lib/data/sheets-config'", `'${configModuleUrl}'`);
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { parseLegalCell } = await import(moduleUrl);

function compileModule(moduleSource) {
  const output = ts.transpileModule(moduleSource, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return `data:text/javascript;base64,${Buffer.from(output).toString('base64')}`;
}

assert.equal(parseLegalCell([['  Первая строка\n\nВторая строка  ']]), 'Первая строка\n\nВторая строка');
assert.equal(parseLegalCell([]), '');
assert.equal(parseLegalCell(undefined), '');

console.log('Verified Google Sheets legal content parser.');
