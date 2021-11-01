let settings = require('./settings.json');

const { createTransporters } = require('./node/createTransporters.js');
const { checkRequirements } = require('./node/checkRequirements.js');
const { getNewsletter } = require('./node/getNewsletter.js');

async function sendTestMail () {
  if (!checkRequirements()) return;
  const transporters = createTransporters(settings);
  let newsletter = getNewsletter();
  let subscriber = {
    Email: process.argv[3],
    Voornaam: 'Test persoon'
  };

  let emailHtml = newsletter.email.content;

  let transporter = transporters['daniel'];

  try {
    await transporter.sendMail({
      from: `"🌿 Daniel en Wilma" <${settings.mail['daniel'].mail}>`,
      to: subscriber.Email.trim(),
      subject: newsletter.email.subject,
      html: emailHtml,
    });
  }
  catch (e) {
    console.log(e)
  }
}

sendTestMail();
