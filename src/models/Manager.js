const mongoose = require('mongoose');
const {Schema} = mongoose

const managerSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true},
  email: {type: String, unique: true},
  password: {type: String, required: true}
})


module.exports= mongoose.model('Manager', managerSchema)
