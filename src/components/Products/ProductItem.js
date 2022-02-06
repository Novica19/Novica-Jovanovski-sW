import React, { Component } from "react";
import styles from "./ProductItem.module.css";
import Card from "../UI/Card";
import CartIcon from "../Cart/CartIcon";
import { Link } from "react-router-dom";
class ProductItem extends Component {
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

  render() {
    return (
      <Card>
        <li
          onMouseEnter={this.mouseOverHandler}
          onMouseLeave={this.mouseOutHandler}
          className={`${styles.card} ${
            !this.props.product.inStock && styles.notInStock
          }`}
        >
          {" "}
          <Link
            to={"/products/" + this.props.id}
            className={`${styles.link} ${
              !this.props.product.inStock && styles.disabled
            }`}
          >
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={ this.props.product.image}
                alt={this.props.product.description}
              />

              {this.state.isHovering && (
                <button className={styles.cartIcon}>
                  <CartIcon />
                </button>
              )}
              {!this.props.product.inStock && <h1>OUT OF STOCK</h1>}
            </div>

            <div className={styles.description}>
              <p>{ this.props.product.name}</p>
              <p>
                {this.props.product.symbol} {this.props.product.price}
              </p>
            </div>
          </Link>
        </li>
      </Card>
    );
  }
}

export default ProductItem;
