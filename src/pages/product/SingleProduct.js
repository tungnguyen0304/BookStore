import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactImageZoom from "react-image-zoom";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  getLocalCartContent,
  getQuantityByUniqueName,
  decreaseInLocalCart,
  increaseInLocalCart,
} from "../../utils/setCartLocal";
import { useSelector } from "react-redux";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Tooltip } from "@mui/material";

function getUniqueNameFromUrl(url) {
  // Split the URL string by the '/' character
  const urlParts = url.split("/");
  // Select the last element of the resulting array
  const uniqueName = urlParts[urlParts.length - 1];
  // Return the unique name
  return uniqueName;
}
function isInteger(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseInt(str))
  ); // ...and ensure strings of whitespace fail
}

const SingleProduct = () => {
  const userRole = useSelector((state) => state.userRole);
  const [qty, setQty] = useState(0);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [product, setProduct] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const onIncrease = () => {
    setQty((qty) => qty + 1);
    increaseInLocalCart(product);
    console.log(getLocalCartContent());
  };
  const onDecrease = () => {
    setQty((qty) => qty - 1);
    decreaseInLocalCart(product);
    console.log(getLocalCartContent());
  };
  const handleChange = (event) => {
    setReview(event.target.value);
    if (reviewError) {
      setReviewError("");
    }
  };
  const handleSubmitReview = (event) => {
    event.preventDefault();
    const trimmedReview = review.trim();
    if (!trimmedReview) {
      // check if the review content is empty or only whitespace
      setReviewError("Vui lòng nhập nội dung đánh giá."); // display an error message
      return; // stop further processing
    }
    axios
      .post("http://localhost/api/comment-on-product.php", {
        productID: product.ID,
        content: trimmedReview,
      })
      .then((response) => {
        setReview("");
        setAllReviews((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        setReviewError("Không thể gửi bình luận! Vui lòng thử lại");
      });
  };
  const VNCurrencyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  const VNDatetimeFormatter = new Intl.DateTimeFormat("vi", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  // // fecth product
  useEffect(() => {
    async function fetchData() {
      try {
        const uniqueName = getUniqueNameFromUrl(window.location.href);
        // set qty of product by the current qty in cart
        setQty(getQuantityByUniqueName(uniqueName));
        // fetch product info by unique name
        const productResponse = await axios.get(
          "http://localhost/api/product-info.php",
          {
            params: isInteger(uniqueName)
              ? {
                  id: uniqueName,
                }
              : {
                  unique_name: uniqueName,
                },
          }
        );
        setProduct(productResponse.data);
        // fetch product comments
        const commentsResponse = await axios.get(
          "http://localhost/api/product-comments.php",
          {
            params: { productID: productResponse.data.ID },
          }
        );
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
    // width: 594,
    // height: 600,
    zoomWidth: 600,
    img: product.image,
  };

  return (
    <>
      <Meta title={product.name} />
      <BreadCrumb title={product.name} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          {" "}
          <div className="row justify-content-center align-items-stretch">
            <div className="col-sm-12 col-md-6 col-lg-5">
              <div className="main-product-image text-center h-100">
                <div>
                  {Object.keys(product).length !== 0 && (
                    <ReactImageZoom {...props} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{product.name}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">
                    {VNCurrencyFormatter.format(product.price)}
                  </p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">
                      ({allReviews.length} đánh giá)
                    </p>
                  </div>
                  <a className="review-btn" href="#review">
                    Viết đánh giá
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
                    <p className="product-data">
                      {product.in_stock ? "Còn hàng" : "Ngừng kinh doanh"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-3 mb-2">
                    {qty > 0 ? (
                      <div className="">
                        <IconButton
                          aria-label="Remove button"
                          size="small"
                          onClick={onDecrease}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span>{qty}</span>
                        <IconButton
                          aria-label="Add button"
                          size="small"
                          onClick={onIncrease}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-30 ms-5">
                        <button
                          className="button border-0"
                          type="button"
                          onClick={onIncrease}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {product.description && product.description.length !== 0 && (
        <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row justify-content-center">
            <div className="col-10">
              <h4>Mô tả</h4>
              <div className="bg-white p-3" style={{ borderRadius: "15px" }}>
                <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
              </div>
            </div>
          </div>
        </Container>
      )}
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row justify-content-center">
          <div className="col-10 mb-3">
            <h3 id="review">Đánh giá sản phẩm</h3>
            <div
              className="review-inner-wrapper"
              style={{ borderRadius: "15px" }}
            >
              {userRole !== "" ? (
                <div className="review-form py-4">
                  <h4>Viết đánh giá</h4>
                  <form className="d-flex flex-column gap-15">
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
                        className={`w-100 form-control ${
                          reviewError ? "is-invalid" : ""
                        }`}
                        cols="30"
                        rows="4"
                        placeholder="Đánh giá của bạn..."
                      ></textarea>
                      {!!reviewError && (
                        <span className="invalid-feedback">{reviewError}</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="button border-0"
                        onClick={handleSubmitReview}
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center text-muted">
                  Bạn phải đăng nhập để bình luận
                  <br />
                  <Link to="/login">Đăng nhập</Link>
                </div>
              )}
              <div className="reviews mt-4">
                {allReviews.length !== 0 ? (
                  allReviews.map((review) => (
                    <div className="review" key={review.ID}>
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">{review.username}</h6>
                        {review.userRole === "1" && (
                          <Tooltip title="Quản trị viên">
                            <VerifiedUserIcon />
                          </Tooltip>
                        )}
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">{review.content}</p>
                      <div style={{ fontSize: "10px" }} className="text-muted">
                        {VNDatetimeFormatter.format(
                          new Date(review.comment_datetime)
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted">Không có bình luận nào</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
