import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(120000); n

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'server started') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should display card type and validity', async () => {
    await page.goto(baseUrl);
    await page.type('#card-number', '4111111111111111');
    const cardType = await page.$eval('#card-type', el => el.textContent);
    expect(cardType).toBe('visa (Valid)');
  });
});