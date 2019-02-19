const { Router } = require('express');
const app = Router();

//requerir Auth
const isAuthenticated = require('../../services/Auth');
const Managers = require('../controllers/managers/manager')
const Properties = require('../controllers/properties/property')
const Departments = require('../controllers/departments/department')

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

// auth routes
app.post('/auth/signup', Managers.signup)
app.post('/auth/login', Managers.login)

module.exports = app;
