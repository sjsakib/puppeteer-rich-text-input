const puppeteer = require('puppeteer');

// from extension
const css = {
  frameNestLevel: 2,
  hasCrossOriginIframe: true,
  navigation: false,
  patterns: [
    {
      pattern: 'a#js-link-box-es > strong',
      parent: 'a#js-link-box-es',
      grandParent: 'div.lang2',
    },
  ],
  length: 1,
  roots: [
    {
      accessPoint: 'contentDocument',
      selector: '.result-iframe',
    },
    {
      accessPoint: 'contentDocument',
      selector: 'iframe',
    },
  ],

  selector:
    'a#js-link-box-es > strong, a#js-link-box-de > strong, a#js-link-box-bn > strong, a#js-link-box-en > strong, a#js-link-box-zh > strong, a#js-link-box-ja > strong, a#js-link-box-ru > strong, a#js-link-box-it > strong, a#js-link-box-pt > strong, a#js-link-box-fr > strong',
};

async function extractFromIframe() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
  const page = await browser.newPage();
  await page.goto('https://codepen.io/sjsakib/pen/qBaxOWg');

  let frame = page.mainFrame();

  for (const root of css.roots) {
    const frameElHandle = await frame.$(root.selector); // let's assume there is no shadow root
    frame = await frameElHandle.contentFrame();
  }
  const contents = await frame.$$eval(css.selector, elements =>
    elements.map(el => el.textContent)
  );

  console.log(contents);
}

extractFromIframe();
