const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

const pdfPath = path.join(__dirname, '..', 'public', 'images', 'catalogos', 'PUROLIVING 2da PARTE 2026.pdf');

const pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));

pdfParser.on('pdfParser_dataReady', pdfData => {
  console.log('=== PDF INFO ===');
  console.log('Pages:', pdfData.Pages.length);
  
  // Extract all text
  const allText = [];
  pdfData.Pages.forEach((page, pageIndex) => {
    console.log(`\n--- Página ${pageIndex + 1} ---`);
    const pageTexts = [];
    page.Texts.forEach(textItem => {
      const decoded = decodeURIComponent(textItem.R.map(r => r.T).join(''));
      pageTexts.push(decoded);
    });
    const pageContent = pageTexts.join(' | ');
    console.log(pageContent);
    allText.push(pageContent);
  });
});

pdfParser.loadPDF(pdfPath);
