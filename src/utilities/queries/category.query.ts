import gql from 'graphql-tag';

//All user queries are declared here
export class CategoryQuery {
//For testing purposes we use a custom id, with session we would use the current one
  static query_allCategories = gql`
        {
          categories {
            name
          }
        }
      `
    static subscription_allCategories = gql`
    subscription {
      categories {
        name
      }
    }
    `
}
