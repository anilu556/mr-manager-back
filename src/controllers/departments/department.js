const mongoose = require('mongoose');
const Department = require('../../models/Department');
const Income = require('../../models/Income');
const Expense = require('../../models/Expense');
const bcrypt = require('bcrypt');
//requerimos jwt
const jwt = require('jsonwebtoken');

const index = (req, res) =>{
	Department
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting departments',
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
    const newDepartment = new Department({
      _id: mongoose.Types.ObjectId(),
      propertyId: req.body.propertyId,
      department: req.body.department,
      tenant: req.body.tenant,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email
      })

            newDepartment
              .save()
              .then( data => {
                res.json({
                  type: 'New department created',
                  data: data
                })
                .status(200)
              })
              .catch(err => {
                console.log(`Caught error: ${err}`);
                return res.status(500).json({message: 'Post failed'})
              })
            }

const deleteBy = (req, res) => {
  Department
    .deleteOne({_id:req.params.departmentId})
      .then(data => {
        res
        .json({
          type:'Department was deleted',
          data: data
        })
      .status(200)
      })
      .catch(err =>{
        console.log(`caugth error: ${err}`);
        return res.status(500).json(err);
        })
      }

			const getIncomesBy = (req, res) => {
			  console.log(req.params.departmentId)
			    Income
			      .find({departmentId: req.params.departmentId})
			      .exec()
			      .then(data => {
			      res
			      .status(200)
			      .json({
			        type: 'Finding incomes',
			        data: data
			      })
			      })
			      .catch(err => {
			        console.log(`caugth err: ${err}`);
			        return res.status(500).json(err)
			      })
			    }

const getExpensesBy = (req, res) => {
	console.log(req.params.departmentId)
		Expense
			.find({departmentId: req.params.departmentId})
	   .exec()
	   .then(data => {
     res
     .status(200)
		 .json({
	     type: 'Finding expenses',
				data: data
	 	})
	})
			.catch(err => {
	    console.log(`caugth err: ${err}`);
      return res.status(500).json(err)
     	})
   }


module.exports = {
  index, create, deleteBy, getIncomesBy, getExpensesBy
}
