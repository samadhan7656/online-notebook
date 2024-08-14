const mongoose = require('mongoose')
require('dotenv/config')

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log('DB is connected')
    )
  } catch (error) {
    console.log('could not connect')
  }
}

module.exports = connectDB
