import jwt from "jsonwebtoken";
import user from "../model/user.js";

const handleError = (err)=>{
    let error = {name :"" , email :"", password:""}
    if(err.message == "incorrect password"){
        error.password = "wrong password"
    }
    if(err.message == "incorrect email"){
        error.email = "this email is not registered"
    }
    if (err.code === 11000){
        error.email = "this  email is already used";
        return error;
    }
    if(err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message
        })
    }
    return error
}
const createToken = (id , name, email)=>{
    return jwt.sign({id , name , email} , process.env.secret_key , {
        expiresIn : "3d"
    })
}

export const sign_post = (req ,res) =>{
    const {name , email , password} = req.body;
    console.log(req.body);
    const newUSer = new user({name , email , password});
    newUSer.save()
        .then(result =>{
            res.status(201).json({result})
        })
        .catch(err=>{
            const customError = handleError(err)
            res.status(400).json({customError})
        })
}

export const login_post = async (req , res)=>{
    const {email , password} = req.body;
    try{
        const loginUser = await user.login(email , password)

        const token = createToken(loginUser.id , loginUser.name , loginUser.email)
        res.cookie("jwt_login" ,  token , {maxAge : 3*24*60*60*1000 })

        res.status(200).json({loginUser})
    }
    catch(err){
        const customError = handleError(err);
        console.log(customError);
        console.log(err.message)
        res.status(400).json({customError})
    }

    
}

export const logout = (req, res)=>{
    res.cookie("jwt_login"  , "" , {maxAge : 1})
    res.redirect("/") 
}