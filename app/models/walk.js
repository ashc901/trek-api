const mongoose = require('mongoose')

const walkSchema = new mongoose.Schema({
  road: {
    type: String
  },
  startPoint: {
    type: String
  },
  endPoint: {
    type: String
  },
  distance: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('Walk', walkSchema)
