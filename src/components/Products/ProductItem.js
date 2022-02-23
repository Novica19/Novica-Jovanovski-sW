import React, { Component } from "react";
import styles from "./ProductItem.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.svg";
import CartContext from "../../store/cart-context";
class ProductItem extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
  }
  mouseOverHandler = () => {
    this.setState(() => ({
      isHovering: true,
    }));
  };

  mouseOutHandler = () => {
    this.setState(() => ({
      isHovering: false,
    }));
  };
  addItemToCartHandler = () => {
    if (this.props.product.inStock) {
      let preDefAtt = [];
      this.props.product.attributes.forEach((att) => {
        preDefAtt.push({
          id: att.id,
          selectedItem: att.items[0],
          attributeItems: att.items,
          type: att.type,
        });
      });
      let attributesID = "";
      preDefAtt.forEach((att) => {
        attributesID = attributesID + att.selectedItem.id;
      });

      let numID = 0;
      let array = Array.from(attributesID);

      array.forEach((c) => {
        numID = numID + c.charCodeAt(0);
      });

      const itemToCart = {
        id: this.props.product.id + numID,
        name: this.props.product.name,
        brand: this.props.product.brand,
        image: this.props.product.image,
        gallery: this.props.product.gallery,
        price: this.props.product.price,
        attributes: preDefAtt,
        prices: this.props.product.prices,
      };
      this.context.addItemToCart(itemToCart);
    } else {
      return;
    }
  };
  render() {
    const { inStock, image, description, name, symbol, price, id } =
      this.props.product;
    const sendTo = {
      pathname: "/products/" + id,
      inStock: inStock,
    };
    return (
      <Card>
        <li
          onMouseEnter={this.mouseOverHandler}
          onMouseLeave={this.mouseOutHandler}
          className={`${styles.card} ${!inStock && styles.notInStock}`}
        >
          {" "}
          <div className={styles.imageContainer}>
            <Link to={sendTo} className={styles.link}>
              <img className={styles.image} src={image} alt={description} />
            </Link>

            {this.state.isHovering && (
              <button
                className={`${styles.cartIcon} ${
                  !inStock && styles.notInStock
                }`}
                onClick={this.addItemToCartHandler}
              >
                <img src={emptyCart} alt="emptyCart" />
              </button>
            )}
            {!inStock && <h1>OUT OF STOCK</h1>}
          </div>
          <Link to={sendTo} className={styles.link}>
            <div className={styles.description}>
              <p>{name}</p>
              <p>
                {symbol}
                {price}
              </p>
            </div>
          </Link>
        </li>
      </Card>
    );
  }
}

export default ProductItem;
