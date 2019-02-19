const mongoose = require('mongoose');
const Property = require('../../models/Property');
const bcrypt = require('bcrypt');
//requerimos jwt
const jwt = require('jsonwebtoken');
const Department = require('../../models/Department');

const index = (req, res) =>{
	Property
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting properties',
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
  const newProperty = new Property({
    _id: mongoose.Types.ObjectId(),
    managerId: req.body.managerId,
    name: req.body.name,
    streetNumber: req.body.streetNumber,
    colonia: req.body.colonia,
    city: req.body.city
    })
    console.log(newProperty)

          newProperty
            .save()
            .then( data => {
              res.json({
                type: 'New property created',
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
  Property
    .deleteOne({_id:req.params.propertyId})
        .then(data => {
          res
          .json({
            type:'Property was deleted',
            data: data
          })
          .status(200)
        })
    		.catch(err =>{
    			console.log(`caugth error: ${err}`);
    			return res.status(500).json(err);
    		})
    }

const getDepartmentsBy = (req, res) => {
  console.log(req.params.propertyId)
  Department
   .find({propertyId: req.params.propertyId})
   .exec()
   .then(data => {
     res
       .status(200)
       .json({
         type: 'Finding departments',
         data: data
       })
   })
   .catch(err => {
      console.log(`caugth err: ${err}`);
      return res.status(500).json(err)
       })
}

module.exports = {
 index, create, deleteBy, getDepartmentsBy
}
