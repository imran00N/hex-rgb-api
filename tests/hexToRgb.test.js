import { expect } from 'chai';
import { describe, it } from 'mocha';
import { hexToRgb } from '../src/hexToRgb.js';

describe('hexToRgb — unit tests', function () {
  // Known answers check the conversion without repeating its algorithm.
  const validCases = [
    { name: 'black', hex: '000000', rgb: { r: 0, g: 0, b: 0 } },
    { name: 'white', hex: 'FFFFFF', rgb: { r: 255, g: 255, b: 255 } },
    { name: 'red', hex: 'FF0000', rgb: { r: 255, g: 0, b: 0 } },
    { name: 'green', hex: '00FF00', rgb: { r: 0, g: 255, b: 0 } },
    { name: 'blue', hex: '0000FF', rgb: { r: 0, g: 0, b: 255 } },
    { name: 'a mixed colour', hex: '336699', rgb: { r: 51, g: 102, b: 153 } },
    { name: 'lowercase letters', hex: 'aabbcc', rgb: { r: 170, g: 187, b: 204 } },
    { name: 'mixed-case letters', hex: 'AaBbCc', rgb: { r: 170, g: 187, b: 204 } }
  ];

  for (const { name, hex, rgb } of validCases) {
    it(`converts ${name}`, function () {
      expect(hexToRgb(hex)).to.deep.equal(rgb);
    });
  }

  const invalidStrings = [
    { name: 'an empty string', value: '' },
    { name: 'three-digit shorthand', value: 'FFF' },
    { name: 'a seven-character value', value: '1234567' },
    { name: 'a hash prefix', value: '#336699' },
    { name: 'non-hex letters', value: 'GG0000' },
    { name: 'a space', value: '33 699' },
    { name: 'a trailing newline', value: '336699\n' }
  ];

  for (const { name, value } of invalidStrings) {
    it(`rejects ${name}`, function () {
      expect(() => hexToRgb(value)).to.throw(
        RangeError,
        'Hex value must contain exactly six hex characters.'
      );
    });
  }

  const invalidTypes = [
    { name: 'a number', value: 336699 },
    { name: 'null', value: null },
    { name: 'undefined', value: undefined },
    { name: 'an array', value: ['336699'] },
    { name: 'an object', value: { hex: '336699' } }
  ];

  for (const { name, value } of invalidTypes) {
    it(`rejects ${name}`, function () {
      expect(() => hexToRgb(value)).to.throw(
        TypeError,
        'Hex value must be a string.'
      );
    });
  }
});