const { buildSchema } = require('graphql');
/*

*/
exports.schema = buildSchema(`
  type Query {
    getRestrictedUserByAdmin(id: ID!): [RestrictedUser] 
    getRestrictedUserById(id: ID!): RestrictedUser

    getPlayListByRestrictedUser(id: ID!): [PlayList]
    getPlayListByAdminUser(id: ID!): [PlayList]
  }

    type AdminUser {
    _id: ID!
    email: String
    phoneNumber: Int
    pin: Int
    name: String
    lastName: String
    age: Int
    country: String
    dateBirth: String
  }

    type RestrictedUser {
    _id: ID!
    name: String
    age: Int
    pin: Int
    avatar: String
    adminId: AdminUser
  }

  type PlayList {
    _id: ID!
    name: String!
    restrictedUsers: [RestrictedUser!]!
    adminId: AdminUser!
  }

  `);