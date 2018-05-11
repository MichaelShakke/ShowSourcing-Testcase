//Global variables are declared here

import gql from 'graphql-tag';

export class GlobalInterface {
   static img_urls = {
     "s": "https://files.showsourcing.com/s/",
     "m": "https://files.showsourcing.com/m/",
     "l": "https://files.showsourcing.com/l/",
     "xl": "https://files.showsourcing.com/xl/"
    }

    static queryProducts = gql`
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
