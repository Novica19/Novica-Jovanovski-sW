import { gql } from "@apollo/client";
import React, { Component } from "react";
import { Query } from "react-apollo";
import DropDownList from "../components/UI/DropDownList";
import Products from "../components/Products/Products";

const GET_BY_CATEGORY = gql`
  query getByCategory($input: String!) {
    category(input: { title: $input }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        brand
      }
    }
  }
`;
class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: "all",
          title: "All",
          selected: false,
          key: "categories",
        },
        {
          id: "clothes",
          title: "Clothes",
          selected: false,
          key: "categories",
        },
        {
          id: "tech",
          title: "Technology",
          selected: false,
          key: "location",
        },
      ],
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
        <DropDownList
          title="All"
          list={this.state.categories}
          onSelectedCategory={this.selectedCategoryHandler}
        />
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
