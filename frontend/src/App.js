
import './App.css';
import SignIn from './component/signin/Signin'
import SignUp from './component/signup/Signup'
import User from './component/usertable/User'
import {Route, Routes} from 'react-router-dom'


function App() {
  return (
    <div>
     <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/user' element={<User/>}/>
      </Routes>
    </div>
  );
}

export default App;
