import React, { useEffect, useState } from "react";
import { Box, Button, CssBaseline, Grid, CircularProgress, TextField, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../services/LocalStorageService";
import { useGetLoggedUserQuery, useUserInfoMutation } from "../../../services/userAuthApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setUserInfo } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
;

const MARITAL_STATUS_CHOICES = ['Never Married', 'Divorced', 'Widowed', 'Seperated,but not legally divorced']
const GENDER_CHOICES = ['Male', 'Female', 'Other']
const EDUCATION_CHOICES = ['High School', 'Bachelors', 'Master Degree', 'Doctorate', 'Other']
const RELIGION_CHOICES = ['Muslim', 'Christian', 'Jewish', 'Hindu', 'Jainist', 'Budhist', 'Sikh']
const LANGUAGE_CHOICES = ['Assamese', 'Bengali', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri', 'Konkani', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali',
  'Oriya', 'Punjabi', 'Sanskrit', 'Sindhi', 'Tamil', 'Telugu', 'Urdu', 'Arabic', 'Bhojpuri', 'Chhattisgarhi', 'Rajasthani', 'Romani']
const FAMILY_STATUS = ['middle class', 'upper middle class', 'lower middle class', 'rich', 'affluent']
const FAMILY_VALUES = ['orthodox', 'traditional', 'moderate', 'liberal']

const UserInfo = () => {
  const [serverError, setServerError] = useState({})
  const [serverMsg, setServerMsg] = useState({})
  const navigate = useNavigate()
  const { access_token } = getToken()
  const dispatch = useDispatch()
  const [userInfo] = useUserInfoMutation()
  const {is_phone_verified,is_preferences} = useSelector(state => state.user)

  const [choice, SetChoice] = useState({
    marital_status: '',
    motherTongue: '',
    religion: '',
    gender: '',
    education: '',
    familyStatus: '',
    familyValues: ''
  })

  //Bringing Data from Redux store and setting to access
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        id: data.id,
        is_phone_verified:data.is_phone_verified,
        is_preferences:data.is_preferences

      }))
    }
  }, [data, isSuccess, dispatch])
  const UserData = useSelector(state => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const actualData = {
      user: UserData.id,
      date_of_birth: formdata.get('date_of_birth'),
      height: formdata.get('height'),
      weight: formdata.get('weight'),
      marital_status: formdata.get('marital_status'),
      mother_tongue: formdata.get('motherTongue'),
      religion: formdata.get('religion'),
      gender: formdata.get('gender'),
      Education: formdata.get('education'),
      country: formdata.get('country'),
      native_place: formdata.get('nativePlace'),
      location: formdata.get('location'),
      profession: formdata.get('profession'),
      family_status: formdata.get('familyStatus'),
      family_values: formdata.get('familyValues'),
      about_me: formdata.get('aboutMe'),
      mobile: formdata.get('mobile'),
    }

    const res = await userInfo({ actualData, access_token })
    if (res.error) {
      setServerMsg({})
      setServerError(res.error.data.errors)
      console.log(res.error.data.errors)
    }
    if (res.data) {
      setServerError({})
      setServerMsg(res.data)
      document.getElementById('userinfo-form').reset()
      navigate('/sendotp')
    }

  };

  const handleChange = (e) => {
    console.log(is_phone_verified,is_preferences);
    const { name, value } = e.target; 
    SetChoice({ ...choice, [name]: value });
  };

  return <>
    <CssBaseline />

    <Grid container component='form' noValidate sx={{ height: '114vh', backgroundColor: 'white', padding: '1px', paddingTop: '1px', width: "100%" }} id='userinfo-form' onSubmit={handleSubmit}>
      <Grid item xs={6} display={"flex"} flexDirection={"column"} sx={{ backgroundColor: "white", padding: '1px', paddingTop: '1px', color: "white" }}>

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='date_of_birth' name='date_of_birth' label='Date of Birth' type="date" InputLabelProps={{ shrink: true, }} inputProps={{ max: "2005-07-31", min: "1970-07-31", }} />
        {serverError.date_of_birth ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.date_of_birth}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='height' name='height' label='Height' />
        {serverError.height ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.height}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='weight' name='weight' label='Weight' />
        {serverError.weight ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.weight}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Marital Status</InputLabel>
          <Select id="marital_status" name="marital_status" label='Marital Status' value={choice?.marital_status} onChange={handleChange}>{MARITAL_STATUS_CHOICES.map((choice) => (<MenuItem key={choice} value={choice}>{choice}</MenuItem>))}</Select>
        </FormControl>
        {serverError.marital_status ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.marital_status}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Mother Tongue</InputLabel>
          <Select id="motherTongue" name="motherTongue" label='Mother Tongue'  value={choice?.motherTongue} onChange={handleChange}>{LANGUAGE_CHOICES.map((motherTongue) => (<MenuItem key={motherTongue} value={motherTongue}>{motherTongue}</MenuItem>))}</Select>
        </FormControl>
        {serverError.mother_tongue ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.mother_tongue}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Gender</InputLabel>
          <Select id="gender" name="gender" label='Gender'  value={choice?.gender} onChange={handleChange}>{GENDER_CHOICES.map((gender) => (<MenuItem key={gender} value={gender}>{gender}</MenuItem>))}</Select>
        </FormControl>
        {serverError.gender ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.gender}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Religion</InputLabel>
          <Select id="religion" name="religion" label='Religion'  value={choice?.religion} onChange={handleChange}>{RELIGION_CHOICES.map((religion) => (<MenuItem key={religion} value={religion}>{religion}</MenuItem>))}</Select>
        </FormControl>
        {serverError.religion ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.religion}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Education</InputLabel>
          <Select id="education" name="education" label='Education'  value={choice?.education} onChange={handleChange}>{EDUCATION_CHOICES.map((education) => (<MenuItem key={education} value={education}>{education}</MenuItem>))}</Select>
        </FormControl>
        {serverError.Education ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.Education}</Typography> : ""}

      </Grid>

      <Grid item xs={6} display={"flex"} flexDirection={"column"} sx={{ backgroundColor: "white", padding: '0.5px', paddingTop: '1px', color: "white" }}>

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='country' name='country' label='Country' />
        {serverError.country ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.country}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='nativePlace' name='nativePlace' label='Native Place' />
        {serverError.native_place ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.native_place}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='location' name='location' label='Location' />
        {serverError.location ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.location}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='profession' name='profession' label='Profession' />
        {serverError.profession ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.profession}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Family Status</InputLabel>
          <Select id="familyStatus" name="familyStatus" label='Family Status'  value={choice?.familyStatus} onChange={handleChange}>{FAMILY_STATUS.map((familyStatus) => (<MenuItem key={familyStatus} value={familyStatus}>{familyStatus}</MenuItem>))}</Select>
        </FormControl>
        {serverError.family_status ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.family_status}</Typography> : ""}

        <FormControl sx={{ width: '95%', ml: 2, mt: 2, mb: '8px' }}>
          <InputLabel>Family Values</InputLabel>
          <Select id="familyValues" name="familyValues" label='Family Values'  value={choice?.familyValues} onChange={handleChange}>{FAMILY_VALUES.map((familyValues) => (<MenuItem key={familyValues} value={familyValues}>{familyValues}</MenuItem>))}</Select>
        </FormControl>
        {serverError.family_values ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.family_values}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='aboutMe' name='aboutMe' label='About Me' />
        {serverError.about_me ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.about_me}</Typography> : ""}

        <TextField margin='normal' required sx={{ width: '95%', ml: 2 }} id='mobile' name='mobile' label='Phone Number' />
        {serverError.mobile ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{serverError.mobile}</Typography> : ""}

      </Grid>

      <Box xs={12} sx={{ margin: "auto" }}>
        <Button xs={12} sx={{ backgroundColor: '#6d1b7b' }} type='submit' variant='contained' >Save and Verify Mobile</Button>
      </Box>
      {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
      {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}

    </Grid>

  </>;
};
export default UserInfo;
