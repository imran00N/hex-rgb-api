/**
 * Convert a six-digit hexadecimal colour into RGB components.
 * @param {string} hex - Six hex characters without #, such as "336699".
 * @returns {{r: number, g: number, b: number}} Components from 0 to 255.
 * @throws {TypeError} If the input is not a string.
 * @throws {RangeError} If the string is not exactly six hex characters.
 */
export function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string.');
  }

  if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) {
    throw new RangeError('Hex value must contain exactly six hex characters.');
  }

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
}