import React, { Component } from "react";
import HeaderCartButton from "../Cart/HeaderCartButton";
import styles from "./MainNav.module.css";
import logo from "../../assets/a-logo.svg";
import { withRouter } from "react-router-dom";
import { GET_CURRENCIES, } from "../../lib/gql";
import { Query } from "react-apollo";

import CurrencySwitcher from "./CurrencySwitcher";

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:this.props.categoryList,
    };
  }
  popClickedHandler = (e, categorySent) => {
    this.setState((prevState) => {
      const category = [...prevState.category];
      const index = category.findIndex((p) => p.name === categorySent.name);
      category[index].clicked = !category[index].clicked;
      const tempId = category[index].name;
      category.forEach((c) => {
        if (c.name !== tempId) {
          c.clicked = false;
        }
      });
      console.log(category)
      return { category };
    },
    () => this.props.onSelectedCategory(categorySent.name));
  };
  onLogoClick = () => {
    this.props.history.push("/products");
  };
  render() {
    return (
      <header className={styles.header}>
        <div>
          <nav className={styles.nav}>
            <ul>
              {this.state.category.map((category) => (
                <li key={category.name}>
                  <button
                    className={`${styles.button} ${
                      category.clicked && styles.clicked
                    }`}
                    onClick={(e) => this.popClickedHandler(e, category)}
                  >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <button className={styles.button} onClick={this.onLogoClick}>
            <img src={logo} alt="logo" />
          </button>
        </div>
        <div className={styles.navRight}>
          <Query query={GET_CURRENCIES}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;
              return (
                <CurrencySwitcher
                  currencyList={data.currencies}
                  onClick={this.props.onShowCurrency}
                  currencyIsShown={this.props.currencyIsShown}
                  onHideCart={this.props.onHideCart}
                />
              );
            }}
          </Query>

          <HeaderCartButton onClick={this.props.onShowCart} />
        </div>
      </header>
    );
  }
}

export default withRouter(MainNav);
