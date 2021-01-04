const puppeteer = require('puppeteer');

// from extension
const selector1 =
  'div.sm-margin-b-10 > select#BodyContent_BodyListing_ctl01_TypeSelect';
const selector2 =
  'div.form-select-container > select#BodyContent_BodyListing_CategorySelector1__ddlCategoryLvl1';

async function selectDropDown() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.australianmade.com.au/products/');

  await page.select(selector1, 'site');

  await page.select(selector2, "11")
}

selectDropDown();
