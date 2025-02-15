const mongoose = require("mongoose");
const {mongoose_URL} = require("./config")

mongoose.connect(mongoose_URL);

const UserSchema = mongoose.Schema({
    username : String , 
    firstname : String , 
    lastname : String , 
    password : String
})


const User = mongoose.model("User" , UserSchema);

const AccountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    } , 
    balance : Number
})


const Account =  mongoose.model("Account" , AccountSchema);



module.exports = {
    User , 
    Account
}
