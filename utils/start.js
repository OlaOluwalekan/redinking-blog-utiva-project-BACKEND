const connectDB = require('./connectDB')

const start = async (app, port, url) => {
  try {
    await connectDB(url)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

module.exports = start
