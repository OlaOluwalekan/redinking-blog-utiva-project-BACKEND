const notFound = (req, res) => res.send(`route ${req.url} does not exist`)

module.exports = notFound
