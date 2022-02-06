import "./App.css";
import React, { Component } from "react";
import MainNav from "./components/UI/MainNav";
import ProductsPage from "./pages/ProductsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";

import CartModal from "./components/Cart/CartModal";
import CartPage from "./pages/CartPage";
import CartContext from "./store/cart-context";

class App extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      cartIsShown: false,
      currencyIsShown: false,
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("LocalContext"))) {
      const data = JSON.parse(localStorage.getItem("LocalContext")) ?? [];
      this.context.persistState(data);
    }
  }
  showCartHandler = () => {
    this.setState((prevState) => {
      const cartState = {
        cartIsShown: !prevState.cartIsShown,
        currencyIsShown: false,
      };
      return cartState;
    });
  };
  hideCartHandler = () => {
    this.setState({
      cartIsShown: false,
    });
  };
  showCurrencyHandler = (curr) => {
    this.setState((prevState) => {
      const currencyState = {
        cartIsShown: false,
        currencyIsShown: !prevState.currencyIsShown,
      };
      return currencyState;
    });
  };

  render() {
    return (
      <>
        <MainNav
          onShowCart={this.showCartHandler}
          onShowCurrency={this.showCurrencyHandler}
          currencyIsShown={this.state.currencyIsShown}
        />
        <main>
          {this.state.cartIsShown && (
            <CartModal onHideCart={this.hideCartHandler} />
          )}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/products" />
            </Route>
            <Route path="/products" exact>
              <ProductsPage />
            </Route>

            <Route path="/products/:productId">
              <ProductDetailPage />
            </Route>
            <Route path={"/cart"}>
              <CartPage />
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
