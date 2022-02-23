import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query getCategory {
    categories {
      name
    }
  }
`;

export const GET_BY_CATEGORY = gql`
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

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($input: String!) {
    product(id: $input) {
      id
      name
      brand
      gallery
      description
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
    }
  }
`;
export const GET_CURRENCIES = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
