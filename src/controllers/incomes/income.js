const mongoose = require('mongoose');
const Income = require('../../models/Income');
const bcrypt = require('bcrypt');
//requerimos jwt
const jwt = require('jsonwebtoken');

const index = (req, res) =>{
	Income
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting incomes',
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
    const newIncome = new Income({
      _id: mongoose.Types.ObjectId(),
      concept: req.body.concept,
      quantity: req.body.quantity,
      date: req.body.date,
      departmentId: req.body.departmentId,
      })

            newIncome
              .save()
              .then( data => {
                res.json({
                  type: 'New income created',
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
