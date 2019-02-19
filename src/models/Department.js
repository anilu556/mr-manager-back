const mongoose = require('mongoose');
const {Schema} = mongoose

const departmentSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property'},
  department: {type: String, unique: true},
  tenant: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  email: {type: String, required: true}
})

module.exports= mongoose.model('Department', departmentSchema)
