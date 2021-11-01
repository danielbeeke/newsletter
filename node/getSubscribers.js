const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * Returns the list of subscribers from a google spreadsheet.ss
 * @returns {Promise<*[]>}
 */
async function getSubscribers (settings) {
  let documentName = process.argv[2];
  const analyticsDocument = new GoogleSpreadsheet('1sjkBLR8KiSHrGJuqRxPvTmRY9RS2r6ExiKnDpK38RB8');
  await analyticsDocument.useServiceAccountAuth(settings);
  await analyticsDocument.loadInfo();
  const sheet = analyticsDocument.sheetsById[settings.sheetId];
  // await sheet.loadCells();
  const rows = await sheet.getRows();
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return {
    rows: rows.filter(row => {
      if (row.Email && row.Email !== '' && !emailRegexp.test(row.Email.toString().trim())) {
        console.log('Invalid email: ' + row.Email);
      }
      return row.Email && row.Email !== '' && emailRegexp.test(row.Email.toString().trim()) && row[documentName] === ''
    }),
    sheet: sheet
  };
}

module.exports ={
  getSubscribers: getSubscribers
};