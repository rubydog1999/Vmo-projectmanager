import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true,"Employee name field is required"]
    },
    DoB:{
        type: Date,
        required : [true, "Date of birth is required"],
        trim : true,
    },
    idNumber:{
        type: String,
        unique:  true,
        required:[true,"Id number is required"]
    },
    phoneNumber:{
        type: String,
        required: [true,"Phone number is required"]
    },
    address:{
        type: String,
        required: [true, "Address is required"]
    },
    languge:{
        type: String,
        required: [true,"Language is required"]
    },
    certificate:{
        type: String,
        required : [true,"certificate is required"]
    },
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

