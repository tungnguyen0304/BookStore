const formatPrice = price => {
    let parts = price.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
}  



export {formatPrice}