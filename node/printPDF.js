const puppeteer = require('puppeteer');
const merge = require('easy-pdf-merge');
const fs = require('fs');

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1160,
    height: 1000
  });

  await page.emulateMedia('print');

  await page.goto('http://localhost:4000/' + process.argv[2], {waitUntil: 'networkidle0'});

  const pageHeights = await page.$$eval('.page', pages => {
    return pages.map(page => page.clientHeight);
  });

  // Add the header to the first page.
  pageHeights[0] += 250;
  let sourceFiles = [];

  for (const [index, pageHeight] of  pageHeights.entries()) {
    let sourceFile = 'source/' + process.argv[2] + '-' + index + '.pdf';
    sourceFiles.push(sourceFile);

    await page.pdf({
      path: sourceFile,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      },
      pageRanges: (index + 1).toString(),
      scale: 1,
      width: 1160,
      height: pageHeight,
      printBackground: true,
    });
  }

  await browser.close();

  merge(sourceFiles, 'source/' + process.argv[2] + '.pdf',function(err) {

    sourceFiles.forEach(sourceFile => {
      fs.unlinkSync(sourceFile);
    });

    return Promise.resolve();
  });
}

module.exports = {
    printPDF: printPDF
};