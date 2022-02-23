import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from './ProductsPage.module.css'

import Products from "../components/Products/Products";
import { GET_BY_CATEGORY } from "../lib/gql";

class ProductsPage extends Component {
  render() {
    const {selectedCategory}=this.props;
    return (
      <>
        <h1 className={styles.heading}>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>
        <Query
          query={GET_BY_CATEGORY}
          variables={{ input: this.props.selectedCategory }}
        >
          {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;
            return <Products productsData={data.category.products} />;
          }}
        </Query>
      </>
    );
  }
}

export default ProductsPage;
