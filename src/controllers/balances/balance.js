const mongoose = require('mongoose');
const Balance = require('../../models/Balance');
const Income = require('../../models/Income');
const Expense = require('../../models/Expense');
const bcrypt = require('bcrypt');
//requerimos jwt
const jwt = require('jsonwebtoken');

//incomes
const createIncomes = (req, res) => {
    const concept = req.body.concept
    const quantity = req.body.quantity
    const date = req.body.date
    const department = req.params.departmentId
    const propertyId = req.body.propertyId
    let newBalanceId = ''

    const newdate = date.split('-')

    const dateYM = `${newdate[0]}-${newdate[1]}`

    Balance.find({ period: dateYM, propertyId: propertyId }).then(function (dateBalan) {
      if (dateBalan.length > 0) {
        console.log(`Actualiza: ${dateBalan[0]}`)
        newBalanceId = dateBalan[0]._id
        console.log(newBalanceId)

        let sumBalance = dateBalan[0].balance + parseInt(quantity)
        let sumIncomes = dateBalan[0].incomes + parseInt(quantity)

        Balance.findOne({
          _id: dateBalan[0]._id
        }).then(balance => {
          balance.balance = sumBalance
          balance.incomes = sumIncomes
          balance.save()
        })

        console.log(dateBalan[0])
      } else {
        console.log(`Crea: ${dateBalan}`)
        const newBalance = new Balance({
          _id: new mongoose.Types.ObjectId(),
          balance: quantity,
          expenses: 0,
          incomes: quantity,
          period: dateYM,
          propertyId: propertyId
        })
        newBalance.save()
        newBalanceId = newBalance._id
      }
      console.log(newBalanceId)
      const newIncome = new Income({
        _id: new mongoose.Types.ObjectId(),
        concept: concept,
        quantity: quantity,
        date: date,
        departmentId: department,
        balanceId: newBalanceId,
        propertyId: propertyId
      })
      console.log(newIncome)
      newIncome
        .save()
        .then(data => {
          res.status(200).json({
            message: 'Incomes created successfully',
            data: data
          })
        })
        .catch(error => console.log(error))
    })
  }

//Expenses
const createExpenses = (req, res) => {

const concept = req.body.concept
const quantity = req.body.quantity
const date = req.body.date
const department = req.params.departmentId
const propertyId = req.body.propertyId
let newBalanceId = ''

const newdate = date.split('-')

const dateYM = `${newdate[0]}-${newdate[1]}`

Balance.find({ period: dateYM, propertyId: propertyId }).then(function (dateBalan) {
  if (dateBalan.length > 0) {
    console.log(`Actualiza: ${dateBalan[0]}`)
    newBalanceId = dateBalan[0]._id
    console.log(newBalanceId)

    let resBalance = dateBalan[0].balance - parseInt(quantity)
    let sumExpenses = dateBalan[0].expenses + parseInt(quantity)

    Balance.findOne({
      _id: dateBalan[0]._id
    }).then(balance => {
      balance.balance = resBalance
      balance.expenses = sumExpenses
      balance.save()
    })

    console.log(dateBalan[0])
  } else {
    console.log(`Crea: ${dateBalan}`)
    const newBalance = new Balance({
      _id: new mongoose.Types.ObjectId(),
      balance: quantity,
      expenses: quantity,
      incomes: 0,
      period: dateYM,
      propertyId: propertyId
    })
    newBalance.save()
    newBalanceId = newBalance._id
  }
  console.log(newBalanceId)
  const newExpense = new Expense({
    _id: new mongoose.Types.ObjectId(),
    concept: concept,
    quantity: quantity,
    date: date,
    departmentId: department,
    balanceId: newBalanceId,
    propertyId: propertyId
  })
  console.log(newExpense)
  newExpense
    .save()
    .then(data => {
      res.status(200).json({
        message: 'Expense created successfully',
        data: data
      })
    })
    .catch(error => console.log(error))
})
}

module.exports = {
  createIncomes, createExpenses
}
