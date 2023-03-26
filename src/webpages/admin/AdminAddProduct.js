import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const AdminAddProduct = () => {
  const [title, setTitle] = useState(''); // Lưu tiêu đề sách
  const [author, setAuthor] = useState(''); // Lưu tác giả của sách
  const [description, setDescription] = useState(''); // Lưu mô tả của sách
  const [price, setPrice] = useState(''); // Lưu giá của sách

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của form submit
    const newProduct = {
      title,
      author,
      description,
      price,
    };
    try {
      await axios.post('/api/products', newProduct); // Gửi thông tin sản phẩm mới lên server
      console.log('New product added successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className='Admin-Add_Edit-Product-btn' type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
