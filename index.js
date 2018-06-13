const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const website = 'https://www.iyingdi.cn/web/article/hearthstone?seed=2';  //test page

let scrape = async () => {

  const browser = await puppeteer.launch({
    headless:false,
    timeout:15*1000
  });

  const page = await browser.newPage();

  //monitoring website
  page.on('requestfailed', request => {
    console.log(request.url() + '\n' + request.failure().errorText);
    browser.close();
  });

  await page.goto(website);
  
    
};

scrape();


