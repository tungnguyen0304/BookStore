import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';

const AdminManageProductInfo = () => {
  const [authorName, setAuthorName] = useState('');
  const [manufacturer, setManufacturer] = useState({
    name: '',
    country: ''
  })
  const [authorError, setAuthorError] = useState(authorName);
  const [manufacturerError, setManufacturerError] = useState(manufacturer);

  const handleChangeManu = (e) => {
      const { name, value } = e.target;
      setManufacturer((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (manufacturerError[name]) {
        setManufacturerError({...manufacturerError, [name] : ''})
      }
  };   


  const handleSubmitAuthor = async (e) => {
    let error = '';

    const trimmedAuthorName = authorName.trim()

    if (trimmedAuthorName.length === 0) {
        error = 'Tên tác giả không được trống'
    } else if (trimmedAuthorName.length > 50) {
        error = 'Tên tác giả phải ít hơn 50 ký tự'
    }

    // Set errors if any, else submit form
    if (error.length !== 0) {
        setAuthorError(error);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/admin/author-add.php', {
            name: trimmedAuthorName
          })
          console.log(response)
        } catch (error) {
          console.log(error);
        }
    }      
  };

  const handleSubmitManu = async (e) => {
    const errors = {}

    const trimmedManuName = manufacturer.name.trim()
    const trimmedCountryName = manufacturer.country.trim()

    if (trimmedManuName.length === 0) {
        errors.name = 'Tên NSX/NXB không được trống'
    } else if (trimmedManuName.length > 50) {
        errors.name = 'Tên NSX/NXB phải ít hơn 50 ký tự'
    }

    if (trimmedCountryName.length > 20) {
        errors.country = "Tên quốc gia phải ít hơn 20 ký tự"
    }

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setManufacturerError(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/admin/manufacturer-add.php', {
            name: trimmedManuName,
            country: trimmedCountryName
          })
          console.log(response)
        } catch (error) {
          console.log(error);
        }
    }      
  };

  const [confirmSaveAuthor, setConfirmSaveAuthor] = useState(false)
  const [confirmSaveManu, setConfirmSaveManu] = useState(false)

  return (
    <>
    <div>
      <div className='pageTitle'>Thêm tác giả mới</div>
      <form onSubmit={handleSubmitAuthor}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Tên tác giả"
                  name="name"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value)
                    if (authorError) {  
                        setAuthorError('')
                    }
                  }}
                  error={!!authorError}
                  helperText={authorError}
              />
              </FormControl>
          </Grid>
          <Grid item container justifyContent="center">
            <GreenButton variant="contained" onClick={() => setConfirmSaveAuthor(!confirmSaveAuthor)}>
                Lưu
            </GreenButton>
          </Grid>                                                                       
        </Grid>
      </form>
      <ConfirmDialog 
        isOpen={confirmSaveAuthor} 
        setOpen={setConfirmSaveAuthor} 
        content="Bạn chắc chắn muốn thêm tác giả?"
        confirm={handleSubmitAuthor}
      />            
    </div>
    <div>
    <div className='pageTitle'>Thêm NSX/NXB mới</div>
    <form onSubmit={handleSubmitManu}>
      <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth >
            <TextField
                label="Tên NSX/NXB"
                name="name"
                value={manufacturer.name}
                onChange={handleChangeManu}
                error={!!manufacturerError.name}
                helperText={manufacturerError.name}
            />
            </FormControl>          
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth >
                <TextField
                    label="Quốc gia"
                    name="country"
                    value={manufacturer.country}
                    onChange={handleChangeManu}
                    error={!!manufacturerError.country}
                    helperText={manufacturerError.country}
                />
            </FormControl>   
        </Grid>       
        <Grid item container justifyContent="center">
          <GreenButton variant="contained" onClick={() => setConfirmSaveManu(!confirmSaveManu)}>
              Lưu
          </GreenButton>
        </Grid>                                                                       
      </Grid>
    </form>
    <ConfirmDialog 
      isOpen={confirmSaveManu} 
      setOpen={setConfirmSaveManu} 
      content="Bạn chắc chắn muốn thêm NSX/NXB?"
      confirm={handleSubmitManu}
    />            
  </div>  
  </>  
  );
};

export default AdminManageProductInfo;
