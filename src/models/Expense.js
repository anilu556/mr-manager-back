const mongoose = require('mongoose');
const {Schema} = mongoose

const expensesSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    concept: {type: String,required: true},
    quantity: {type: Number,required: true},
    date: {type: String,required: true},
    departmentId: {type: Schema.Types.ObjectId, ref: 'Department'},
  },
  { timestamps: true }
)

module.exports= mongoose.model('Expenses', expensesSchema)
