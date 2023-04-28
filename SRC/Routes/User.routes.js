const express = require('express');
const UserRoutes = express.Router();

const {GET_Users,POST_AddUsers,POST_LoginUsers} = require('../Controllers/UsersController');


UserRoutes.get('/',GET_Users);
UserRoutes.post('/adduser',POST_AddUsers);
UserRoutes.post('/login',POST_LoginUsers);

module.exports = {UserRoutes};

