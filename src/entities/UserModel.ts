import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        require: true,
        default: v4()
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