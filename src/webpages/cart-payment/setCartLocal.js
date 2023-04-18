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

const decreaseInLocalCart = (obj) => {
    let cartContent = getLocalCartContent()
    const exist = cartContent.find((x) => x.ID === obj.ID);
    if (exist.qty === 1) {
        cartContent = cartContent.filter((x) => x.ID !== obj.ID)
    } else {
        cartContent = cartContent.map((x) =>
          x.ID === obj.ID ? { ...exist, qty: exist.qty - 1 } : x
        )
    }
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

const increaseInLocalCart = (obj) => {
  let cartContent = getLocalCartContent()
  const exist = cartContent.find((x) => x.ID === obj.ID);
  if (exist) {
      cartContent = cartContent.map((x) =>
        x.ID === obj.ID ? { ...exist, qty: exist.qty + 1 } : x
      )
  } else {
    cartContent = [...cartContent, { ...obj, qty: 1 }]
  }
  localStorage.setItem("cart", JSON.stringify(cartContent))
}

const removeFromLocalCart = (obj) => {
    let cartContent = getLocalCartContent()
    cartContent = cartContent.filter(x => x.ID !== obj.ID)
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

export {getLocalCartContent, getQuantityByUniqueName, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart}