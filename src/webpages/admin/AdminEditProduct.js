import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  // this product is fetched from server based on id from param
  const [product, setProduct] = useState({
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    category: 1,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg',
    price: '125000',
    current_qty: '123',
    sold_qty: '120',
    author: 1,
    manufacturer: 1,
    description: `Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.
    Tác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.`
  });
  const [errors, setErrors] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    current_qty: '',
    sold_qty: '',
    author: '',
    manufacturer: '',
    description: ''    
  });    
  const authorsList = [
    {id: 1, name: 'Nguyen Nhat Anh'},
    {id: 2, name: 'Nguyen Anh Nhat'}, 
    {id: 3, name: 'Jimmy Carter'}, 
    {id: 4, name: 'Nguyen Van Nguyen Van'}
  ]
  const manufacturersList = [
    {id: 1, name: 'NXB Giao duc', country: 'Vietnam'},
    {id: 2, name: 'NXB Dan tri', country: 'Vietnam'}, 
    {id: 3, name: 'NXB ABC', country: 'Trung Quoc'}, 
    {id: 4, name: 'NXB XYZ', country: 'Hoa Ky'}
  ]
  const categoryList = [
    {id: 1, name: 'Sach trong nuoc'},
    {id: 2, name: 'Sach ngoai quoc'}, 
    {id: 3, name: 'Van phong pham'}, 
    {id: 4, name: 'Do choi'},
    {id: 5, name: 'Hang luu niem'},
  ]  

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

  const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (errors[name]) {
          errors[name] = ''
      }
  };   


  const handleSubmit = async (e) => {
    // check thong tin truoc khi submit
    const errors = {};
    if (!product.name) errors.name = "Vui lòng điền tên người nhận";
    if (!product.category) errors.category = "Vui lòng chọn thể loại sản phẩm"
    else if (checkIDinList(product.category, categoryList)) errors.category = "Thể loại sản phẩm không hợp lệ"
    if (!product.price) errors.price = "Vui lòng điền giá sản phẩm";
    else if (product.current_qty < 0) errors.current_qty = "Giá sản phẩm phải lớn hơn 0";
    if (!product.current_qty) errors.current_qty = "Vui lòng điền số lượng hiện tại của sản phẩm";
    else if (product.current_qty < 0) errors.current_qty = "Số lượng hiện tại của sản phẩm phải lớn hơn 0";
    if (!product.sold_qty) errors.sold_qty = "Vui lòng điền số lượng đã bán của sản phẩm";
    else if (product.sold_qty < 0) errors.sold_qty = "Số lượng đã bán của sản phẩm phải lớn hơn 0";
    if (checkIDinList(product.author, authorsList)) errors.author = "Tác giả không hợp lệ"
    if (checkIDinList(product.manufacturer, manufacturersList)) errors.manufacturer = "NXB/NSX không hợp lệ"
    if (product.description.length > 5000) errors.description = "Mô tả sản phẩm phải ít hơn 5000 ký tự";

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
    // try {
    //   await axios.post('/api/products', newProduct); // Gửi thông tin sản phẩm mới lên server
    //   console.log('New product added successfully!');
    // } catch (error) {
    //   console.log(error);
    // }
        console.log(product)
    }      
  };
  const [confirmSaving, setConfirmSaving] = useState(false)
  const [confirmGoingBack, setConfirmGoingBack] = useState(false)
  const navigate = useNavigate()

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
                  error={errors.name ? true : false}
                  helperText={errors.name}
              />
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <Autocomplete
                  options={categoryList}
                  getOptionLabel={(option) => option.name}
                  value={product.category ? categoryList.find(item => item.id === product.category) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, category: newValue ? newValue.id : ''});
                    if (errors.category) { // hide error if there is any
                      errors.category = ''
                    }
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="Thể loại" 
                    error={errors.category ? true : false}
                    helperText={errors.category}                   
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
                  error={errors.image ? true : false}
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
                  error={errors.price ? true : false}
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
                  error={errors.current_qty ? true : false}
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
                  error={errors.sold_qty ? true : false}
                  helperText={errors.sold_qty}
              />
              </FormControl>
          </Grid> 
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <Autocomplete
                  options={authorsList}
                  getOptionLabel={(option) => option.name}
                  value={product.author ? authorsList.find((item) => item.id === product.author) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, author: newValue ? newValue.id : ''});
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="Tác giả" 
                    error={errors.author ? true : false}
                    helperText={errors.author}                   
                  />}                 
                />                
              </FormControl>
          </Grid>  
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <Autocomplete
                  options={manufacturersList}
                  getOptionLabel={(option) => option.name}
                  value={product.manufacturer ? manufacturersList.find((item) => item.id === product.manufacturer) : null}
                  onChange={(e, newValue) => {
                    setProduct({...product, manufacturer: newValue ? newValue.id : ''});
                  }}
                  renderInput={(params) => 
                  <TextField {...params} 
                    label="NXB/NSX" 
                    error={errors.manufacturer ? true : false}
                    helperText={errors.manufacturer}                   
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
                  error={errors.description ? true : false}
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
        content="Bạn chắc chắn muốn tạo sản phẩm?"
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

export default AdminAddProduct;
