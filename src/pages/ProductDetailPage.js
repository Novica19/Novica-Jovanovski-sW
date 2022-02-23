import React, { Component } from "react";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import { Query } from "react-apollo";
import { withRouter } from "react-router";
import CartContext from "../store/cart-context";
import { GET_PRODUCT_BY_ID } from "../lib/gql";

class ProductDetailPage extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.match.params.productId,
    };
  }
  render() {
    const currencyContext = this.context.currency;
    return (
      <>
        <Query
          query={GET_PRODUCT_BY_ID}
          variables={{ input: this.state.productId }}
        >
          {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;
            const findCurrencyIndex = data.product.prices.findIndex(
              (price) => price.currency.label === currencyContext
            );
            const dataToSend = {
              id: data.product.id,
              name: data.product.name,
              gallery: data.product.gallery,
              image: data.product.gallery[0],
              description: data.product.description,
              price: data.product.prices[findCurrencyIndex].amount,
              symbol: data.product.prices[findCurrencyIndex].currency.symbol,
              inStock:data.product.inStock,
              brand: data.product.brand,
              attributes: data.product.attributes,
              prices: data.product.prices,
            };
            return <ProductDetails productData={dataToSend} />;
          }}
        </Query>
      </>
    );
  }
}

export default withRouter(ProductDetailPage);
