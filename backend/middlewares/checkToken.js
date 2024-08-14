const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  const token = req.header('authToken')
  if (!token) {
    return res.status(401).send({ message: 'token is not found/login first' })
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = data
  } catch (error) {
    return res.status(401).send({ message: 'token is not found/invalid token' })
  }
  next()
}

module.exports = checkToken
