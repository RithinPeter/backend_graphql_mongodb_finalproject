// Import necessary modules
const User = require('../models/User');
const VitalSigns = require('../models/VitalSigns');
const jwt = require('jsonwebtoken');

// Define a variable to cache the result of the vitalSigns query
let cachedVitalSigns = null;

// Define resolvers
const resolvers = {
  Query: {
    users: async () => {
      try {
        // Query all users from the database
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    user: (_, { id }) => User.findById(id),
    vitalSigns: async () => {
      // If the vitalSigns data has already been queried, return the cached result
      if (cachedVitalSigns !== null) {
        return cachedVitalSigns;
      }

      // Otherwise, execute the query to fetch vitalSigns data
      try {
        const vitalSignsData = await VitalSigns.find({}).populate('nurseId patientId');
        // Cache the result
        cachedVitalSigns = vitalSignsData;
        return vitalSignsData;
      } catch (error) {
        throw new Error('Failed to fetch vital signs');
      }
    },
  },
  Mutation: {
    signUp: async (_, { username, password, role }) => {
      // Create a new user instance
      const user = await User.create({ username, password, role });
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      // Return token and user data
      return { token, user };
    },
    signIn: async (_, { username, password }) => {
      // Find the user by username
      const user = await User.findOne({ username });
      // Check if user exists and password is correct
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect username or password');
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      // Return token and user data
      return { token, user };
    },
    addVitalSigns: async (_, { patientId, bodyTemperature, heartRate, bloodPressure, respiratoryRate }) => {
      // Create a new VitalSigns instance
      const vitalSigns = await VitalSigns.create({
        patientId, 
        bodyTemperature, 
        heartRate, 
        bloodPressure, 
        respiratoryRate
      });
      // Clear the cached vitalSigns data to ensure it's refreshed on the next query
      cachedVitalSigns = null;
      // Return the saved vitalSigns data
      return vitalSigns;
    }
  }
};

module.exports = resolvers;
