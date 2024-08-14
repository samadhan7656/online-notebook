import React, { useState, useEffect, useRef } from 'react'
import { useContext } from 'react'
import Note from './Note'
import NoteContext from './notes/NoteContext'
const Notes = () => {
  const { notes, loadNotes, updateNotes } = useContext(NoteContext)
  const [updatedNote, setUpdatedNote] = useState({ title: '', content: '', tags: '' })
  let modalRef = useRef('')

  useEffect(() => {
    loadNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalClick = (currentNote) => {
    modalRef.current.click()
    setUpdatedNote(currentNote)
  }

  const handleModelChange = (e) => {
    setUpdatedNote((pre) => {
      return { ...pre, [e.target.name]: e.target.value }
    })
  }

  const handleUpdate = () => {
    if (!updatedNote.title || !updatedNote.content) return
    updateNotes({ ...updatedNote, id: updatedNote._id })
    modalRef.current.click()
  }
  return (
    <>
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        ref={modalRef}
      >
        Launch demo modal
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content bg-dark text-white'>
            <div className='modal-header'>
              <button
                type='button'
                className='btn-close btn-secondary'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form className=''>
                <div className='form-outline mb-4'>
                  <label className='form-label' htmlFor='form6Example3'>
                    Title
                  </label>
                  <input
                    type='text'
                    id='form6Example3'
                    name='title'
                    value={updatedNote.title}
                    onChange={handleModelChange}
                    className='form-control text-white bg-dark'
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
                    value={updatedNote.content}
                    onChange={handleModelChange}
                    rows='4'
                  ></textarea>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                disabled={updatedNote.title.length < 5 || updatedNote.content.length < 5}
                onClick={handleUpdate}
                className='btn btn-primary'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h2 className='my-3'>Your Notes</h2>
        {notes.map((note) => {
          return <Note handleModalClick={handleModalClick} note={note} key={note._id} />
        })}
      </div>
    </>
  )
}

export default Notes
