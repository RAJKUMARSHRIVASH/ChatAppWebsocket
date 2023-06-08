const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    verification:String
});

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
