// Generate random strings for each field in each record
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Define the dimensions of the array
const numRecords = 100000;
const numFields = 100;


function generateMockData(numRecords, numFields) {
  // Create the 2D array
  let twoDArray = new Array(numRecords);
  for (let i = 0; i < numRecords; i++) {
    twoDArray[i] = new Array(numFields);
    for (let j = 0; j < numFields; j++) {
      twoDArray[i][j] = generateRandomString(10);
    }
  }

  // Generate the metadata object
  const metadata = { key: 'value' };

  // Generate the results object with a map of string keys to 2D arrays
  const results = {};
  for (let i = 0; i < 5; i++) {
    const key = `array_${i}`;
    results[key] = twoDArray;
  }

  // Create the final object
  return {
    metadata,
    results,
  };
}

module.exports = generateMockData;