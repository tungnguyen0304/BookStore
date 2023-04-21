import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
  const navigate = useNavigate()
  const queryParameters = new URLSearchParams(window.location.search)
  const params = {}
  if (queryParameters.get('id')) {
    params.id = queryParameters.get('id');
  } else if (queryParameters.get('unique_name')) {
    params.unique_name = queryParameters.get('unique_name');
  } else {
    navigate('/error/404');
  }

  const [product, setProduct] = useState({
    ID: '',
    name: '',
    unique_name: '',
    categoryID: '',
    inStock: '',
    image: '',
    price: '',
    current_qty: '',
    sold_qty: '',
    authorID: '',
    manufacturerID: '',
    description: ''    
  });
  const [errors, setErrors] = useState({
    name: '',
    categoryID: '',
    image: '',
    price: '',
    current_qty: '',
    sold_qty: '',
    authorID: '',
    manufacturerID: '',
    description: ''    
  });    
  const [authorsList, setAuthorsList] = useState([])
  const [manufacturersList, setManufacturersList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])

  // get list of categories, authors, manufacturers, product info
  useEffect(() => {
    axios.get('http://localhost/api/product-info-option.php')
    .then(response => {
      return response.data
    })
    .then(response => {
        setAuthorsList(JSON.parse(response.authorsList))
        setManufacturersList(JSON.parse(response.manufacturersList))
        setCategoriesList(JSON.parse(response.categoriesList))
    }) 
    .catch(error => {
      console.log(error);
    });

    axios.get('http://localhost/api/product-info.php', {
      params: params
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
        setProduct(response)
    }) 
    .catch(error => {
      if (error.response.status === 404) {
        navigate('/error/404');
      }
    });    
  }, [])

  const checkIDinList = (ID, list) => {
    if (!ID)
      return false 

    for (const item of list) {
      if (item.ID == ID) {
        return true
      }
    }

    return false
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (errors[name]) {
          errors[name] = ''
      }
  };   


  const handleSubmit = async (e) => {
    const trimmedProduct = Object.fromEntries(
      Object.entries(product).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ])
    );
    const errors = {};
    if (!trimmedProduct.name) errors.name = "Vui lòng điền tên sản phẩm";

    if (trimmedProduct.categoryID === '') errors.categoryID = "Vui lòng chọn thể loại sản phẩm"
    else if (!checkIDinList(trimmedProduct.categoryID, categoriesList)) errors.categoryID = "Thể loại sản phẩm không hợp lệ"

    if (trimmedProduct.image.length > 255) errors.image = "Link hình ảnh phải ít hơn 255 ký tự";

    if (trimmedProduct.price === '') errors.price = "Vui lòng điền giá sản phẩm";
    else if (trimmedProduct.price < 0) errors.price = "Giá sản phẩm phải lớn hơn 0";

    if (trimmedProduct.current_qty === '') errors.current_qty = "Vui lòng điền số lượng hiện tại của sản phẩm";
    else if (trimmedProduct.current_qty < 0) errors.current_qty = "Số lượng hiện tại của sản phẩm phải lớn hơn 0";

    if (trimmedProduct.sold_qty === '') errors.sold_qty = "Vui lòng điền số lượng đã bán của sản phẩm";
    else if (trimmedProduct.sold_qty < 0) errors.sold_qty = "Số lượng đã bán của sản phẩm phải lớn hơn 0";

    if (trimmedProduct.authorID !== '') {
      if (!checkIDinList(trimmedProduct.authorID, authorsList)) errors.authorID = "Tác giả không hợp lệ"
    }

    if (trimmedProduct.manufacturerID !== '') {
      if (!checkIDinList(trimmedProduct.manufacturerID, manufacturersList)) errors.manufacturerID = "NXB/NSX không hợp lệ"
    }
    if (trimmedProduct.description.length > 5000) errors.description = "Mô tả sản phẩm phải ít hơn 5000 ký tự";

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/admin/product-edit.php', trimmedProduct)
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        // console.log(product)
    }      
  };
  const [confirmSaving, setConfirmSaving] = useState(false)
  const [confirmGoingBack, setConfirmGoingBack] = useState(false)

  return (
    <div>
      <div className='pageTitle'>Chỉnh sửa sản phẩm</div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Tên sản phẩm"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
              />
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <Autocomplete
                  options={categoriesList}
                  getOptionLabel={(option) => option.name}
                  value={product.categoryID ? categoriesList.find(item => item.ID === product.categoryID) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, categoryID: newValue ? newValue.ID : ''});
                    if (errors.categoryID) { // hide error if there is any
                      errors.categoryID = ''
                    }
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="Thể loại" 
                    error={!!errors.categoryID}
                    helperText={errors.categoryID}                   
                  />}                 
                />
              </FormControl>
          </Grid>            
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Link hình ảnh"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  error={!!errors.image}
                  helperText={errors.image}
              />
              </FormControl>
          </Grid>            
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Giá"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
              />
              </FormControl>
          </Grid>  
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Số lượng"
                  name="current_qty"
                  type="number"
                  value={product.current_qty}
                  onChange={handleChange}
                  error={!!errors.current_qty}
                  helperText={errors.current_qty}
              />
              </FormControl>
          </Grid>    
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <TextField
                  label="Số lượng đã bán"
                  name="sold_qty"
                  type="number"
                  value={product.sold_qty}
                  onChange={handleChange}
                  error={!!errors.sold_qty}
                  helperText={errors.sold_qty}
              />
              </FormControl>
          </Grid> 
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <Autocomplete
                  options={authorsList}
                  getOptionLabel={(option) => option.name}
                  value={product.authorID ? authorsList.find((item) => item.ID === product.authorID) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, authorID: newValue ? newValue.ID : ''})
                    if (errors.authorID) { // hide error if there is any
                      errors.authorID = ''
                    }     
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="Tác giả" 
                    error={!!errors.authorID}
                    helperText={errors.authorID}                   
                  />}                 
                />                
              </FormControl>
          </Grid>  
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <Autocomplete
                  options={manufacturersList}
                  getOptionLabel={(option) => option.name}
                  value={product.manufacturerID ? manufacturersList.find((item) => item.ID === product.manufacturerID) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, manufacturerID: newValue ? newValue.ID : ''})
                    if (errors.manufacturerID) { // hide error if there is any
                      errors.manufacturerID = ''
                    }                      
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="NXB/NSX" 
                    error={!!errors.manufacturerID}
                    helperText={errors.manufacturerID}                   
                  />}                 
                />  
              </FormControl>
          </Grid>      
          <Grid item xs={12}>
              <FormControl fullWidth >
              <TextField
                  multiline
                  minRows={4}
                  maxRows={8}
                  label="Mô tả sản phẩm"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
              />
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
        content="Lưu thay đổi?"
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

export default AdminEditProduct;
