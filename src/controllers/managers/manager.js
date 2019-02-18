const mongoose = require('mongoose');
const Manager = require('../../models/Manager');
const bcrypt = require('bcrypt');
const Property = require('../../models/Property');

//requerimos jwt
const jwt = require('jsonwebtoken');

const index = (req, res) =>  {
  Manager
    .find()
    .exec()
    .then(managers => {
      res.json({
        managers,
        total: managers.length
      })
      .status(200)
    })
    .catch(err => {
      console.log(`Caught error: ${err}`);
      return res.status(500).json(err)
    })
}

const findBy = (req, res) => {
      Manager
      .findById(req.params.managerId)
      .exec()
      .then( managers => {
        res.json({
          type: 'User found by Id',
          managers
        })
        .status(200)
      })
      .catch(err => {
        console.log(`Caught error: ${err}`);
        return res.status(500).json(err)
      })
    }

    const create = (req, res) => {
      const newManager = new Manager({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
      })

      newManager
        .save()
        .then( data => {
          res.json({
            type: 'New User created',
            data: data
          })
          .status(200)
        })
        .catch(err => {
          console.log(`Caught error: ${err}`);
          return res.status(500).json({message: 'Post failed'})
        })
      }

    const signup = (req, res) => {
      Manager
        .find({email: req.body.email})
        .exec()
        .then(managers => {
          if (managers.length < 1){
            //save new user using bcrypt
            bcrypt.hash(req.body.password, 10, (error, hash) => {
              if (error) {
                return res
                .status(500)
                .json({
                  message: error
                })
              }
              //create new manager
              const newManager = new Manager ({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
              })

              newManager
                .save()
                .then(saved => {
                  res
                  .status(200)
                  .json({
                    message: 'Manager created succesfully',
                    data: saved
                  });
                })
            });
          } else {
            res
              .status(422)
              .json({
                message: 'Manager already exists'
              })
          }
        })
    }

const login = (request, response) => {
Manager
  .find({email: request.body.email})
  .exec()
  .then(manager =>{
    if (manager.length > 0) {
      //comparacion de passwords
      bcrypt.compare(request.body.password, manager[0].password, (error, result) =>{
        if (error){
          return response
          .status(401)
          .json({
            message: 'Authentication Failed'
          })
        }
        //se crea token
        if (result) {
          const token = jwt.sign({
            email: manager[0].email,
            password: manager[0].password,
          }, process.env.JWT_SECRETKEY, {
            expiresIn: '1hr'
          });

          return response
            .status(200)
            .json({
              message:'Authentication Succesfull',
              token
            });
        }
        response
          .status(401)
          .json({
            message: 'Authentication Failed'
          })
        })
    } else {
      response
        .status(422)
        .json({
          message: 'Authentication Failed'
        })
    }
  });

}

const deleteBy = (req, res) => {
      Manager
        .findById(req.params.managerId, function(err, manager){
          if(!err){
            manager
              .remove()
              .then(() => {
                res
                .status(200)
                .json({
                  message:'User was deleted'
                });
              });
          }
        })
        .catch(err => {
          console.log(`caught error: ${err}`);
          return res.status(401).json({message: 'You dont have permission'})
        })
    }

    const updateBy = (request,response) =>{
  	const name = request.body.name;
  	const email = request.body.email;
    const phoneNumber = request.body.phoneNumber;
  	const password = request.body.password;

  		Manager
  		.findOne({_id:request.params.managerId})
  		.then(function(manager){
  			//save new user
  			bcrypt.compare(password, manager.password, (error, result) =>{
  				if(result) {
  					manager.name = name;
  					manager.email = email;
            manager.phoneNumber = phoneNumber;

  				manager.save()
  						.then(saved => {
  							response
  								.status(201)
  								.json({
  									message: 'User Updated successfully',
  									manager: saved
  								});
  						})
  				} else {
  					bcrypt.hash(password, 10, (error, hash) =>{
  						if (error) {
  							return response
  							.status(500)
  							.json({
  								message: error
  							});
  						}

  						manager.name = name;
  						manager.email = email;
              manager.phoneNumber = phoneNumber;
  						manager.password = hash;

  						manager
  							.save()
  							.then(saved =>{
  								response
  								.status(201)
  								.json({
  									message: 'User Updated successfully',
  									manager:saved
  								});
  							})
  					});
  				}
  			});
  		})
  		.catch(err =>{
  			console.log(`caught the error: ${err}`);
  			return response.status(404).json({"type": "Not Found"});
  		});
  	}

 const properties = (req, res) => {
   console.log(req.params.managerId)
   Property
    .find({managerId: req.params.managerId})
    .exec()
    .then(data => {
      res
        .status(200)
        .json({
          type: 'Finding properties',
          data: data
        })
    })
    .catch(err => {
       console.log(`caugth err: ${err}`);
       return res.status(500).json(err)
        })
 }

module.exports = {
  index, findBy, create, signup, login, deleteBy, updateBy, properties
}
