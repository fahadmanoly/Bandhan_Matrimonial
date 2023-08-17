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
import SendOTP from './components/pages/profile/SendOTP';
import VerifyOTP from './components/pages/profile/VerifyOTP';
import UserPreferences from './components/pages/profile/UserPreferences';
import UserHome from './components/pages/profile/UserHome';
import UploadImage from './components/parts/UploadImage';
import SearchResults from './components/pages/matches/SearchResults';
import MatchDetails from './components/pages/matches/MatchDetails';
import ConnectionRequest from './components/pages/matches/ConnectionRequest';
import Payments from './components/pages/matches/Payments';


function App() {
  const {access_token} = useSelector(state => state.auth)
  const {is_phone_verified,is_preferences} = useSelector(state => state.user)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!access_token ? <Home /> : <Navigate to = "userhome" />} />
          {/* <Route path='contact' element={<Contact />} /> */}
          <Route path='login' element={!access_token ? <LoginReg /> : <Navigate to="/userinfo" />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='api/user/resetpassword/:id/:token' element={<ResetPassword />} />
          <Route path='userinfo' element={is_phone_verified ===true ? (is_preferences===true?<Navigate to="/userhome" />:<Navigate to="/userpreference" />):<UserInfo/>} />
          <Route path='sendotp' element={access_token ? <SendOTP /> : <Navigate to="/login" />} />
          <Route path='verifyotp' element={access_token ? <VerifyOTP /> : <Navigate to="/login" />} />
          <Route path='userpreference' element={<UserPreferences />} />
          <Route path='userhome' element={<UserHome />} />
          <Route path='profilepicture' element={ access_token ? <UploadImage /> : <Navigate to="/login" />} />
          <Route path="/search-results/:age_min/:age_max/:religion/:gender" element={<SearchResults />} />
          <Route path="/match-details/:match_id" element={<MatchDetails />} />
          <Route path='connectionrequest' element={ access_token ? <ConnectionRequest /> : <Navigate to="/login" />} />

        </Route> 
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='payments' element={ access_token ? <Payments /> : <Navigate to="/login" />} />



        <Route path='*' element={<h1>Error:404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

