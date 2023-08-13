const nodemailer = require('nodemailer')

const sendEmail = (subject, temp, email) => {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   secure: true,
  //   auth: {
  //     user: 'app4bells@gmail.com',
  //     pass: 'dktujwvuwvpfldrq',
  //   },
  // })

  const transporter = nodemailer.createTransport({
    host: 'mail.labells.online',
    port: 465,
    auth: {
      user: 'admin@labells.online',
      pass: '@Jesus200593',
    },
  })

  const emailOptions = {
    from: 'admin@labells.online',
    to: email,
    subject: subject,
    html: temp,
  }

  console.log('about to send email')
  transporter.sendMail(emailOptions, (err, info) => {
    console.log('started sending')
    if (err) {
      console.log(err)
    } else {
      // console.log(info)
      console.log(`email sent successfully`)
    }
  })
  console.log('email should have been sent by now')
}

module.exports = sendEmail
