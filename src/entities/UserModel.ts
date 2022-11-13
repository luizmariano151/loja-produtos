import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    email: {
       type: String,
       requise: true 
    },
    password: {
        type: String,
        requise: true 
    },
    rules: [{
        type: String,
        requise: true 
    }],
});

const UserModel = mongoose.model("User", schema)
export default UserModel;