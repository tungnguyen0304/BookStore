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
                  <div className="col-12">
                    <h3 className="section-heading">{category.name}</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex d-row gap-15">
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
              {products["top_sellers"].map((product) => (
                <ProductCard product={product} key={product.ID} />
              ))}
            </div>
          </Container>
        )}
    </>
  );
};

export default Home;
