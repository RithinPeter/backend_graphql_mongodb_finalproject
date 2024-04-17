const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
    email: String!  # Add this line to include the email field
    age: Int!       # Add this line to include the age field
    gender: String! # Add this line to include the gender field
  }

  type VitalSigns {
    id: ID!
    nurseId: User
    patientId: User!
    bodyTemperature: Float!
    heartRate: Float!
    bloodPressure: String!
    respiratoryRate: Float!
    timestamp: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    vitalSigns: [VitalSigns]
  }

  type Mutation {
    signUp(username: String!, password: String!, role: String!, email: String!, age: Int!, gender: String!): AuthPayload
    signIn(username: String!, password: String!): AuthPayload
    addVitalSigns(patientId: ID!, bodyTemperature: Float!, heartRate: Float!, bloodPressure: String!, respiratoryRate: Float!): VitalSigns
  }
`;

module.exports = typeDefs;
