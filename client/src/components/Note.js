import React from 'react'
import { useContext } from 'react'
import NoteContext from './notes/NoteContext'
const Note = ({ note, handleModalClick }) => {
  const { deleteNote } = useContext(NoteContext)
  return (
    <>
      <div className='col-md-6 col-lg-4'>
        <div className='card text-white bg-dark mb-3 border-secondary'>
          <div className='card-body'>
            <div className='tite d-flex justify-content-between'>
              <h5 className='card-title d'>{note.title}</h5>
              <div className='icon'>
                <i
                  className='fa-solid fa-trash-can mx-3 cursor-pointer'
                  onClick={() => deleteNote(note._id)}></i>
                <i
                  className='fa-solid fa-pen-to-square cursor-pointer'
                  onClick={() => handleModalClick(note)}></i>
              </div>
            </div>
            <p className='card-text'>{note.content}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Note
