const { Router } = require('express');
const app = Router();

//requerir Auth
const isAuthenticated = require('../../services/Auth');
const Managers = require('../controllers/managers/manager')
const Properties = require('../controllers/properties/property')

//managers routes
app.get('/managers', isAuthenticated, Managers.index);
app.get('/managers/:managerId', isAuthenticated, Managers.findBy);
app.post('/managers', isAuthenticated, Managers.create);
app.put('/managers/:managerId', isAuthenticated, Managers.updateBy);
app.delete('/managers/:managerId', isAuthenticated, Managers.deleteBy);
// app.get('managers/properties/:managerId', isAuthenticated, Managers.properties)
app.get('/managers/:managerId/properties', isAuthenticated, Managers.properties)

//properties routes
app.get('/properties', isAuthenticated, Properties.index);
app.post('/managers/:managerId/properties', isAuthenticated, Properties.create);
app.delete ('/properties/:propertyId', isAuthenticated, Properties.deleteBy)

// auth routes
app.post('/auth/signup', Managers.signup)
app.post('/auth/login', Managers.login)

module.exports = app;
