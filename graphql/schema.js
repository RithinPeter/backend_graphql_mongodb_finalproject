const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
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
    signUp(username: String!, password: String!, role: String!): AuthPayload
    signIn(username: String!, password: String!): AuthPayload
    addVitalSigns(patientId: ID!, bodyTemperature: Float!, heartRate: Float!, bloodPressure: String!, respiratoryRate: Float!): VitalSigns
  }
`;

module.exports = typeDefs;
