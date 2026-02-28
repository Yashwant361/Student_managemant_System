const express=require('express');
const cors=require('cors');
const {configDotenv}=require('dotenv');
const connectDb = require('./dbConnection/db.js');
const stdRouter = require('./routes/stdRouter.js');
const stdSubRouter = require('./routes/stdSubRouter.js');
const trainerRouter = require('./routes/trainerRouter.js');
const otpRouter = require('./routes/otpRouter.js');
const app=express();

app.use(cors());
connectDb()
//server testing api

//parsing json data
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is running ");
});

//api for std
app.use('/api/std',stdRouter);

app.use('/api/std/subject',stdSubRouter);

app.use('/api/trainer',trainerRouter);

app.use('/api/otp',otpRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});