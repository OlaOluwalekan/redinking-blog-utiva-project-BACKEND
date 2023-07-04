const start = async (app, port) => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

module.exports = start
