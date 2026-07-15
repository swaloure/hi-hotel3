import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/csv.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { parseCsv } = await import(moduleUrl);

assert.deepEqual(
  parseCsv('Название,Описание\r\nСтандарт,"Первая строка\nВторая строка"\r\n"С кавычкой","Текст ""в кавычках"""'),
  [
    ['Название', 'Описание'],
    ['Стандарт', 'Первая строка\nВторая строка'],
    ['С кавычкой', 'Текст "в кавычках"'],
  ],
);
assert.deepEqual(parseCsv(''), []);

console.log('Verified public Google Sheets CSV parser.');
