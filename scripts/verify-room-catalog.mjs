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
  ['id', 'active', 'sort_order', 'name_ru', 'description_ru', 'area_m2', 'max_guests', 'bed_type_ru', 'amenities_ru', 'price', 'currency', 'photo1', 'photo10'],
  ['almaty-standard', true, 20, 'Стандарт', 'Описание', 24, 2, 'Двуспальная кровать', 'Кондиционер, Фен, Сейф', 25000, '₸', 'https://example.com/1.jpg', 'https://example.com/10.jpg'],
  ['almaty-hidden', false, 10, 'Скрытый', 'Описание', 20, 2, '', '', 20000, '₸', 'https://example.com/hidden.jpg', ''],
  ['', true, 5, 'Супериор', 'Описание Алматы', 22, 2, '', 'Wi-Fi; Smart TV', 28000, '', 'https://example.com/almaty.jpg', ''],
];

const rooms = parseSheetValues(values, 'almaty');
assert.equal(rooms.length, 2, 'Inactive rows must be excluded');
assert.equal(rooms[0].city, 'almaty', 'City must be inherited from the sheet');
assert.equal(rooms[0].name.ru, 'Супериор', 'Rooms must be sorted by sort_order');
assert.equal(rooms[0].currency, '₸', 'Currency must default to tenge');
assert.deepEqual(rooms[0].amenities.ru, ['Wi-Fi', 'Smart TV'], 'Amenities must support semicolon separation');
assert.equal(rooms[1].images.length, 2, 'Photos from photo1 through photo10 must be collected');
assert.equal(rooms[1].name.en, 'Стандарт', 'Missing translations must fall back to Russian');

console.log('Verified Google Sheets room catalog parser.');
