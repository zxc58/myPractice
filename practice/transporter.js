require('dotenv').config()
const nodemailer = require('nodemailer')
const myEmailAddress = `${process.env.GOOGLE_ACCOUNT}@gmail.com`
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: myEmailAddress,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
})
module.exports = { transporter, myEmailAddress }

// 使用方法 example
// transporter.sendMail({
//   from: myEmailAddress,
//   to: myEmailAddress,
//   subject: '輸入信件主旨',//信件主旨
//   html: '你好<br/><button>reply</button>',//信件內容
//   text:'111111111111'//用非瀏覽器收發用
// }).then(info => {
//   console.log({ info })
// }).catch(console.error)
