const mongoose = require("mongoose")
const validationID = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id))
        next()
    else {
        return res.status(400).send({
            status: 400,
            message: "Invalid ID",
            messageCode: "INVALID_ID"
        })
    }
}
module.exports = validationID