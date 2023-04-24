import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";

function getIntialQuery(location) {
    const searchParams = new URLSearchParams(location.search);
    const initialQuery = searchParams.get("q"); 
    return initialQuery
}

export default function CatalogSearch () {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    const location = useLocation();
    const [remainQty, setRemainQty] = useState(0)      
    const [query, setQuery] = useState(getIntialQuery(location))

    useEffect(() => {      
        const searchParams = new URLSearchParams(location.search);
        let newQuery = searchParams.get("q");    
        if (newQuery !== query) {
            setQuery(newQuery)
            setPage(1)
            setProducts([])
        } else {
            // query remains the same
            newQuery = query
        }
        axios.get(`http://localhost/api/products.php`, {
            params: {
                q: newQuery,
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
    }, [page, location.search]); // run whenever page & search param change

    return (
        <>
        <Meta title={"Kết quả tìm kiếm cho " + query} />
        <BreadCrumb title={"Kết quả tìm kiếm cho " + query} />
        <Container class1="store-wrapper home-wrapper-2 py-5">
            {products.length !== 0 ? (
            <div className="products-list pb-5">
                <div className="d-flex flex-wrap">
                    {products.map(product => 
                    <div key={product.ID} className="col-6 col-sm-4 col-md-3 mb-1 p-1">
                        <ProductCard product={product}/>
                    </div>
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
            ) : (
                <div className='text-center lead'>Không có sản phẩm nào</div>
            )}
        </Container>
        </>
    )
}