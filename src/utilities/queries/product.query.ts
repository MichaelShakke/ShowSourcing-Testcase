import gql from 'graphql-tag';

//All product queries are declared here
export class ProductQuery {
  static getProductsList = gql`
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
}
