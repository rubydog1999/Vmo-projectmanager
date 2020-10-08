
const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const admin = require ('./route/admin');
const projectType = require('./route/projectType')
const bodyParser = require('body-parser')
dotenv.config();  
// node --experimental-modules app.js
const app = express()


mongoose.connect(process.env.DB_CONNECT, {


    useNewUrlParser: true
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
app.use('/api', [admin,projectType]);
app.listen(3000, () => console.log('Example listening on port 3000!'))


