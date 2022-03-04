const RANDOM = require('random');

function randomObj() {
    const numRandom = RANDOM.int(1, 6);
    return numRandom;
}

module.exports = randomObj;
