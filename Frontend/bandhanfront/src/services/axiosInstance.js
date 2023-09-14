import axios from 'axios';
import { getToken } from './LocalStorageService';


const {access_token}  = getToken()
    
const Axiosinstance = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/chat/',
    baseURL: 'https://www.manoly.life/api/chat/',
    headers:{
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        accept:'application/json'
    } 
    });


 export default Axiosinstance


 