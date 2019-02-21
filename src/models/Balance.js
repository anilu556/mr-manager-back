const mongoose = require('mongoose');
const {Schema} = mongoose

const balanceSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    balance: {type: Number,required: true},
    expenses: { type: Number, required: true},
    incomes: {type: Number, required: true},
    period: {type: String, required: true},
    propertyId: {type: Schema.Types.ObjectId, ref: 'Property'}
  },
  { timestamps: true }
)

module.exports= mongoose.model('Balance', balanceSchema)
