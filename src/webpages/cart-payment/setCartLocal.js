const getLocalCartContent = () => {
    let cartContent = JSON.parse(localStorage.getItem("cart"))
    if (cartContent === null) {
        cartContent = []
        localStorage.setItem("cart", JSON.stringify(cartContent));
    } 

    return cartContent
}

const getQuantityByUniqueName = unique_name => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // retrieve cart items from localStorage
  const item = cart.find(item => item.unique_name === unique_name); // find the item with the matching unique_name
  return item ? item.qty : 0; // return the quantity if the item was found, otherwise 0
}

const decreaseInLocalCart = (product) => {
    let cartContent = getLocalCartContent()
    const exist = cartContent.find((x) => x.ID === product.ID);
    if (exist.qty === 1) {
        cartContent = cartContent.filter((x) => x.ID !== product.ID)
    } else {
        cartContent = cartContent.map((x) =>
          x.ID === product.ID ? { ...exist, qty: exist.qty - 1 } : x
        )
    }
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

const increaseInLocalCart = (product) => {
  let cartContent = getLocalCartContent()
  const exist = cartContent.find((x) => x.ID === product.ID);
  if (exist) {
      cartContent = cartContent.map((x) =>
        x.ID === product.ID ? { ...exist, qty: exist.qty + 1 } : x
      )
  } else {
    cartContent = [...cartContent, { ...product, qty: 1 }]
  }
  localStorage.setItem("cart", JSON.stringify(cartContent))
}

const removeFromLocalCart = (product) => {
    let cartContent = getLocalCartContent()
    cartContent = cartContent.filter(x => x.ID !== product.ID)
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

export {getLocalCartContent, getQuantityByUniqueName, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart}