const puppeteer = require('puppeteer');
const tool = require('./tool.js');
const path = require("path");
const fs = require('fs');

const website = 'https://www.iyingdi.cn/web/tools/hearthstone/decks/filter';
const delay = 2000;

const date = tool.moment();

let scrape = async () => {

  const browser = await puppeteer.launch({
    headless: false,
    timeout: delay
  });

  let page = await browser.newPage();

  page.setViewport({ width: 1280, height: 1040 })

  try {

    let str = '';
    let target = '';
    let set = [];
    let ind = 1;

    await page.goto(website);
    tool.emptyFolder(`./screenShot/yd/${date}`);

    for (let i = 1; i < 11; i++) {

      await page.waitFor(delay);

      str = `#hearthstone-deck-wrapper > div.filter.search-deck > ul.deck-items.clearfix > li:nth-child(${i}) > a > img`;

      target = await page.evaluate(str => {
        return str;
      }, str);

      if (!target) {
        await page.screenshot({ path: `./screenShot/yd/err-${moment}.png`, type: 'png' });
      }

      await page.click(target);
      await page.waitFor(delay);

      let data = await page.evaluate(() => {

        let name = document.querySelector('ul.info li.name');
        let code = document.querySelector('ul.info li.code');

        return {
          name: name.innerText,
          code: code.innerText
        }

      });

      tool.mkdirFolder(`./screenShot/yd/${date}`);

      set.push(data);

      let sspath = `./screenShot/yd/${date}/${data.name}.png`;

      if (fs.existsSync(sspath)) {
        await page.screenshot({ path: `./screenShot/yd/${date}/${data.name + ind}.png`, type: 'png' });
        ind++;
      } else {
        await page.screenshot({ path: `./screenShot/yd/${date}/${data.name}.png`, type: 'png' });
      }

      await page.goto(website);

    }
    tool.mkdirFile(`./screenShot/yd/${date}`, set);
    browser.close();

  } catch (err) {
    console.log('err:', err);
    browser.close();
  }
  console.log("scrape finished");


};

scrape();


