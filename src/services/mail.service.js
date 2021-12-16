const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
   host: process.env.MAIL_HOST,
   port: process.env.MAIL_PORT,
   secure: false, // upgrade later with STARTTLS
   auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
   },
})

//  verify connection configuration
transporter.verify(function (error, success) {
   if (error) {
      console.log(error)
   } else {
      console.log("Server is ready to send your mail")
   }
})

const sendMail = async function ({ to, subject, text, html }) {
   const from = `"${process.env.MAIL_FROM_NAME} 👻" <${process.env.MAIL_FROM_ADDRESS}>`
   try {
      const info = await transporter.sendMail({ from, to, subject, text, html })
      return Promise.resolve(info)
   } catch (error) {
      return Promise.reject({ error })
   }
}

module.exports = {
   transporter, sendMail
}