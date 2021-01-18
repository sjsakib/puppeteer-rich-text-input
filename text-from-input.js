const puppeteer = require('puppeteer');

const selector = '#mail';

async function extractFromInput() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.goto('https://temp-mail.org/en/');

  const input = await page.waitForSelector(selector);

  const inputValue = await page.evaluate(x => x.value, input);

  console.log(inputValue);
}

extractFromInput();
