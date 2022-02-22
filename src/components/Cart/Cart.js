import React, { Component } from "react";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
class Cart extends Component {
  static contextType = CartContext;
  render() {
    const items = this.context.items;
    const cartItems = (
      <ul className={styles.cartItems}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onCart={true}
            onCartModal={false}
          />
        ))}
      </ul>
    );
    const numItems = items.length;
    return (
      <div className={styles.container}>
        <h1>CART</h1>
        {numItems === 0 ? (
          <h2>Nothing in your cart</h2>
        ) : (
          <div className={styles.content}>{cartItems}</div>
        )}
      </div>
    );
  }
}

export default Cart;
