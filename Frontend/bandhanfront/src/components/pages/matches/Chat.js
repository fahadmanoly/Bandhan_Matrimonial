import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, TextField, Typography, Grid, Button, Box} from '@mui/material';
import { getToken } from '../../../services/LocalStorageService';
import Axiosinstance from '../../../services/axiosInstance';
import { MDBTypography, MDBCardHeader, MDBCol } from "mdb-react-ui-kit";
import InputEmoji from "react-input-emoji";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectUser,setUserInfo } from '../../../features/userSlice';
import '../../styles/Chat.css'


const Chat = () => {
  const { user_Id, match_Id } = useParams();
  const chatter = useSelector(selectUser);
  const[messages,setMessages] = useState([]);
  const [roomName , setRoomName] = useState('');
  const [socketOpen, setSocketOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const fetchMessages = async (room_name) => {
    const response = await Axiosinstance.get(`message/${user_Id}/${match_Id}/?room_name=${room_name}`);
    if(response.status === 200){
        setMessages(response.data.messages);
      }
   };


    useEffect(() => {
      const room_name = `${Math.min(user_Id, match_Id)}_${Math.max(user_Id, match_Id)}`;
      //const new_socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`);
      const new_socket = new WebSocket(`wss://manoly.life/ws/chat/${room_name}/`);
      setRoomName(room_name);
      
      new_socket.onopen = () => {
          setSocketOpen(true);
          fetchMessages(room_name);
      }

      new_socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
      };

      new_socket.onclose = () => {
          setSocketOpen(false);
      }

      setSocket(new_socket);
      return () => new_socket.close();
    }, [user_Id, match_Id]);


    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, [messages]);


    const handleInputChange = (value) => {
      setInputMessage(value);
    };


    const handleSubmitMessage = () => {
      const messageObject = {
          sender_id: user_Id,
          receiver_id: match_Id,
          message: inputMessage,
          room_name: roomName,
      };

      socket.send(JSON.stringify(messageObject));
      setInputMessage('');
    };


  return (
    <> 
      {socketOpen && (
        <MDBCol md="6" lg="7" xl="8">

                <MDBTypography tag="div" listUnStyled ref={messagesEndRef} style={{ height: "450px", backgroundColor:'#ba68c8', overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {messages.map((message, index) => (
                    <div key={index} className={chatter.id === message?.sender?.id ? "sender" : "receiver"}>
                      <div style={{ whiteSpace: "pre-wrap" }}>
                        <p className="small p-2 me-3 mb-3 text-white rounded-3">
                          {message?.message}
                        </p>
                        <div className="d-flex flex-row justify-content-end ms-auto">
                          <p className="smaller-text mb-1 me-3 text-muted">{moment.utc(message?.created_at).local().format('hh:mm A')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </MDBTypography>

                  <div style={{width:'auto', backgroundColor:'#e1bee7'}}>
                    <div className="col-9">
                        <InputEmoji value={inputMessage} onChange={handleInputChange} cleanOnEnter
                        style={{ maxHeight: '50px', overflowY: 'auto', wordWrap: 'break-word' }} className="input-emoji"/>
                    </div>
                    <div className="button">
                      <Button style={{backgroundColor:"#6d1b7b"}} variant="contained" rounded="true" onClick={handleSubmitMessage}>
                        Send
                      </Button>
                    </div>
                  </div>
        
        </MDBCol>
      )}
    </>

  );
};

export default Chat;