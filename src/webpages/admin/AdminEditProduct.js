import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEditProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`/api/products/${match.params.id}`);
//       setProduct(response.data);
//       setTitle(response.data.title);
//       setAuthor(response.data.author);
//       setDescription(response.data.description);
//       setPrice(response.data.price);
//     };

//     fetchData();
//   }, [match.params.id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title: title,
      author: author,
      description: description,
      price: price,
    };

    await axios.patch(`/api/products/${match.params.id}`, updatedProduct);
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <button className='Admin-Add_Edit-Product-btn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
