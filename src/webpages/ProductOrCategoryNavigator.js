import React from 'react';
import ShowAllByCategory from './product-filter/ProductFilterPage';
import Product from './product/Product';

export default function ProductOrCategoryNavigator () {
    const categoriesList = ["sach-trong-nuoc", "sach-ngoai-quoc", "van-phong-pham", "do-choi", "hang-luu-niem"]
    const getPathNameInUrl = (pathname) => {
        const lastSlashIndex = pathname.lastIndexOf('/')
        return pathname.substr(lastSlashIndex + 1)
    }   
    const getPathName = () => {
        let windowUrl = new URL(window.location.href)
        let pathname = windowUrl.pathname
        return getPathNameInUrl(pathname)
    }
    
    const isCategory = () => {
        const pathname = getPathName()
        return categoriesList.includes(pathname)
    }
     
    return (
        <>
            {isCategory() && (
                <ShowAllByCategory />
            )}
            {!isCategory() && (
                <Product />
            )}
        </>
    )
}