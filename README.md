# Hex-to-RGB API

A small JavaScript colour converter exposed through an Express REST API.
The project includes unit tests, integration tests and Postman checks.

## Requirements

Node.js 24 and npm.

## Install dependencies

```bash
npm ci
```

## Start the server

```bash
npm start
```

The server listens on http://localhost:3000.

## Convert a colour

Send a GET request to:

```text
http://localhost:3000/api/hex-to-rgb?hex=336699
```

Expected response: HTTP 200 with:

```json
{
  "r": 51,
  "g": 102,
  "b": 153
}
```

Input must contain exactly six hexadecimal characters without a # prefix.
Uppercase and lowercase letters are accepted.

Missing or invalid input returns HTTP 400 with a JSON error message.

## Run tests

Unit tests only:

```bash
npm run test:unit
```

Integration tests only:

```bash
npm run test:integration
```

Both suites:

```bash
npm test
```

Expected results: 20 unit tests and 8 integration tests, totalling 28.
The automated tests do not require the server to be started manually.

## Project files

- src/hexToRgb.js: conversion function and input validation.
- src/app.js: Express application and conversion route.
- src/server.js: starts the server.
- tests/hexToRgb.test.js: unit tests.
- tests/api.test.js: integration tests.

## Test coverage

Unit tests check known colours, letter casing, invalid strings and
incorrect input types.

Integration tests check successful conversions, missing and invalid
input, JSON responses and an unknown route.

Postman checks exercise the running server with valid and invalid input,
checking status codes, content types and response bodies.

## Limitations

Three-digit shorthand, # prefixes, whitespace and alpha channels
are not supported. The tests cover selected cases rather than every
possible input. Load and performance testing are outside this exercise.

## References

- Express: https://expressjs.com/
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- Supertest: https://github.com/forwardemail/supertest
- Postman: https://learning.postman.com/