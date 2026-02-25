const express=require('express');
const { handleTrainerSignup, handleTrainerLogin, getTrainerDetails, getAllStd } = require('../controllers/trainerController');
const auth = require('../auth/auth');
const authorized = require('../auth/authorized');

const trainerRouter=express.Router();

//testing api
trainerRouter.get('/',(req,res)=>{
    return res.json({message:"trainer router at work"})
});

trainerRouter.post('/signup',handleTrainerSignup);

trainerRouter.post('/login',handleTrainerLogin);

trainerRouter.get('/get',auth,getTrainerDetails);

trainerRouter.get('/allstd',auth,authorized,getAllStd);


module.exports=trainerRouter;