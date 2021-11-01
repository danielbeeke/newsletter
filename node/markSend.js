async function markSend (sheet, subscriber) {
  let columnName = process.argv[2];
  subscriber[columnName] = 'x';
  console.log('Sent to: ' + subscriber.Email);
  await subscriber.save();
}

module.exports = {
  markSend: markSend
};