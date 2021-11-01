const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

/**
 * Creates nodemailer transporters.
 */
function createTransporters (settings) {
  let transporters = {};

  Object.keys(settings.mail).forEach(personEmail => {
    if (settings.mail[personEmail].type === 'protonmail') {
      transporters[personEmail] = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 1025,
        auth: {
          user: settings.mail[personEmail].mail,
          pass: settings.mail[personEmail].pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      transporters[personEmail].use('compile', htmlToText())
    }

    else if (settings.mail[personEmail].type === 'outlook') {
      transporters[personEmail] = nodemailer.createTransport({
        host: "smtp.office365.com",
        secure: false,
        port: 587,
        tls: {
          ciphers:'SSLv3'
        },
        auth: {
          user: settings.mail[personEmail].mail,
          pass: settings.mail[personEmail].pass
        },
      });

      transporters[personEmail].use('compile', htmlToText())
    }
  });

  return transporters;
}

module.exports = {
  createTransporters: createTransporters
};