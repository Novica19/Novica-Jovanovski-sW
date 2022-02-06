import React, { Component } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import CartContext from "../../store/cart-context";
class Products extends Component {
  static contextType = CartContext;

  render() {
    const currencyContext= this.context.currency;

    return (
      <div className={styles.wrapper}>
        <ul className={styles.products}>
          {this.props.productsData.map((product) => {
            const findCurrencyIndex = product.prices.findIndex(
              (price) => price.currency.label ===  currencyContext
            );

            const dataToSend = {
              name: product.name,
              image: product.gallery[0],
              description: product.description,
              price: product.prices[findCurrencyIndex].amount,
              symbol: product.prices[findCurrencyIndex].currency.symbol,
              inStock: product.inStock,
            };
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                product={dataToSend}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Products;
