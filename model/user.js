import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
const userSchema = new Schema({
    name : {
        type : String,
        required : [true , "please enter your name"]
    },
    email : {
        type : String,
        required : [true , "please enter email"],
        unique : true,
        validate : [validator.isEmail , "enter a valid email"]    ,
        lowercase : true   
    },
    password : {
        type : String ,
        required : [true  , "please enter a password"],
        minlength : [6 , "the min length for password is 6  characters"]
    }
})
userSchema.pre("save" ,async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt)
})

userSchema.statics.login = async function(email , password){
    const emailAuth = await this.findOne({email})
    if (emailAuth){
        const passAuth = await bcrypt.compare(password , emailAuth.password)
        if(passAuth){
            return emailAuth;
        } throw Error ("incorrect password")
    }throw Error ("incorrect email")
}
const user = model("jwt", userSchema )

export default user;