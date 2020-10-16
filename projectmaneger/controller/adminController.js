const { LoginValidation, RegisterValidation } = require('../validation/adminValidation');
const Admin = require('../model/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerUsr = async (req, res) => {
    //Validation
    try {
    const { error } = RegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Check if email already on the database
    const userExit = await Admin.findOne({
         userName: req.body.userName
         })
    if (userExit) return res.status(400).send('User is already exist')

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create new admin
    const adMin = new Admin({
        userName: req.body.userName,
        password: hashPassword,
    });
    const savedAdmin = await adMin.save();
    res.send(savedAdmin);
    } catch (err) {
        res.status(400).send(err);
    }
}
const loginUsr = async (req, res) => {
    //Validation
    try {
        const { error } = LoginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Check if user already on the database
        const userExist = await Admin.findOne({ userName: req.body.userName })
        if (!userExist){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const adMin = new Admin({
            userName: req.body.userName,
            password: hashPassword,
        });
        await adMin.save();
        const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
        res.send(token)
        //Password is correct or not
        }
        const validPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (!validPassword) return res.status(400).send("Wrong Password")

        // Create and assign a token

        const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
        if (!token) return res.status(400).send("create token fail")
        res.header('auth-token', token).send(token)
    } catch (err) {
        res.status(400).send(err);
    }
}
module.exports.loginUsr = loginUsr
module.exports.registerUsr = registerUsr 