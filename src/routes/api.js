const { Router } = require('express');
const app = Router();

//requerir Auth
const isAuthenticated = require('../../services/Auth');

const Managers = require('../controllers/managers/manager')

//managers routes
app.get('/managers', Managers.index);
app.get('/managers/:managerId', Managers.findBy);
app.post('/managers', Managers.create);

// auth routes
app.post('/auth/signup', Managers.signup)
app.post('/auth/login', Managers.login)

module.exports = app;
