let settings = require('./settings.json');

const { createTransporters } = require('./node/createTransporters.js');
const { getSubscribers } = require('./node/getSubscribers.js');
const { checkRequirements } = require('./node/checkRequirements.js');
const { getNewsletter } = require('./node/getNewsletter.js');
const { markSend } = require('./node/markSend.js');
const Confirm = require('prompt-confirm');

async function sendMail () {
  if (!checkRequirements()) return;
  const transporters = createTransporters(settings);
  let newsletter = getNewsletter();
  let sheetData = await getSubscribers(settings);
  let subscribers = sheetData.rows;

  if (process.argv[3]) {
    console.log(subscribers.map(subscriber => subscriber.Email));
    console.log(subscribers.length);
    return;
  }

  for (let subscriber of subscribers) {
    const prompt = new Confirm('Send to ' + subscriber.Email.trim());
    let personalizedEmail = newsletter.email.content

    let transporterName = subscriber.Wilma === 'x' ? 'wilma' : (subscriber.Daniel ==='x' ? 'daniel' : null);

    if(!transporterName) {
      throw `Subscriber ${subscriber.Aanhef} is missing a person to send it from`;
    }

    let transporter = transporters[transporterName];

    let answer = await prompt.run();

    if (answer) {
      try {
        await transporter.sendMail({
          from: `"🌿 Daniel en Wilma" <${settings.mail[transporterName].mail}>`,
          to: subscriber.Email.trim(),
          subject: newsletter.email.subject,
          text: personalizedEmail,
          html: personalizedEmail
        });

        await markSend(sheetData.sheet, subscriber);
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}

sendMail();