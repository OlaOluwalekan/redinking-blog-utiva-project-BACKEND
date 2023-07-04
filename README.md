# <span style="color:red">Red</span><span style="color:blue">inking</span> Blog Utiva Project | BACKEND

This is the backend of the capstone blog project at Utiva for Binance Charity Tech Scholarship. The project consists of building a blog website using the **MERN** stack. This documents contains the details of how the backend is built making use of NodeJS, Express, mongoDB and other packages.

## Table of Contents

1. [Intro](#redinking-blog-utiva-project--backend)
1. [Initialization](#initialization)
1. [Full List of Dependencies Used](#full-list-of-dependencies-used)
1. [Connecting to Database](#connecting-to-database)
1. [Handling Errors](#handling-errors)

## Initialization

The project begins by first initializing the folder with package.json file using `npm init -y`. After this, the dependencies/packages needed for the app are installed (see [full list of dependencies](#full-list-of-dependencies-used)) using the npm command:

```js
// terminal
npm install <package-name>
```

## Express Server

Next is creating an instance of express app and setting up the express server on a port number

```js
// index.js - entry point
const express = require('express')
const app = express()
const port = process.env.PORT || 9000 // I like to use 9000 because of my postman setup
app.listen(port, () => {
  console.log(`server is listening on port ${port}...`)
})
```

## Connecting to Database

The database used is <span style="color:green">**mongoDB**</span> - a popular NoSQL database that forms the M of the **MERN** stack. First generate a connection string from <span style="color:green">**mongoDB**</span> atlas and store that in `.env` file

```env
MONGO_URI=your_connection_string
```

Then use the connection string to connect app to <span style="color:green">**mongoDB**</span> atlas

```js
// connectDB.js
const mongoose = require('mongoose')

const connectDB = (uri) => {
  return mongoose.connect(uri)
}
```

Then create a start function to connect the app to database and also start express server

```js
// index.js
const connectDB = require('./connectDB')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
```

## Handling Errors

Errors are handled using `express-async-errors` - a popular npm package freely available in the npm registry

## Full List of Dependencies Used

| Syntax  | Description                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| express | nodejs framework for create a server for you app                                                             |
| nodemon | installed only as a dev dependency, it help to watch our code and updates the server anytime we save changes |
