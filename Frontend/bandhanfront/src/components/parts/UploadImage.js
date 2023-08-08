import React, {useEffect, useState } from "react";
import { useProfilePictureMutation, useGetLoggedUserQuery } from "../../services/userAuthApi";
import { Box, Button, Grid, Typography, Alert } from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { setUserInfo } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";


const UploadImage = () => {
    const[serverError, setServerError] = useState({})
    const[serverMsg, setServerMsg] = useState({})
    const {access_token} = getToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadImage, { isLoading, error }] = useProfilePictureMutation()
    
    const {data, isSuccess} = useGetLoggedUserQuery(access_token);

    useEffect(() => {
        if(data && isSuccess){
          dispatch(setUserInfo({
            email:data.user.email,
            name:data.user.name,
            id:data.user.id,
            is_phone_verified:data.user.is_phone_verified,
            is_preferences:data.user.is_preferences
          }))
          }
      }, [data, isSuccess, dispatch])
      const UserData = useSelector(state => state.user)
    
      const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
        };
  
      const handleUpload = async (event) => {
            event.preventDefault();
            if (!selectedFile) {
                return; 
            }
            const formData = new FormData();
                formData.append('user', UserData.id);
                formData.append('image', selectedFile);

            const res = await uploadImage({formData,access_token})

            // .unwrap() // Automatically unwraps the result or throws an error
            // .then(() => {
            //   console.log('Image uploaded successfully!');
            //   // Handle success, show a success message, or perform any necessary actions
            // })
            // .catch((error) => {
            //   console.error('Error uploading image:', error);
            //   // Handle error, show an error message, or perform any necessary actions
            // });


            if(res.error){
                setServerMsg({})
                setServerError(res.error)
                console.log("error is",res.error.data.errors)
            }
            if(res.data){
                setServerError({})
                setServerMsg(res.data)
                console.log("data is",res.data)
                navigate('/userhome') 
            }



    };
  
    return (

      <Grid>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
          maxWidth: 600,
          margin: "auto",
          mt: 10 }}>
            <Typography variant="h5">Upload Profile Picture</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" onClick={handleUpload} disabled={isLoading || !selectedFile}> {isLoading ? "Uploading..." : "Upload"}</Button>
            {/* {error && (<Typography color="error">Error is  {error}</Typography>)} */}
            {/* {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors.data}</Alert> : ''}
            {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}  */}
        </Box>


      </Grid>
    
    );
  };
  
  export default UploadImage;