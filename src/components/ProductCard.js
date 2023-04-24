import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = ({grid, product}) => {
  // let location = useLocation();
  // console.log(grid);
  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND"
  })    

  return (
      <div className="text-center">
        <Link
          to = {"/product/" + product.unique_name}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={product.image} alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{product.manufacturer_name}</h6>
            <h5 className="product-title">
              {product.name}
            </h5>
            <div className="m-auto d-flex justify-content-center">
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {product.description}
            </p>
            <p className="price">{VNCurrencyFormatter.format(product.price)}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
  );
};

export default ProductCard;
