const fs = require('fs');
const newsletterFilename = process.argv[2];

let getNewsletter = () => {
  let content = fs.readFileSync('./exports/' + newsletterFilename + '.html', 'utf8');
  let sourceFile = fs.readFileSync('./src/' + newsletterFilename + '/' + newsletterFilename + '.mjml', 'utf8');

  const subject = sourceFile.split('<mj-title>')[1].split('</mj-title>')[0]

  return {
    email: {
      content: content,
      subject: subject
    }
  }
};

module.exports = {
  getNewsletter: getNewsletter,
};

