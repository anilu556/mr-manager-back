const mongoose = require('mongoose');
const Manager = require('../../models/Manager');
const bcrypt = require('bcrypt');
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
        res
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

module.exports = {
  index, findBy, create, signup, login
}
