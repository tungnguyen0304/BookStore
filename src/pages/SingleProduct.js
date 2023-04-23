import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {getLocalCartContent, getQuantityByUniqueName, decreaseInLocalCart, increaseInLocalCart} from '../webpages/cart-payment/setCartLocal';

function getUniqueNameFromUrl(url) {
  // Split the URL string by the '/' character
  const urlParts = url.split('/');
  // Select the last element of the resulting array
  const uniqueName = urlParts[urlParts.length - 1];
  // Return the unique name
  return uniqueName;
}
function isInteger(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
} 

const SingleProduct = () => {
  const [qty, setQty] = useState(0)
  const [review, setReview] = useState('')
  const [product, setProduct] = useState({})
  const [allReviews, setAllReviews] = useState([])
  const onIncrease = () => {
    setQty(qty => qty + 1)
    increaseInLocalCart(product)
    console.log(getLocalCartContent())
}
  const onDecrease = () => {
      setQty(qty => qty - 1)
      decreaseInLocalCart(product)
      console.log(getLocalCartContent())
  };      
  const handleChange = (event) => setReview(event.target.value)
  const handleSubmitReview = event => {
    event.preventDefault()
    if (!review.trim()) {
      // check if the review content is empty or only whitespace
      alert('Vui lòng nhập nội dung đánh giá.'); // display an error message
      return; // stop further processing
    }
    axios.post('http://localhost/api/comment-on-product.php', { 
      productID: product.ID,
      content: review.trim()
    })
    .then(response => {
      console.log('Đánh giá của bạn đã được gửi thành công.'); // display a success message
    })
    .catch(error => {
      console.log(error)
    });        
  }
  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND"
  })   
  // // fecth product
  useEffect(() => {   
    async function fetchData() {
      try {
        const uniqueName = getUniqueNameFromUrl(window.location.href)
        // set qty of product by the current qty in cart
        setQty(getQuantityByUniqueName(uniqueName));
        // fetch product info by unique name
        const productResponse = await axios.get('http://localhost/api/product-info.php', {
          params: isInteger(uniqueName) ? { 
            id: uniqueName
          } : {
            unique_name: uniqueName,
          }
        });
        setProduct(productResponse.data);
        // fetch product comments
        const commentsResponse = await axios.get('http://localhost/api/product-comments.php', {
          params: { productID: productResponse.data.ID }
        });
        setAllReviews(commentsResponse.data);
      } catch (error) {
        if (error.response.status === 404) {
          // navigate('/error/404');
        }
      }
    }
    fetchData();
  }, []);
  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,
    img: product.image,
  };

  return (
    <>
      <Meta title={product.name} />
      <BreadCrumb title={product.name} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                {Object.keys(product).length !== 0 && 
                  <ReactImageZoom {...props} />
                }
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {product.name}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{VNCurrencyFormatter.format(product.price)}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tác giả:</h3>
                  <p className="product-data">{product.author_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">NXB/NSX:</h3>
                  <p className="product-data">{product.manufacturer_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thể loại:</h3>
                  <p className="product-data">{product.category_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng còn lại:</h3>
                  <p className="product-data">{product.current_qty}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng đã bán:</h3>
                  <p className="product-data">{product.sold_qty}</p>
                </div>                                
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Trạng thái:</h3>
                  <p className="product-data">{product.in_stock? "Còn hàng": "Ngừng kinh doanh"}</p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {qty?
                  <div className="">
                    <IconButton aria-label="Remove button" size="small" onClick={onDecrease}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span>{qty}</span>
                    <IconButton aria-label="Add button" size="small" onClick={onIncrease}>
                      <AddCircleOutlineIcon />
                    </IconButton>                     
                  </div>
                  :
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={onIncrease}
                    >
                      Thêm giỏ hàng
                    </button>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả</h4>
            <div className="bg-white p-3">
              <p>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Đánh giá sản phẩm</h3>
            <div className="review-inner-wrapper">
              <div className="review-form py-4">
                <h4>Viết đánh giá</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name="review"
                      value={review}
                      onChange={handleChange}
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Đánh giá của bạn..."
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="button border-0" onClick={handleSubmitReview}>
                      Gửi đánh giá
                    </button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {allReviews.map(review => 
                <div className="review" key={review.ID}>
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">{review.name}</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    {review.content}
                  </p>
                  <span>{review.comment_datetime}</span>
                </div>                  
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container> */}

      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                // onClick={() => {
                //   closeModal();
                // }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SingleProduct;
