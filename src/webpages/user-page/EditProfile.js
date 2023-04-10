import { Grid, FormControl, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState(profile);    

  function checkValidName(name) {
    const validNameRegex = /^[\p{L}\s']{1,50}$/u
    return validNameRegex.test(name)
  }
  function checkValidEmail(email) {
    const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{,50}$/;
    return validEmailRegex.test(email)
  }
  function checkValidPhoneNumber(input) {
    var pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    return pattern.test(input)
  }   
  // fecth user info
  useEffect(() => {
    axios.get('http://localhost/api/user-info.php')
    .then(response => {
      return response.data
    })
    .then(response => {
        const {name, phone, email, address} = response
        setProfile(prev => ({...prev, name: name, phone: phone, email: email, address: address}))
    }) 
    .catch(error => {
      console.log(error);
    });    
  }, [])   
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
    // if there is any warning, turn it off
    if (errors[name]) {
        errors[name] = ''
    }
  };  

  const handleSubmit = async (e) => {
    // check thong tin truoc khi submit
    const trimmedInfo = Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, value.trim()]))
    const errors = {};
    if (!checkValidName(trimmedInfo.name))
      errors.name = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng"
    
    if (trimmedInfo.email.length !== 0) {
      if (!checkValidEmail(trimmedInfo.email)) {
        errors.email = "Email không hợp lệ";
      } 
    }
    
    if (trimmedInfo.phone.length !== 0)
      if (!checkValidPhoneNumber(trimmedInfo.phone)) 
        errors.phone = "Phone không hợp lệ"

    if (trimmedInfo.address.length > 255) 
      errors.address = "Địa chỉ tối đa 255 ký tự"

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/user-edit.php', trimmedInfo)
          console.log(response)
        } catch (error) {
          if (error.response.status === 400) { // invalid
            console.log(error.response.data)
            setErrors(error.response.data)
          } else if (error.response.status === 409) { // conflict
            console.log(error.response.data)
            setErrors(error.response.data)
          }
          console.log(error)
        };
    } 
  }    
  const [confirmSaving, setConfirmSaving] = useState(false)
  const [confirmGoingBack, setConfirmGoingBack] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div className='pageTitle spaceBelow'>Chỉnh sửa hồ sơ</div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Tên:</label>
              <TextField
                  
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
              />
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Địa chỉ:</label>
              <TextField
                  
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  error={errors.address ? true : false}
                  helperText={errors.address}
              />
              </FormControl>
          </Grid>

                      
                    
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">SĐT:</label>
              <TextField
                  
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  error={errors.phone ? true : false}
                  helperText={errors.phone}
              />
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth >
          <label htmlFor="dob">Email:</label>
          <TextField 
          
           
          type="email" name="email" 
           
          value={profile.email} onChange={handleChange}
          error={errors.email ? true : false}
                  helperText={errors.email} />
          </FormControl>
          </Grid>

          <Grid item container justifyContent="center">
            <GreenButton variant="contained" onClick={() => setConfirmSaving(!confirmSaving)}>
                Lưu
            </GreenButton>
            <RedButton variant="contained" onClick={() => setConfirmGoingBack(!confirmGoingBack)}>
                Thoát
            </RedButton>            
          </Grid>                                                                       
        </Grid>
      </form>
      <ConfirmDialog 
        isOpen={confirmSaving} 
        setOpen={setConfirmSaving} 
        content="Bạn chắc chắn muốn lưu?"
        confirm={handleSubmit}
      /> 
      <ConfirmDialog 
        isOpen={confirmGoingBack} 
        setOpen={setConfirmGoingBack} 
        content="Bạn chắc chắn muốn thoát? Tất cả mọi thay đổi sẽ bị hủy bỏ"
        confirm={() => {navigate(-1)}}
      />            
    </div>
  );
};

export default EditProfile;