import { gql } from '@apollo/client';

export const GET_ME = gql`
query getUser {
  me {
    _id
    email
    username
  }
}
`;

export const GET_USER_DESIGNS = gql`
query getUserDesigns{
  me {
    _id
    username
    designs {
      _id
      image
      createdAt
      hidden
    }
  }
}
`;

export const GET_USER_ORDERS = gql`
query getUserOrders{
  me {
    _id
    orders {
      _id
      orderDate
      status
      totalPrice
      lineItems {
        item
        cut
        size
        color
        price
        quantity
        design {
          image
        }
      }
    }
  }
}
`;

export const GET_DESIGN = gql`
query getDesign($id: ID!){
  getDesign(_id: $id) {
    image
    createdAt
    user {
      username
      _id
    }
  }
}
`;

export const GET_DESIGN_LIST = gql`
query getDesignList($start: Int) {
  getDesigns(start: $start) {
    _id
    user {
      username
      _id
    }
    image
    createdAt
  }
}
`;

export const CHECKOUT = gql`
query Checkout($items: [LineItemInput]) {
  checkout(items: $items) {
    session
  }
}
`;

export const GET_DESIGNS_OF_USER = gql`
query GetUser($id: ID!) {
  getUser(_id: $id) {
    username
    designs {
      image
      _id
      createdAt
      hidden
    }
  }
}
`;

