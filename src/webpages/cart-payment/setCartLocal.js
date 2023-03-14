const getLocalCartContent = () => {
    let cartContent = JSON.parse(localStorage.getItem("cart"))
    if (cartContent === null) {
        cartContent = []
        localStorage.setItem("cart", JSON.stringify(cartContent));
    } 

    return cartContent
}

const decreaseInLocalCart = (obj) => {
    let cartContent = getLocalCartContent()
    const exist = cartContent.find((x) => x.id === obj.id);
    if (exist.qty === 1) {
        cartContent = cartContent.filter((x) => x.id !== obj.id)
    } else {
        cartContent = cartContent.map((x) =>
          x.id === obj.id ? { ...exist, qty: exist.qty - 1 } : x
        )
    }
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

const increaseInLocalCart = (obj) => {
  let cartContent = getLocalCartContent()
  const exist = cartContent.find((x) => x.id === obj.id);
  if (exist) {
      cartContent = cartContent.map((x) =>
        x.id === obj.id ? { ...exist, qty: exist.qty + 1 } : x
      )
  } else {
    cartContent = [...cartContent, { ...obj, qty: 1 }]
  }
  localStorage.setItem("cart", JSON.stringify(cartContent))
}

const removeFromLocalCart = (obj) => {
    let cartContent = getLocalCartContent()
    cartContent = cartContent.filter(x => x.id !== obj.id)
    localStorage.setItem("cart", JSON.stringify(cartContent))
}

export {getLocalCartContent, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart}