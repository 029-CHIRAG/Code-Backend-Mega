import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router=Router();
router.route('/register').post(registerUser)    // it will take us to userController and register method which is returning a basic message now.

export default router