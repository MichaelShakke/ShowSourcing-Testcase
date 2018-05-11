import gql from 'graphql-tag';

//All user queries are declared here
export class CategoryQuery {
//For testing purposes we use a custom id, with session we would use the current one
  static getCategories = gql`
        {
          categories {
            name
          }
        }
      `
}
