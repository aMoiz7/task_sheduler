
import './App.css'
import { BrowserRouter as Router , Route ,Routes  } from 'react-router-dom'
import SignUp from './pages/signup'
import SignIn from './pages/signIn';
import Tasks from './pages/task';
import Usertask from './pages/userTask';
function App() {

  return (
    <>

    <Router>
      <Routes> 
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/task' element={<Tasks/>} />
        <Route path='/usertask' element={<Usertask/>} />


        </Routes>

    </Router>
   
    </>
  )
}

export default App
