//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import LoginReg from './components/pages/auth/LoginReg';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import UserProfile from './components/pages/profile/UserProfile';


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<LoginReg />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='reset' element={<ResetPassword />} />
        </Route> 
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='*' element={<h1>Error:404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

