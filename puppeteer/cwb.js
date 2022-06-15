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
        const time = /\d{2}\/\d{2}\s\d{2}:\d{2}/.exec(text)[0]
        const location = /地點.+\)/.exec(text)[0].replace('地點', '地點:')
        // text.substring(text.indexOf('地點') + 2, text.indexOf('深度'))
        const depth = /深度.+km/.exec(text)[0].replace('深度', '深度:')
        // text.substring(text.indexOf('深度') + 2, text.indexOf('地震規模'))
        const scale = /地震規模.+/.exec(text)[0].replace('地震規模', '地震規模:')
        // text.substring(text.indexOf('地震規模') + 4)
        return `時間:${time}\n${location}\n${depth}\n${scale}\n`
      }
    )))
    const informationString = informationArray.join('\n')
    await fsPromises.writeFile(path.resolve(__dirname, '../', 'myFile', '地震資料.txt'), informationString)
    console.log('done')
  } catch (err) {
    console.log(err)
  } finally {
    await browser.close()
  }
})()
