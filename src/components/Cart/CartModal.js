import React, { Component } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./CartModal.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { withRouter } from "react-router-dom";
class CartModal extends Component {
  static contextType = CartContext;
  viewBagHandler = () => {
    this.props.history.replace("/cart");
    this.props.onHideCart();
  };
  checkOutHandler = () => {
    this.context.removeAllFromCart();
    this.props.history.replace("/");
    this.props.onHideCart();
  };
  render() {
    const cartItems = (
      <ul className={styles.cartItems}>
        {this.context.items.map((item) => (
          <CartItem key={item.id} item={item} onCartModal={true} />
        ))}
      </ul>
    );
    const totalAmount = `${this.context.totalAmount.toFixed(2)}`;
    const totalSymbol = this.context.symbol;
    const numItems = this.context.items.length;
    return (
      <Modal onHideCart={this.props.onHideCart}>
        <div className={styles.container}>
          <div className={styles.top}>
            <span>My Bag</span>
            <span>, {numItems} items</span>
          </div>
          {numItems === 0 ? (
            <h1>Nothing in your Cart</h1>
          ) : (
            <div>
              <div className={styles.content}>{cartItems}</div>
              <div className={styles.totalAmount}>
                <div>Total</div>
                <div>
                  {" "}
                  {totalSymbol}
                  {totalAmount}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.viewBag}
                  onClick={this.viewBagHandler}
                >
                  VIEW BAG
                </button>

                <button
                  className={styles.checkOut}
                  onClick={this.checkOutHandler}
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

export default withRouter(CartModal);
