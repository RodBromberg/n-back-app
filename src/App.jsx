import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import { GameBoard } from './components/GameBoard/GameBoard';


function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  // function Test() {

  //   const [arr,setArr] = useState([])

  //   console.log({ arr })

  //   const fetchData = async () => {
  //      fetch('http://localhost:8000/api/users')
  //      .then(res=>res.json())
  //      .then(res=>setArr(res))
  //   }

    
  //   useEffect(()=>{
  //     fetchData()
  //   },[])
  // }

  return (
    <>
    {/* <SignupForm /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/gameboard" element={<GameBoard />} />
      </Routes>
      {/* <Test /> */}
    </>
  );
}

export default App;
