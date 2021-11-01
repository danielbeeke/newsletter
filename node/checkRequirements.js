const fs = require('fs');

let checkRequirements = () => {
  if (!process.argv[2]) {
    console.error('A newsletter filename should be given');
    return false;
  }

  let fileExists = fs.existsSync('./exports/' + process.argv[2] + '.html');

  if (!fileExists) {
    console.error('A newsletter was not found');
    return false;
  }

  return true;
};

module.exports = {
  checkRequirements: checkRequirements
};