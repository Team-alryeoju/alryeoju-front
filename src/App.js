import { Routes, Route } from 'react-router-dom';

import './App.css';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import Home from './Pages/Home'
import MyPage from './Pages/MyPage'
import Detail from './Pages/Detail';
import Login from './Pages/Login'

import dummySool from "./static/dummyData";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/mypage' element={<MyPage />}></Route>
          <Route path="/detail/:id" element={<Detail sool={dummySool} />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
