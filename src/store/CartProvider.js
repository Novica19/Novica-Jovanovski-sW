import React, { Component } from "react";
import CartContext from "./cart-context";

class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalAmount: 0,
      currency: "USD",
      symbol:"$"
    };
  }
  addItemToCartHandler = (item) => {
    const findCurrencyIndex = item.prices.findIndex(
      (price) => price.currency.label === this.state.currency
    );
    const updatedTotalAmount =
      this.state.totalAmount + item.prices[findCurrencyIndex].amount;

    const findExistingItemIndex = this.state.items.findIndex(
      (stateItem) => stateItem.id === item.id
    );

    const existingItem = this.state.items[findExistingItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
      };
      updatedItems = [...this.state.items];
      updatedItems[findExistingItemIndex] = updatedItem;
    } else {
      updatedItems = this.state.items.concat({
        ...item,
        amount: 1,
      });
    }
    this.setState({
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    });
    const data = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      currency: this.state.currency,
      symbol:this.state.symbol
    };
    localStorage.setItem("LocalContext", JSON.stringify(data));
  };

  removeItemFromCartHandler = (id) => {
    const findExistingItemIndex = this.state.items.findIndex(
      (item) => item.id === id
    );
    const existingItem = this.state.items[findExistingItemIndex];
    const findCurrencyIndex = existingItem.prices.findIndex(
      (price) => price.currency.label === this.state.currency
    );
    let updatedTotalAmount =
      this.state.totalAmount - existingItem.prices[findCurrencyIndex].amount;

    let updatedItems;
    if (updatedTotalAmount < 0) {
      updatedTotalAmount = 0;
    }
    if (existingItem.amount === 1) {
      updatedItems = this.state.items.filter((item) => item.id !== id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...this.state.items];
      updatedItems[findExistingItemIndex] = updatedItem;
    }
    this.setState({
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    });
    const data = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      currency: this.state.currency,
      symbol:this.state.symbol
    };
    localStorage.setItem("LocalContext", JSON.stringify(data));
  };
  persistStateHandler = (data) => {
    this.setState({
      items: data.items,
      totalAmount: data.totalAmount,
      currency: this.state.currency,
      symbol:this.state.symbol,
    });
  };
  currencyChangeHandler = (id,symbol) => {
    if (this.state.items.length !== 0) {
      let updatedTotalAmount = 0;
      const tempItems = [...this.state.items];
      tempItems.forEach((item) => {
        item.prices.forEach((price) => {
          if (price.currency.label === id) {
            updatedTotalAmount =
              updatedTotalAmount + price.amount * item.amount;
          }
        });
      });
      this.setState({
        totalAmount: updatedTotalAmount,
        currency: id,
        symbol: symbol
      });
    } else {
      this.setState({
        currency: id,
        symbol:symbol
      });
    }
  };
  removeAllFromCartHandler=()=>{
    this.setState({
      items: [],
      totalAmount: 0,
    })
    const data = {
      items: [],
      totalAmount: 0,
      currency: this.state.currency,
      symbol:this.state.symbol
    };
    localStorage.setItem("LocalContext", JSON.stringify(data));
  }
  render() {
    const cartContext = {
      items: this.state.items,
      totalAmount: this.state.totalAmount,
      currency: this.state.currency,
      symbol:this.state.symbol,
      addItemToCart: this.addItemToCartHandler,
      removeItemFromCart: this.removeItemFromCartHandler,
      persistState: this.persistStateHandler,
      currencyChange: this.currencyChangeHandler,
      removeAllFromCart:this.removeAllFromCartHandler
    };
    return (
      <CartContext.Provider value={cartContext}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
