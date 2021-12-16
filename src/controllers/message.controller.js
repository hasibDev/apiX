const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   secure: false, // upgrade later with STARTTLS
   auth: {
      user: "374270288d3980",
      pass: "7e3cd3e0b155d9",
   },
})

const sendMessage = (req, res) => {
   const { name, email, message } = req.body
   const content = `
      <h2>Name: ${name}</h2>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
   `

   // verify connection configuration
   // transporter.verify(function (error, success) {
   //    if (error) {
   //       console.log(error)
   //    } else {
   //       console.log("Server is ready to take our messages")
   //    }
   // })

   const sendMail = async () => {
      try {
         // send mail with defined transport object
         let info = await transporter.sendMail({
            from: '"ApiX Admin 👻" <admin@apix.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: content, // html body
         })

         console.log("Message sent: %s", info.messageId)

         return res.json({ message: "Message Send." })

      } catch (error) {
         return res.status(500).json({ error })
      }
   }

   sendMail()

}

module.exports = {
   sendMessage
}