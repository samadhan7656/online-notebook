import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './components/notes/NoteState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <div className='container my-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  )
}

export default App
