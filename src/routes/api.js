const { Router } = require('express');
const app = Router();

//requerir Auth
const isAuthenticated = require('../../services/Auth');
const Managers = require('../controllers/managers/manager')
const Properties = require('../controllers/properties/property')
const Departments = require('../controllers/departments/department')
const Incomes = require('../controllers/incomes/income')
const Expenses = require('../controllers/expenses/expense')
const Balances = require('../controllers/balances/balance')

//managers routes
app.get('/managers', isAuthenticated, Managers.index);
app.get('/managers/:managerId', isAuthenticated, Managers.findBy);
app.post('/managers', isAuthenticated, Managers.create);
app.delete('/managers/:managerId', isAuthenticated, Managers.deleteBy);
app.get('/managers/:managerId/properties', isAuthenticated, Managers.getPropertiesBy);

//properties routes
app.get('/properties', isAuthenticated, Properties.index);
app.post('/managers/:managerId/properties', isAuthenticated, Properties.create);
app.delete ('/properties/:propertyId', isAuthenticated, Properties.deleteBy);
app.get('/properties/:propertyId/departments', isAuthenticated, Properties.getDepartmentsBy);

//departments routes
app.get('/departments', isAuthenticated, Departments.index);
app.post('/properties/:propertyId/departments', isAuthenticated, Departments.create);
app.delete ('/departments/:departmentId', isAuthenticated, Departments.deleteBy);
app.get('/departments/:departmentId/incomes', isAuthenticated, Departments.getIncomesBy);
app.get('/departments/:departmentId/expenses', isAuthenticated, Departments.getExpensesBy);

//income routes
app.get('/incomes', isAuthenticated, Incomes.index);
app.post('/departments/:departmentId/incomes', isAuthenticated, Balances.createIncomes);

//expense routes
app.get('/expenses', isAuthenticated, Expenses.index);
app.post('/departments/:departmentId/expenses', isAuthenticated, Balances.createExpenses);

//balanceRoute
app.get('/properties/:propertyId/balances', isAuthenticated, Properties.getBalance);

// auth routes
app.post('/auth/signup', Managers.signup)
app.post('/auth/login', Managers.login)

module.exports = app;
