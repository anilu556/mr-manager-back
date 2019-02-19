const mongoose = require('mongoose');
const {Schema} = mongoose

const propertySchema = new Schema ({
  _id: Schema.Types.ObjectId,
  managerId: { type: Schema.Types.ObjectId, ref: 'Manager'},
  name: {type: String, unique: true},
  streetNumber: {type: String, required: true},
  colonia: {type: String, required: true},
  city: {type: String, required: true}
})

module.exports= mongoose.model('Property', propertySchema)
