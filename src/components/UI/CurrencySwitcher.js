import React, { Component } from "react";
import styles from "./CurrencySwitcher.module.css";
import arrow from "../../assets/vector-arrow.svg";
import CartContext from "../../store/cart-context";
class CurrencySwitcher extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      headerSymbol: "$",
    };
  }
  selectCurrencyHandler = (e, currency) => {
    this.context.currencyChange(currency.id, currency.symbol);
    this.setState({
      headerSymbol: currency.symbol,
    });
    this.props.onClick();
  };
  render() {
    return (
      <>
        <button className={styles.button} onClick={this.props.onClick}>
          <div className={styles.symbol}>{this.state.headerSymbol}</div>
          <div className={styles.imgContainer}>
            <img
              src={arrow}
              alt="arrow"
              className={this.props.currencyIsShown ? styles.img : ""}
            />
          </div>
        </button>
        {this.props.currencyIsShown && (
          <div className={styles.currencyList}>
            {this.props.currencyList.map((currency) => (
              <button
                className={styles.currency}
                key={currency.id}
                onClick={(e) => this.selectCurrencyHandler(e, currency)}
              >
                {currency.symbol} {currency.title}
              </button>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default CurrencySwitcher;
