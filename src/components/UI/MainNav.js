import React, { Component } from "react";
import HeaderCartButton from "../Cart/HeaderCartButton";
import styles from "./MainNav.module.css";
import logo from "../../assets/a-logo.svg";
import { withRouter } from "react-router-dom";
import { GET_CURRENCIES } from "../../lib/gql";
import { Query } from "react-apollo";

import CurrencySwitcher from "./CurrencySwitcher";

class MainNav extends Component {
  constructor() {
    super();
    this.state = {
      population: [
        { id: "WOMEN", clicked: false },
        { id: "MEN", clicked: false },
        { id: "KIDS", clicked: false },
      ],
    };
  }
  popClickedHandler = (e, pop) => {
    this.setState((prevState) => {
      const population = [...prevState.population];
      const index = population.findIndex((p) => p.id === pop.id);
      population[index].clicked = !population[index].clicked;
      const tempId = population[index].id;
      population.forEach((pop) => {
        if (pop.id !== tempId) {
          pop.clicked = false;
        }
      });
      return { population };
    });
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
              {this.state.population.map((pop) => (
                <li key={pop.id}>
                  <button
                    className={`${styles.button} ${
                      pop.clicked && styles.clicked
                    }`}
                    onClick={(e) => this.popClickedHandler(e, pop)}
                  >
                    {pop.id}
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
