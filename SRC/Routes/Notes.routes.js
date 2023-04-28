const express = require('express');
const {Notes_Model} = require('../Model/NotesModel');
const NoteRoutes = express.Router();
const {GET_Notes,POST_AddNotes,DELETE_Notes,PATCH_UpdateNotes} = require('../Controllers/NotesControllers');
const {ValidateToken} = require('../MiddleWares/AuthMiddleware');

// route-path, middleware, controller
NoteRoutes.get('/',ValidateToken,GET_Notes);
NoteRoutes.post('/addnotes',ValidateToken,POST_AddNotes);
NoteRoutes.delete('/delete/:id',ValidateToken,DELETE_Notes);
NoteRoutes.patch('/update/:id',ValidateToken,PATCH_UpdateNotes);


module.exports = {NoteRoutes};