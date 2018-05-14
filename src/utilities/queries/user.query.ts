import gql from 'graphql-tag';

//All user queries are declared here
export class UserQuery {
//For testing purposes we use a custom id, with session we would use the current one
  static query_getUserById = gql`
        {
          user(id: "6c0b95d4-5e77-4caa-b826-b471e700d1d7") {
            id
            firstName
            lastName
            email
          }
        }
      `
}
