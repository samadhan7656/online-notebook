const connectDB = require('./db')
const express = require('express')
require('dotenv/config')
var cors = require('cors')
const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')

connectDB()
const app = express()
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', notesRouter)

app.get('/', async (req, res) => {
  res.send('Home')
})

//connect to database
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
