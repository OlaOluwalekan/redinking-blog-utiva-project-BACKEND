const nodemailer = require('nodemailer')

const sendEmail = (subject, temp, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'app4bells@gmail.com',
      pass: 'dktujwvuwvpfldrq',
    },
  })

  const emailOptions = {
    from: 'app4bells@gmail.com',
    to: email,
    subject: subject,
    html: temp,
  }

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(info)
      console.log(`email sent successfully`)
    }
  })
}

module.exports = sendEmail
