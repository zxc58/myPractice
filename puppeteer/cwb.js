// 中央氣象局 地震
const { wait } = require('../helper/functions')
//
const fsPromises = require('fs').promises
const path = require('path')
const puppeteer = require('puppeteer');
//
(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  page.setViewport({ width: 1920, height: 900 })
  try {
    await page.goto('https://www.cwb.gov.tw/V8/C/E/index.html')
    await wait(1)
    const rawDataArray = await page.$$('tbody > tr')
    const informationArray = await Promise.all(rawDataArray.map(e => e.evaluate(
      f => {
        const text = f.innerText.replaceAll('\n', '').replaceAll('\t', '')
        const time = text.substring(text.indexOf('級') + 1, text.indexOf('點我看更多'))
        const location = text.substring(text.indexOf('地點') + 2, text.indexOf('深度'))
        const depth = text.substring(text.indexOf('深度') + 2, text.indexOf('地震規模'))
        const scale = text.substring(text.indexOf('地震規模') + 4)
        return `Time:2022 ${time}\nLocation:${location}\nDepth:${depth}\nScale:${scale}\n`
      }
    )))
    const informationString = informationArray.join('\n')
    await fsPromises.writeFile(path.resolve(__dirname, '../', 'myFile', 'earthquakeData.txt'), informationString)
    console.log('done')
  } catch (err) {
    console.log(err)
  } finally {
    await browser.close()
  }
})()
