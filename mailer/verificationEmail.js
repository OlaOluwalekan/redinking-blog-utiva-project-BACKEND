const nodemailer = require('nodemailer')

const sendVerificationEmail = async ({ email, code }) => {
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
    subject: `Confirm Your Email`,
    html: `<h1>${code}</h1>`,
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

module.exports = { sendVerificationEmail }
