const typeDefs = `
  type User {
    _id: ID
    email: String
    username: String
    orders: [Order]
    designs: [Design]
  }

  type Design {
    _id: ID
    user: User
    image: String
    createdAt: Float
    hidden: Boolean
  }

  type LineItem {
    design: Design
    item: String
    cut: String
    size: String
    color: String
    price: Float
    quantity: Int
  }

  input LineItemInput {
    design: ID
    image: String
    item: String
    cut: String
    size: String
    color: String
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    user: User
    orderDate: Float
    lineItems: [LineItem]
    status: String
    totalPrice: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    getUser(_id:ID!): User
    getDesign(_id:ID!): Design
    getDesigns(start:Int): [Design]
    checkout(items:[LineItemInput]): Checkout
  }

  type Mutation {
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    addDesign(image:String!): Design
    hideDesign(_id:ID!): Design
    updateUser(username:String!, email:String!): User
    updateBankingInfo(routingNumber:String!, accountNumber:String!): User
    updateOrder(input:[LineItemInput], status:String, _id:ID!): Order
    updatePassword(currentPassword:String!, newPassword:String!): User
  }
`;

module.exports = typeDefs;
