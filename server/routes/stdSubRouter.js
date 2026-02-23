const express=require('express');
const auth = require('../auth/auth');
const { handleAddSubject, handleGetAllSubject, handleRemoveSubject, handleUpdateSubject } = require('../controllers/subjectController');

const stdSubRouter=express.Router();

stdSubRouter.post('/add',auth,handleAddSubject);

stdSubRouter.get('/allsubject',auth,handleGetAllSubject);

stdSubRouter.delete('/remove/:id',auth,handleRemoveSubject);

stdSubRouter.patch('/updatesubject',auth,handleUpdateSubject);

module.exports=stdSubRouter;