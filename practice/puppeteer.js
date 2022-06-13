const puppeteer = require('puppeteer')
// 引入cheerio
const cheerio = require('cheerio');
(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('https://ithelp.ithome.com.tw/ironman')

  // 先等待網頁載入到底下的section的html標籤，不然有時候執行太快抓不到網頁
  await page.waitForSelector('section')

  // 把網頁的body抓出來
  const body = await page.content()

  // 接著我們把他丟給cheerio去處理
  const $ = await cheerio.load(body)

  // await browser.close()
})()
