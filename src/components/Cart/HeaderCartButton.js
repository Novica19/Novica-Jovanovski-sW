import React, { Component } from "react";
import CartIcon from "./CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

class HeaderCartButton extends Component {
  static contextType = CartContext;

  render() {
    const numCartItems = this.context.items.length;
    return (
      <button className={styles.button} onClick={this.props.onClick}>
        <div className={styles.wrapper}>
          <span className={styles.icon}>
            <CartIcon />
          </span>
          {numCartItems > 0 ? (
            <span className={styles.badge}>{numCartItems}</span>
          ) : (
            ""
          )}
        </div>
      </button>
    );
  }
}

export default HeaderCartButton;
