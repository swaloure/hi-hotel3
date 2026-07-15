import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/rooms-catalog.ts', import.meta.url), 'utf8');
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
const { parseSheetValues } = await import(moduleUrl);

function compileModule(moduleSource) {
  const output = ts.transpileModule(moduleSource, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return `data:text/javascript;base64,${Buffer.from(output).toString('base64')}`;
}

const values = [
  [
    'Название номера (русский)', 'Название номера (казахский)', 'Название номера (английский)',
    'Площадь м²', 'Количество гостей',
    'Описание номера (русский)', 'Описание номера (казахский)', 'Описание номера (английский)',
    'Тип кровати (русский)', 'Тип кровати (казахский)', 'Тип кровати (английский)',
    'Удобства через запятую (русский)', 'Удобства через запятую (казахский)', 'Удобства через запятую (английский)',
    'Цена за ночь', 'Валюта',
    'Ярлык (русский)', 'Ярлык (казахский)', 'Ярлык (английский)',
    'Фото 1', 'Фото 10',
  ],
  [
    'Стандарт', 'Стандарт', 'Standard', 24, 2,
    'Описание', 'Сипаттама', 'Description',
    'Двуспальная кровать', 'Екі кісілік кереует', 'Double bed',
    'Кондиционер, Фен, Сейф', 'Кондиционер, Фен, Сейф', 'Air conditioning, Hair dryer, Safe',
    25000, '₸', 'Популярный', 'Танымал', 'Popular',
    'https://example.com/1.jpg', 'https://example.com/10.jpg',
  ],
  ['', '', '', 20, 2, 'Строка без названия', '', '', '', '', '', '', '', '', 20000, '₸', '', '', '', 'https://example.com/hidden.jpg', ''],
  [
    'Супериор', '', '', 22, 2, 'Описание Алматы', '', '', '', '', '',
    'Wi-Fi; Smart TV', '', '', 28000, '', '', '', '', 'https://example.com/almaty.jpg', '',
  ],
];

const rooms = parseSheetValues(values, 'almaty');
assert.equal(rooms.length, 2, 'Rows without a room name must be excluded');
assert.equal(rooms[0].city, 'almaty', 'City must be inherited from the sheet');
assert.equal(rooms[0].name.ru, 'Стандарт', 'Rows must keep their spreadsheet order');
assert.equal(rooms[0].currency, '₸', 'Currency must default to tenge');
assert.deepEqual(rooms[1].amenities.ru, ['Wi-Fi', 'Smart TV'], 'Amenities must support semicolon separation');
assert.equal(rooms[0].images.length, 2, 'Photos from Фото 1 through Фото 10 must be collected');
assert.equal(rooms[0].name.kz, 'Стандарт', 'Kazakh room names must be read from the sheet');
assert.equal(rooms[0].name.en, 'Standard', 'English room names must be read from the sheet');
assert.equal(rooms[0].description.kz, 'Сипаттама', 'Kazakh descriptions must be read from the sheet');
assert.deepEqual(rooms[0].amenities.en, ['Air conditioning', 'Hair dryer', 'Safe'], 'English amenities must be read from the sheet');
assert.equal(rooms[1].name.en, 'Супериор', 'Missing translations must fall back to Russian');

console.log('Verified Google Sheets room catalog parser.');
