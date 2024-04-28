const generateMockData = require("./data");

// Generator function to split object into chunks and stringify them
function* splitAndStringify(obj) {
  const chunkSize = 1;

  const keys = Object.keys(obj);
  let currentChunk = {};
  let isFirstResultsChunk = true;
  let isLastResultsChunk = false;

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'metadata') {
      currentChunk[keys[i]] = obj[keys[i]];
      if (Object.keys(currentChunk).length === chunkSize || i === keys.length - 1) {
        const s = JSON.stringify(currentChunk);
        yield s.substring(0, s.length - 1) + ",";
        currentChunk = {};
      }
    }
    else
      if (keys[i] === 'results') {
        const resultKeys = Object.keys(obj[keys[i]]);
        for (let j = 0; j < resultKeys.length; j++) {
          currentChunk[resultKeys[j]] = obj[keys[i]][resultKeys[j]];
          if (Object.keys(currentChunk).length === chunkSize || j === resultKeys.length - 1) {
            if (isFirstResultsChunk) {
              yield '"results":{';
              isFirstResultsChunk = false;
            } else {
              yield ',';
            }
            const s = JSON.stringify(currentChunk);
            yield s.substring(1, s.length - 1);
            currentChunk = {};
            if (j === resultKeys.length - 1 && i === keys.length - 1) {
              isLastResultsChunk = true;
            }
          }
        }
        yield '}';
      }
  }

  yield '}';
}
// Usage example: Splitting into chunks of 1 key each
const chunkSize = 1;
const generator = splitAndStringify(generateMockData(10, 10), chunkSize);

let i = 0;
for (let chunk of generator) {
  console.log(i, chunk, "\n");
  i++
}

module.exports = splitAndStringify;