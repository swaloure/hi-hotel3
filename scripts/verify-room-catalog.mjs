import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/data/rooms-catalog.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const { parseSheetValues } = await import(moduleUrl);

const values = [
  ['Название номера', 'Площадь м²', 'Количество гостей', 'Описание номера', 'Тип кровати', 'Удобства через запятую', 'Цена за ночь', 'Валюта', 'Ярлык', 'Фото 1', 'Фото 10'],
  ['Стандарт', 24, 2, 'Описание', 'Двуспальная кровать', 'Кондиционер, Фен, Сейф', 25000, '₸', 'Популярный', 'https://example.com/1.jpg', 'https://example.com/10.jpg'],
  ['', 20, 2, 'Строка без названия', '', '', 20000, '₸', '', 'https://example.com/hidden.jpg', ''],
  ['Супериор', 22, 2, 'Описание Алматы', '', 'Wi-Fi; Smart TV', 28000, '', '', 'https://example.com/almaty.jpg', ''],
];

const rooms = parseSheetValues(values, 'almaty');
assert.equal(rooms.length, 2, 'Rows without a room name must be excluded');
assert.equal(rooms[0].city, 'almaty', 'City must be inherited from the sheet');
assert.equal(rooms[0].name.ru, 'Стандарт', 'Rows must keep their spreadsheet order');
assert.equal(rooms[0].currency, '₸', 'Currency must default to tenge');
assert.deepEqual(rooms[1].amenities.ru, ['Wi-Fi', 'Smart TV'], 'Amenities must support semicolon separation');
assert.equal(rooms[0].images.length, 2, 'Photos from Фото 1 through Фото 10 must be collected');
assert.equal(rooms[0].name.en, 'Стандарт', 'Russian values must be used for every site language');

console.log('Verified Google Sheets room catalog parser.');
