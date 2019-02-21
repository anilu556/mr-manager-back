const mongoose = require('mongoose');
const Expense = require('../../models/Expense');
const bcrypt = require('bcrypt');
//requerimos jwt
const jwt = require('jsonwebtoken');

const index = (req, res) =>{
	Expense
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting expenses',
					data:data
				})
				.status(200)
			})
			.catch(err => {
				console.log(`caugth error: ${err}`);
				return res.status(500).json(err);
			})
	}

  const create = (req, res) => {
    const newExpense = new Expense({
      _id: mongoose.Types.ObjectId(),
      concept: req.body.concept,
      quantity: req.body.quantity,
      date: req.body.date,
      departmentId: req.body.departmentId,
      })

            newExpense
              .save()
              .then( data => {
                res.json({
                  type: 'New expense created',
                  data: data
                })
                .status(200)
              })
              .catch(err => {
                console.log(`Caught error: ${err}`);
                return res.status(500).json({message: 'Post failed'})
              })
            }

module.exports = {
  index, create
}
