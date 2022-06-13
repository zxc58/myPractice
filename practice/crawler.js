const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const fsPromise = require('fs').promises
//
const url = 'https://hk.digimoncard.com/cardlist/?search=true&category=507012#page-4'
const textarray = []
const totalString = ''
//
request(url, async (error, response, body) => {
  if (error) { return 0 }
  // let z = await fsPromise.writeFile('01.html', body)
  // console.log('done')
  const $ = cheerio.load(body)
  const nos = $('.card_img')
  let j = 1
  for (let i = 0; i < nos.length; i += 2) {
    const b = nos.eq(i).find('img').attr('src')
    // textarray.push(b)
    if (!(/_P/.test(b))) {
      //  totalString += b + '\n'
      const c = b.substring(3, b.length)
      // console.log(c)
      request('https://hk.digimoncard.com/' + c)
    }
  }
  // console.log(totalString)
  // await fsPromise.writeFile('02.txt', totalString)
})
