require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const { transporter, myEmailAddress } = require('./practice/transporter')
const app = express()
const { engine } = require('express-handlebars')
//
const port = process.env.PORT || 3000
//
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
//
app.get('/', (req, res) => {
  res.render('download')
})
app.post('/download', async (req, res) => {
  const { fileName, content } = req.body
  const p = path.resolve(__dirname, 'myFile', fileName + '.txt')
  // console.log(p)
  await fs.promises.writeFile(p, content)
  await transporter.sendMail({
    from: myEmailAddress,
    to: myEmailAddress,
    subject: fileName,
    html: content
  })
  res.download(p)
})
//
app.listen(port, () => console.log('server start'))
