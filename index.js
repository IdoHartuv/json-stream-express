const express = require('express')
const app = express();
// const { JsonStreamStringify } = require('json-stream-stringify');
const generateMockData = require('./data.js');
const splitAndStringify = require('./split.js');

app.get('/stream', (req, res) => {
  res.type('json'); // Required for proper handling by test frameworks and some clients

  console.time('generate')
  const data = generateMockData(100000, 100);
  console.timeEnd('generate')

  console.time('send')

  // res.send(data)
  // const stream = new JsonStreamStringify(data);
  // stream.pipe(res);

  const objectChunks = splitAndStringify(data);

  function sendChunk() {
    const { done, value } = objectChunks.next();

    if (done) {
      res.end();
      return;
    }

    res.write(value);
    setImmediate(sendChunk); // Send the next chunk asynchronously
  }

  sendChunk();

  console.timeEnd('send')
});

const PORT = 3000;

app.listen(PORT, () => console.log('Server is listening on port', PORT))