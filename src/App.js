import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './Header';
import Home from './Pages/Home'
import MyPage from './Pages/MyPage'
import Detail from './Pages/Detail';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/mypage' element={<MyPage />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
