const { LoginValidation, RegisterValidation } = require('../validation/adminValidation');
const Admin = require('../model/adminModel');
const { logger } = require('../helper/log')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerUsr = async (req, res) => {
    //Validation
    try {
        const { error } = RegisterValidation(req.body);
        if (error) return res.status(400).send({
            status:400,
            error: error.details[0].message
        })
        //Check if email already on the database
        const userExit = await Admin.findOne({
            userName: req.body.userName
        })
        if (userExit) {
            res.send({
                status: 400,
                message: "ADMIN_ALREADY_EXIST",
                error: true
            })
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //create new admin
        const adMin = new Admin({
            userName: req.body.userName,
            password: hashPassword,
        });
        const savedAdmin = await adMin.save();
        res.status(200).send
        res.send({
            status: 200,
            message: 'CREATE_NEW_ADMIN_SUCCESS',
            error: false,
            id: savedAdmin.id,
        });
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
        const countAmdin = await Admin.count()
        if (countAmdin == 0) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const adMin = new Admin({
                userName: req.body.userName,
                password: hashPassword,
            });
            await adMin.save();
            const token = jwt.sign("hellow", process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token)
        }
        const userExist = await Admin.findOne({ userName: req.body.userName })
        if (!userExist) return res.status(400).send('Admin is not already exist')
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