import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiError } from "../utils/ApiErrors.js";

const router=Router();
router.route('/register').post(upload.fields([
    {name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),
registerUser)    // it will take us to userController and register method which is returning a basic message now.
router.route('/login').post(loginUser)

//secured Routes
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
export default router