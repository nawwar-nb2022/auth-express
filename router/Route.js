import { Router } from "express";
import { sign_post  , login_post, logout} from "../controllers/authController.js";
import { index, login, signUp, smoothies } from "../controllers/mainController.js";
import { authorizedUser, checkUser } from "../middleware/authMiddleware.js";

const router = Router()
router.get("*" , checkUser)
router.get("/" , index)

router.get("/smoothies" , authorizedUser , smoothies)

router.get("/signup" , signUp)

router.get("/login" , login)

// auth

router.post("/signup" , sign_post)
router.post("/login" ,  login_post)

// logout

router.get("/logout" , logout)

export default router;