import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/bnovo-filter.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const {
  enforceBnovoBookingUrl,
  enforceBnovoSignalFilter,
} = await import(moduleUrl);

const astanaUrl = enforceBnovoBookingUrl(
  'https://reservationsteps.ru/rooms/index/a8395a9c-768d-4038-ae49-cf4072d9dcb4?lang=ru',
  'astana',
);
assert.equal(new URL(astanaUrl).searchParams.get('onlyrooms'), '551530');
assert.equal(new URL(astanaUrl).searchParams.get('firstroom'), '551530');

const almatyUrl = enforceBnovoBookingUrl(
  'https://reservationsteps.ru/rooms/index/a8395a9c-768d-4038-ae49-cf4072d9dcb4?onlyrooms=551530&firstroom=551530',
  'almaty',
);
assert.equal(new URL(almatyUrl).searchParams.get('onlyrooms'), '551521,551494');
assert.equal(new URL(almatyUrl).searchParams.get('firstroom'), '551521');

const unrelatedUrl = 'https://example.com/rooms/index/test?onlyrooms=1';
assert.equal(enforceBnovoBookingUrl(unrelatedUrl, 'astana'), unrelatedUrl);

const signal = { event: 'bnovowidget_signal', params: { onlyrooms: '551521,551494' } };
assert.equal(enforceBnovoSignalFilter(signal, 'astana'), true);
assert.equal(signal.params.onlyrooms, '551530');
assert.equal(signal.params.firstroom, '551530');
assert.equal(enforceBnovoSignalFilter({ event: 'bnovobook_signal', params: {} }, 'astana'), false);

console.log('Verified persistent Bnovo city room filters.');
