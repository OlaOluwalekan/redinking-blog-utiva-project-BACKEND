const nodemailer = require('nodemailer')

const sendEmail = (subject, temp, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
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
}

module.exports = sendEmail
