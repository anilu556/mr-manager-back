const mongoose = require('mongoose');
const {Schema} = mongoose

const incomesSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    concept: {type: String,required: true},
    quantity: {type: Number,required: true},
    date: {type: String,required: true},
    departmentId: {type: Schema.Types.ObjectId, ref: 'Department'},
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property'},
    balanceId: {type: Schema.Types.ObjectId, ref: 'Balance'}
  },
  { timestamps: true }
)

module.exports= mongoose.model('Incomes', incomesSchema)
