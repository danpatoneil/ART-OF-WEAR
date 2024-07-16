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
  }

  type LineItem {
    design: ID
    item: String
    cut: String
    size: String
    color: String
    price: Float
  }

  type Order {
    _id: ID
    orderDate: String
    lineItems: [LineItem]
    status: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    getUser: User
  }

  type Mutation {
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    addDesign(image:String!): Design
    deleteDesign(image:String!): Design
    createOrder: Order
  }
`;

module.exports = typeDefs;
