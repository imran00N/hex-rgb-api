import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Hex-to-RGB API — integration tests', function () {
  const route = '/api/hex-to-rgb';

  it('returns the correct RGB values for a mixed colour', async function () {
    const response = await request(app)
      .get(route)
      .query({ hex: '336699' })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).to.deep.equal({
      r: 51,
      g: 102,
      b: 153
    });
  });

  it('accepts lowercase hex letters', async function () {
    const response = await request(app)
      .get(route)
      .query({ hex: 'aabbcc' })
      .expect(200);

    expect(response.body).to.deep.equal({
      r: 170,
      g: 187,
      b: 204
    });
  });

  it('returns 400 when the hex parameter is missing', async function () {
    const response = await request(app)
      .get(route)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).to.deep.equal({
      error: 'Hex value must be a string.'
    });
  });

  // Each case checks the complete route, including library validation.
  const invalidCases = [
    { name: 'an empty value', hex: '' },
    { name: 'invalid characters', hex: 'GG0000' },
    { name: 'three-digit shorthand', hex: 'FFF' },
    { name: 'a hash prefix', hex: '#336699' }
  ];

  for (const { name, hex } of invalidCases) {
    it(`returns 400 for ${name}`, async function () {
      const response = await request(app)
        .get(route)
        .query({ hex })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).to.deep.equal({
        error: 'Hex value must contain exactly six hex characters.'
      });
    });
  }

  it('returns 404 for an unknown route', async function () {
    await request(app)
      .get('/api/unknown')
      .expect(404);
  });
});