import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home.js';
import MyPage from './Pages/MyPage.js';
import Detail from './Pages/Detail.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';
import Test from './Pages/Test.js';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/mypage' element={<MyPage />}></Route>
          <Route path="/detail/:soolId" element={<Detail />}></Route>
          <Route path="/test/*" element={<Test />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
