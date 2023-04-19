import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import Meta from "../components/Meta";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: "422px",
  weight: "636px",
};
const slideImages = [
  {
    url: "images/flash_sale.jpg",
  },
  {
    url: "images/flash_sale2.jpg",
  },
  {
    url: "images/flash_sale3.jpg",
  },
];

const Home = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/api/product-info-option.php")
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        // console.log(JSON.parse(response.categoriesList))
        setCategoriesList(JSON.parse(response.categoriesList));
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost/api/products-homepage.php")
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        // console.log(response)
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Meta title={"Trang chủ"} />
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <Slide>
                {slideImages.map((slideImage, index) => (
                  <div key={index}>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${slideImage.url})`,
                      }}
                    ></div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {categoriesList.length !== 0 &&
        Object.keys(products).length !== 0 &&
        categoriesList.map(
          (category, index) =>
            products[category.ID].length !== 0 && (
              <Container
                key={index}
                class1="featured-wrapper py-5 home-wrapper-2"
              >
                <div className="row">
                  <div className="col-9">
                    <h3 className="section-heading">{category.name}</h3>
                  </div>
                  <div className="col-3">
                    <a href={'/category/' + category.unique_name}>Xem tất cả</a>
                  </div>                  
                </div>
                <div className="row">
                  <div className="col-12 d-flex d-row gap-10 align-items-center">
                    {products[category.ID].map((product) => (
                      <ProductCard product={product} key={product.ID} />
                    ))}
                  </div>{" "}
                </div>
              </Container>
            )
        )}
      {Object.keys(products).length !== 0 &&
        products["top_sellers"].length !== 0 && (
          <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Sản phẩm bán chạy</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex flex-wrap gap-10 align-items-center">
                {products["top_sellers"].map((product) => (
                  <ProductCard
                    className="gr-3"
                    product={product}
                    key={product.ID}
                  />
                ))}
              </div>
            </div>
          </Container>
        )}
    </>
  );
};

export default Home;
