const fs = require('fs')
const path = require('path')
const r = path.resolve(__dirname, '../', 'myFile', '00.mkv')
const w = path.resolve(__dirname, '../', 'myFile', 'copy00.mkv')
//
let start = 0
let end = 0
start = new Date().getTime()
//
const readable = fs.createReadStream(r)
const writable = fs.createWriteStream(w)
readable.pipe(writable).on('finish', () => {
  end = new Date().getTime()
  const result = (end - start) / 1000 + 'sec'
  console.log(result)
})
// fs.copyFile(r, w, () => {})
// end = new Date().getTime()
// const result = (end - start) / 1000 + 'sec'
// console.log(result)

// 1GB file ， 複製一份到當前目錄 ，stream比較慢
