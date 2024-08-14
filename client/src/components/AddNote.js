import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from './notes/NoteContext'

const AddNote = () => {
  const { addNote } = useContext(NoteContext)
  const [note, setNote] = useState({ title: '', content: '', tags: '' })
  const handleChange = (e) => {
    setNote((pre) => {
      return { ...pre, [e.target.name]: e.target.value }
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (!note.title || !note.content) return
    addNote(note)
    setNote({ title: '', content: '', tags: '' })
  }

  return (
    <form className=''>
      <div className='form-outline mb-4'>
        <label className='form-label' htmlFor='form6Example3'>
          Title
        </label>
        <input
          type='text'
          id='form6Example3'
          name='title'
          value={note.title}
          onChange={handleChange}
          className='form-control text-white bg-dark'
          min={5}
          required
        />
      </div>

      <div className='form-outline mb-4'>
        <label className='form-label' htmlFor='form6Example7'>
          Content
        </label>
        <textarea
          className='form-control bg-dark text-light'
          id='form6Example7'
          name='content'
          value={note.content}
          onChange={handleChange}
          minLength={5}
          required
          rows='4'
        ></textarea>
      </div>

      <button
        disabled={note.title.length < 5 || note.content.length < 5}
        type='submit'
        className='btn btn-primary mb-4 px-3 py-2'
        onClick={handleClick}
      >
        Add Note
      </button>
    </form>
  )
}

export default AddNote
