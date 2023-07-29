//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import LoginReg from './components/pages/auth/LoginReg';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import UserProfile from './components/pages/profile/UserProfile';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import UserInfo from './components/pages/profile/UserInfo';


function App() {
  const {access_token} = useSelector(state => state.auth)
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={!access_token ? <LoginReg /> : <Navigate to="/userinfo" />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='api/user/resetpassword/:id/:token' element={<ResetPassword />} />
          <Route path='userinfo' element={access_token ? <UserInfo /> : <Navigate to="/login" />} />
        </Route> 
        <Route path='/userprofile' element={access_token ? <UserProfile /> : <Navigate to="/login" />} />


        <Route path='*' element={<h1>Error:404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

