import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  currency: "USD",
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  persistState:(data) =>{},
  currencyChange:(id)=>{},
  removeAllFromCart:()=>{}
});

export default CartContext;
