import { app } from './app.js';

const port = 3000;

// Start the API for requests from a browser or Postman.
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});