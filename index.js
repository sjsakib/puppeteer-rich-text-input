const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');

async function writeToClipBoard(htmlString) {
  const htmlData = new Blob([htmlString], {
    type: 'text/html',
  });
  const item = new ClipboardItem({
    'text/html': htmlData,
  });
  await navigator.clipboard.write([item]);
}

async function writeRichText(url, selector, htmlString) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.bringToFront();

  const backupClipboardData = await clipboardy.read();

  await page.evaluate(writeToClipBoard, htmlString);

  const editor = await page.waitForSelector(selector);

  await editor.click();

  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.press('Backspace');

  await page.keyboard.press('V');

  await clipboardy.write(backupClipboardData);

  await page.waitForTimeout(50000);

  await browser.close();
}

writeRichText(
  'https://ckeditor.com/ckeditor-4/demo/',
  '.cke_wysiwyg_frame.cke_reset',
  `
  <div>
    <h1>Hello CKEditor!</h1>
    <p>Greetings from <a href="https://automatio.co">automatio</a>
  </div>
  `
);
