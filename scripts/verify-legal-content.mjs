import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/legal-content.ts', import.meta.url), 'utf8');
const csvSource = await readFile(new URL('../lib/data/csv.ts', import.meta.url), 'utf8');
const configSource = await readFile(new URL('../lib/data/sheets-config.ts', import.meta.url), 'utf8');
const retrySource = await readFile(new URL('../lib/data/fetch-with-retry.ts', import.meta.url), 'utf8');
const csvModuleUrl = compileModule(csvSource);
const configModuleUrl = compileModule(configSource);
const retryModuleUrl = compileModule(retrySource);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  }).outputText
  .replace("'@/lib/data/csv'", `'${csvModuleUrl}'`)
  .replace("'@/lib/data/fetch-with-retry'", `'${retryModuleUrl}'`)
  .replace("'@/lib/data/sheets-config'", `'${configModuleUrl}'`);
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { legalSheetNames, parseLegalCell } = await import(moduleUrl);

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
assert.deepEqual(legalSheetNames, {
  almaty: {
    privacy: 'Политика Алматы',
    offer: 'Оферта Алматы',
  },
  astana: {
    privacy: 'Политика Астана',
    offer: 'Оферта Астана',
  },
});

console.log('Verified Google Sheets legal content parser.');
