import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './Header';
import Home from './Pages/Home'
import MyPage from './Pages/MyPage'
import Detail from './Pages/Detail';

import dummySool from "./static/dummyData";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/mypage' element={<MyPage />}></Route>
        <Route path="/detail/:id" element={<Detail sool={dummySool} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
