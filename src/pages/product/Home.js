import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Container from "../../components/Container";
import Meta from "../../components/Meta";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  height: "300px",
  // height: "30vh",
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
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Meta title={"Trang chủ"} />
        <Container class1="home-wrapper-2 py-5">
          <div className="row">
            {" "}
            <div className="col-sm-12 col-md-6 my-auto">
              <Slide>
                {slideImages.map((slideImage, index) => (
                  <div
                    key={index}
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${slideImage.url})`,
                    }}
                  ></div>
                ))}
              </Slide>
            </div>
            <div className="col-sm-12 col-md-6  my-auto">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
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

      {/* <div className="home-wrapper-1 py-5">
          <div className="row">
            <div className="col-sm-12 col-md-6">
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
            <div className="col-sm-12 col-md-6 my-auto">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative text-center">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {categoriesList.length !== 0 &&
        Object.keys(products).length !== 0 &&
        categoriesList.map(
          (category, index) =>
            products[category.ID].length !== 0 && (
              <Container key={index} class1="featured-wrapper py-5 home-wrapper-2">
                {/* <div className="container"> */}
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-8">
                      <h3 className="section-heading">{category.name}</h3>
                    </div>
                    <div className="col-sm-4 col-md-6 col-4 d-flex justify-content-end align-items-center">
                      <a href={"/category/" + category.unique_name}>
                        Xem tất cả
                      </a>
                    </div>
                  </div>
                  <div className="row flex-wrap align-items-stretch">
                    {products[category.ID].map((product) => (
                      <div key={product.ID} className="col-6 col-sm-4 col-md-3 mb-1 p-1">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                {/* </div> */}
              </Container>
            )
        )}

      {Object.keys(products).length !== 0 &&
        products["top_sellers"].length !== 0 && (
          <Container class1="popular-wrapper py-5 home-wrapper-2">
            {/* <div className="container"> */}
              <div className="row">
                <div className="col-sm-12 col-md-6 col-8">
                  <h3 className="section-heading">Sản phẩm bán chạy</h3>
                </div>
              </div>
              <div className="row">
                {products["top_sellers"].map((product) => (
                  <div key={product.ID} className="col-6 col-sm-4 col-md-3 mb-1 p-1">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            {/* </div> */}
          </Container>
        )}
    </>
  );
};

export default Home;
