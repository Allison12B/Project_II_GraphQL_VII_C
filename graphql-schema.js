const { buildSchema } = require('graphql');
/*

*/
exports.schema = buildSchema(`
  type Query {
    getRestrictedUserByAdmin: [RestrictedUser] 
    getRestrictedUserById(id: ID!): RestrictedUser

    getPlayListByRestrictedUser(id: ID!): [PlayList]
    getPlayListByAdminUser: [PlayList]
    getPlayListById(id: ID!): PlayList

    getVideoById(id: ID!): Video
    getVideoByPlayList(id: ID!): [Video]
    getAllVideos: [Video]
    searchVideo(restrictedUserId: ID!, playlistId: ID!, text: String): [Video]
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

  type Video {
  _id: ID!
  name: String!
  url: String!
  description: String
  playLists: [PlayList!] 
}

  `);