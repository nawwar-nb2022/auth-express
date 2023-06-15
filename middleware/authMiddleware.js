import jwt from "jsonwebtoken"
export const authorizedUser = (req,res,next)=>{
    // console.log(req.cookies)
    const token = req.cookies.jwt_login
    
    if(token){
        jwt.verify(token , process.env.secret_key , (err , decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect("/login")
            }else{
                next()
            }
        })
    }
    else{
        res.redirect("/login")
    }
}

export const checkUser = (req ,res , next) =>{
    const token = req.cookies.jwt_login 
    if(token){
        jwt.verify(token , process.env.secret_key , (err , decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.userInformation = null
                next();
            }else{
                res.locals.userInformation = decodedToken
                next();
            }
        })
    }else{
            res.locals.userInformation = null
            next();
    }
}