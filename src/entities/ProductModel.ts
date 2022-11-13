import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    userUuid:{
        type: String,
        require: true,
        unique: true,
        ref: "User"
    },
    description:{
        type: String,
        require: true
    },
    price: {
       type: Number,
       requise: true 
    }
});

const ProductModel = mongoose.model("Product", schema)
export default ProductModel;