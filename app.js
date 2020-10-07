const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const admin = require ('./route/admin.js');
dotenv.config({
    path: '.env',
  });
// node --experimental-modules app.js
const app = express()
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true ,useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,},()=>console.log('connected to db')) 

    app.use('/api', [admin]);
app.use(express.json());
app.listen(3000, () => console.log('Example listening on port 3000!'))