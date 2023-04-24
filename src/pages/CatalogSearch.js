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
    const [remainQty, setRemainQty] = useState(0)      
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
                setProducts(prev => [...prev, ...response.data.products])
                setRemainQty(response.data.remain_qty)
            })
            .catch(error => {
                console.log(error);
            });
    }, [page]);

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
                {remainQty > 0 && (
                <div className="text-center">
                    <button 
                    className="btn btn-primary btn-md" 
                    onClick={() => setPage(prev => prev + 1)}
                    > 
                        Xem thêm {remainQty} sản phẩm
                    </button>
                </div>
                )}                    
            </div>        
        </Container>
        </>
    )
}