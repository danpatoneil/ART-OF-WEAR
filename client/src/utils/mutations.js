import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;


export const ADD_USER = gql`
mutation addUser($username: String!, $addUserEmail2: String!, $addUserPassword2: String!) {
  addUser(username: $username, email: $addUserEmail2, password: $addUserPassword2) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;
export const ADD_DESIGN = gql`
mutation AddDesign($image: String!) {
  addDesign(image: $image) {
    _id
  }
}
`;
export const HIDE_DESIGN = gql`
mutation HideDesign($id: ID!) {
  hideDesign(_id: $id) {
    hidden
  }
}
`;
export const UPDATE_USER = gql`
mutation UpdateUser($updateUserUsername2: String, $updateUserEmail2: String, $updateUserPassword2: String) {
  updateUser(username: $updateUserUsername2, email: $updateUserEmail2, password: $updateUserPassword2) {
    _id
  }
}
`;
export const UPDATE_BANKING_INFO = gql`
mutation UpdateBankingInfo($routingNumber: String!, $accountNumber: String!) {
  updateBankingInfo(routingNumber: $routingNumber, accountNumber: $accountNumber) {
    _id
  }
}
`;
export const UPDATE_ORDER = gql`
mutation UpdateOrder($id: ID!, $input: [LineItemInput], $status: String) {
  updateOrder(_id: $id, input: $input, status: $status) {
    _id
  }
}
`;

