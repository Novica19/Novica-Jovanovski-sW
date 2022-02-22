import React, { Component } from "react";
import styles from "./CartItem.module.css";
import AttributeItem from "../Products/ProductDetails/AttributeItem";
import CartContext from "../../store/cart-context";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";

class CartItem extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }
  addItemHandler = (item) => {
    this.context.addItemToCart(item);
  };
  removeItemHandler = (id) => {
    this.context.removeItemFromCart(id);
  };
  prevImage = (galleryLength) => {
    if (this.state.currentImage === 0) {
      this.setState({
        currentImage: galleryLength - 1,
      });
    } else {
      this.setState((prevState) => ({
        currentImage: prevState.currentImage - 1,
      }));
    }
  };
  nextImage = (galleryLength) => {
    if (this.state.currentImage === galleryLength - 1) {
      this.setState({
        currentImage: 0,
      });
    } else {
      this.setState((prevState) => ({
        currentImage: prevState.currentImage + 1,
      }));
    }
  };
  render() {
    const currencyContext = this.context.currency;

    const { brand, name, prices, attributes, id, amount, gallery } =
      this.props.item;

    const galleryLength = gallery.length;

    const findCurrencyIndex = prices.findIndex(
      (price) => price.currency.label === currencyContext
    );

    const symbol = prices[findCurrencyIndex].currency.symbol;
    const price = prices[findCurrencyIndex].amount;
    const attItems = (
      <ul className={styles.attItems}>
        {attributes.map((att) => (
          <AttributeItem
            key={att.id}
            item={att.selectedItem}
            att={{ type: att.type, id: att.id }}
            clicked={att.selectedItem.id}
            onCart={true}
            onCartModal={this.props.onCartModal}
          />
        ))}
      </ul>
    );

    return (
      <li className={styles.container} key={id}>
        <div className={styles.left}>
          <div
            className={`${styles.brand} ${
              this.props.onCartModal && styles.onModal
            }`}
          >
            <span>{brand}</span>
            <span>{name}</span>
          </div>
          <div
            className={`${styles.price} ${
              this.props.onCartModal && styles.onModal
            }`}
          >
            <div>
              <h3>
                {symbol}
                {price}
              </h3>
            </div>
          </div>
          <div>{attItems}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.actions}>
            <div>
              <button onClick={(e) => this.addItemHandler(this.props.item)}>
                +
              </button>
            </div>
            <div className={styles.amount}>{amount}</div>
            <div>
              <button onClick={(e) => this.removeItemHandler(id)}>-</button>
            </div>
          </div>
          <div>
            <div className={styles.imageContainer}>
              {gallery.map((image, index) => {
                return (
                  <div
                    className={`${styles.slide} ${
                      index === this.state.currentImage && styles.active
                    }`}
                    key={index}
                  >
                    {" "}
                    {!this.props.onCartModal && (
                      <button
                        onClick={(e) => this.prevImage(galleryLength)}
                        className={styles.leftArrow}
                      >
                        <img src={leftArrow} alt="leftArrow" />
                      </button>
                    )}
                    {index === this.state.currentImage && (
                      <img src={image} alt="" className={styles.image} />
                    )}
                    {!this.props.onCartModal && (
                      <button
                        onClick={(e) => this.nextImage(galleryLength)}
                        className={styles.rightArrow}
                      >
                        <img src={rightArrow} alt="rightArrow" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
