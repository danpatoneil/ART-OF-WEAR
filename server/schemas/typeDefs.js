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
    createdAt: String
    hidden: Boolean
  }

  type LineItem {
    design: ID
    item: String
    cut: String
    size: String
    color: String
    price: Float
    quantity: Int
  }

  input LineItemInput {
    design: ID
    item: String
    cut: String
    size: String
    color: String
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    orderDate: String
    lineItems: [LineItem]
    status: String
    totalPrice: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    getUser(_id:ID!): User
    getDesign(_id:ID!): Design
  }

  type Mutation {
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    addDesign(image:String!): Design
    hideDesign(_id:ID!): Design
    createOrder(input:[LineItemInput]): Order
    updateUser(username:String, email:String, password:String): User
    updateBankingInfo(routingNumber:String!, accountNumber:String!): User
    updateOrder(input:[LineItemInput], status:String, _id:ID!): Order
  }
`;

module.exports = typeDefs;
