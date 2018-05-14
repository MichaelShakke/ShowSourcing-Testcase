import gql from 'graphql-tag';

//All product queries are declared here
export class ProductQuery {
  static query_allProducts = gql`
  {
    products {
      id
      name
      images {
        id
        fileName
        imageType
      }
      category {
        id
        name
      }
      supplier {
        id
        name
        fullName
      }
      status {
        id
        name
        final
        color
      }
      price {
        id
        currency
        value
      }
    }
  }
  `

  static subscription_allProducts = gql`
  subscription {
    products {
      id
      name
      images {
        id
        fileName
        imageType
      }
      category {
        id
        name
      }
      supplier {
        id
        name
        fullName
      }
      status {
        id
        name
        final
        color
      }
      price {
        id
        currency
        value
      }
    }
  }
  `

  static mutation_category = gql`
    mutation productCategoryUpdate ($idp: ID!, $idc: ID!){
    	updateProduct(input : {
        id: $idp,
        category: {id: $idc}
      }) {
    	  id
        name
        category {
          id
          name
        }
    	}
    }
  `
}
