const router = require('express').Router()
const checkToken = require('../../middlewares/checkToken')
const Notes = require('../../models/Notes')
const joi = require('joi')

//router-1 get all notes
router.get('/getnotes', checkToken, async (req, res) => {
  try {
    const userData = req.userData
    const user = await Notes.find({ user: userData.id })
    res.send(user)
  } catch (error) {
    res.send({ error: 'internal server error' })
  }
})

//route- 2: addNotes
router.post('/addnotes', checkToken, async (req, res) => {
  try {
    const userData = req.userData
    const schema = joi.object({
      title: joi.string().min(3).required(),
      content: joi.string().required().min(3),
      // tags: joi.string(),
    })

    try {
      const value = await schema.validateAsync(req.body)
    } catch (err) {
      console.log(err)
      return res.json({ message: 'invalid data' })
    }

    try {
      const note = new Notes({ ...req.body, user: userData.id })
      var savednote = await note.save()
    } catch (error) {
      console.log(error)
    }
    res.send(savednote)
  } catch (err) {
    console.log(err)
    res.send('internal server error')
  }
})

//route- 3: updateNote
router.put('/updatenotes/:id', checkToken, async (req, res) => {
  const { title, content, tags } = req.body
  const newNote = {}
  if (title) newNote.title = title
  if (content) newNote.content = content
  if (tags) newNote.tags = tags

  //check if user is same who is updating
  let note = await Notes.findById(req.params.id)
  if (!note) {
    return res.status(404).send('Not allowed')
  }
  if (note.user.toString() !== req.userData.id.toString()) {
    return res.status(404).send('Not allowed')
  }

  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
  res.send(note)
})

//route- 4: deleteNote
router.delete('/deletenotes/:id', checkToken, async (req, res) => {
  //check if id is present
  if (!req.params.id) return res.status(404).send('Not found')

  let note = await Notes.findById(req.params.id)
  if (!note) {
    return res.status(404).send('Not found')
  }
  if (note.user.toString() !== req.userData.id.toString()) {
    return res.status(404).send('Not allowed')
  }
  try {
    note = await Notes.findByIdAndDelete(req.params.id)
  } catch (err) {
    console.log(err)
  }
  res.send({ message: 'Notes deleted' })
})

module.exports = router
