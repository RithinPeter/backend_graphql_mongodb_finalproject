const User = require('../models/User');
const VitalSigns = require('../models/VitalSigns');

const resolvers = {
    Query: {
        getAllUsers: () => User.find({}),
        getUserVitals: (_, { userId }) => VitalSigns.find({ userId })
    },
    Mutation: {
        addUser: async (_, { username, password, role }) => {
            const newUser = new User({ username, password, role });
            return await newUser.save();
        },
        addVitalSigns: async (_, { userId, bodyTemperature, heartRate, bloodPressure, respiratoryRate }) => {
            const newVitalSigns = new VitalSigns({
                userId, bodyTemperature, heartRate, bloodPressure, respiratoryRate
            });
            return await newVitalSigns.save();
        }
    }
};

module.exports = resolvers;
