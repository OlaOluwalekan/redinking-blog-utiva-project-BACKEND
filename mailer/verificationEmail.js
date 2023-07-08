const verificationTemplate = require('./templates/verificationTemplate')
const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({ email, code }) => {
  sendEmail('confirm your email address', verificationTemplate(code), email)
}

module.exports = { sendVerificationEmail }
