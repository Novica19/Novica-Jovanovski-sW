import React, { Component } from "react";
import { Query } from "react-apollo";
import DropDownList from "../components/UI/DropDownList";
import Products from "../components/Products/Products";
import { GET_CATEGORY, GET_BY_CATEGORY } from "../lib/gql";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    };
  }

  selectedCategoryHandler = (id) => {
    this.setState({
      selectedCategory: id,
    });
  };

  render() {
    return (
      <>
        <Query query={GET_CATEGORY}>
          {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;
            return (
              <DropDownList
                title="All"
                list={data.categories}
                onSelectedCategory={this.selectedCategoryHandler}
              />
            );
          }}
        </Query>

        <Query
          query={GET_BY_CATEGORY}
          variables={{ input: this.state.selectedCategory }}
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
