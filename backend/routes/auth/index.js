const router = require('express').Router()
const joi = require('joi')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkToken = require('../../middlewares/checkToken')

//Route-1 Register
router.post('/register', async (req, res) => {
  //validation
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
  })

  try {
    const value = await schema.validateAsync(req.body)
  } catch (err) {
    return res.json({ message: 'invalid data' })
  }
  //check if user is present in DB
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.send({ message: 'user already exiest' })
  }

  //creating hash of password
  const hashPassword = bcrypt.hashSync(req.body.password, 10)
  try {
    user = new User({ ...req.body, password: hashPassword })
    user.save()
  } catch (err) {
    return res.status.send({ message: 'Internal server error' })
  }
  res.send({ message: 'registration succesfull' })
})

//route-2 Login
router.post('/login', async (req, res) => {
  //validation
  const schema = joi.object({
    password: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
  })

  try {
    const value = await schema.validateAsync(req.body)
  } catch (err) {
    return res.json({ message: 'invalid data' })
  }

  //if user exiest
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ message: 'User with this email not exiest' })
  }
  const isPassMatch = await bcrypt.compare(req.body.password, user.password)
  if (!isPassMatch) {
    return res.status(400).send({ message: 'invalid email/password' })
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  res.send({ token })
})

//route-3
router.post('/getuser', checkToken, async (req, res) => {
  try {
    const userData = req.userData
    const user = await User.findById(userData.id).select('-password')
    res.send(user)
  } catch (error) {
    res.send(400).send({ error: 'internal server error' })
  }
})
module.exports = router
