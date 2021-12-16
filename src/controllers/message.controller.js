const { sendMail } = require('../services/mail.service')

const sendMessage = (req, res) => {
   const { name, email, message } = req.body
   const content = `
      <h2>Name: ${name}</h2>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
   `

   sendMail({
      to: email, // list of receivers
      subject: "Message Testing", // Subject line
      text: "I'm working on apiX messages", // plain text body
      html: content, // html body
   }).then(info => {
      return res.json({ message: "Message Send.", info })
   }).catch(error => res.status(500).json({ error }))

}

module.exports = {
   sendMessage
}