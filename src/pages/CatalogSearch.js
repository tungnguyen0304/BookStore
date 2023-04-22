import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";

export default function CatalogSearch () {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");    

    useEffect(() => {
        axios.get(`http://localhost/api/products.php`, {
            params: {
                q: query,
                page: page
            }
        })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [location.search, page]);

    return (
        <>
            <Meta title={"Kết quả tìm kiếm cho " + query} />
            <BreadCrumb title={"Kết quả tìm kiếm cho " + query} />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="products-list pb-5">
                    <div className="d-flex gap-10 flex-wrap">
                        {products.map(item => 
                            <ProductCard key={item.ID} product={item}/>
                        )}
                    </div>
                </div>        
            </Container>
        </>
    )
}