const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bodyTemperature: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  respiratoryRate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VitalSigns', vitalSignsSchema);
