import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate, Link } from 'react-router-dom';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import ViewProfile from './ViewProfile';
const EditProfile = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [Profile, setProfile] = useState({
    name: '',
    Address: '',
    
    email: '',
    numberphone: ''
    
  });
  const [errors, setErrors] = useState({
    name: '',
    Address: '',
    
    email: '',
    numberphone: ''
        
  });    
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

   

  const checkIDinList = (id, list) => {
    if (!id)
      return false 

    for (const item in list) {
      if (item.id === id) {
        return true
      }
    }

    return false
  }
  function checkValidEmail(email) {
    // Regular Expression kiểm tra tính hợp lệ của địa chỉ email
    const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    // Kiểm tra địa chỉ email có đúng định dạng không
    if (validEmailRegex.test(email)) {
      return true; // Địa chỉ email hợp lệ
    } else {
      return false; // Địa chỉ email không hợp lệ
    }
  }
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (errors[name]) {
          errors[name] = ''
      }
  };   
  // function handleDateSelect(date) {
  //   console.log(date);
  //   return date;
  // }

  const handleSubmit = async (e) => {
    // check thong tin truoc khi submit
    const errors = {};
    if (!Profile.name) errors.name = "Tên không được để trống";
    if (!Profile.Address) errors.Address = "Địa chỉ không được để trống";
    
    if (!checkValidEmail(Profile.email)) {
      errors.email = "Địa chỉ email không hợp lệ";
    } 
    if (!Profile.numberphone) errors.numberphone = "Vui lòng điền số điện thoại";
    else if (Profile.numberphone.length != 10) errors.numberphone = "Số diện thoại không hợp lệ";
    
   

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
    // try {
    //   await axios.post('/api/Profiles', newProfile); // Gửi thông tin sản phẩm mới lên server
    //   console.log('New Profile added successfully!');
    // } catch (error) {
    //   console.log(error);
    // }
        console.log(123)
        
    }      
  };
  const [confirmSaving, setConfirmSaving] = useState(false)
  const [confirmGoingBack, setConfirmGoingBack] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div className='pageTitle'><h2>Edit Profile</h2></div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Tên:</label>
              <TextField
                  
                  name="name"
                  value={Profile.name}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
              />
              </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            
            <label htmlFor="dob">Ngày sinh:</label>
      <DatePicker
        
        id="dob" 
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="DD/MM/YYYY"
      /></Grid> */}

          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Địa chỉ:</label>
              <TextField
                  
                  name="Address"
                  value={Profile.Address}
                  onChange={handleChange}
                  error={errors.Address ? true : false}
                  helperText={errors.Address}
              />
              </FormControl>
          </Grid>

                      
                    
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">SĐT:</label>
              <TextField
                  
                  name="numberphone"
                  type="tel"
                  value={Profile.numberphone}
                  onChange={handleChange}
                  error={errors.numberphone ? true : false}
                  helperText={errors.numberphone}
              />
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth >
          <label htmlFor="dob">Email:</label>
          <TextField 
          
           
          type="email" name="email" 
           
          value={Profile.email} onChange={handleChange}
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