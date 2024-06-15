import { Router } from "express";
import { singUp, singin , finduseremail, findUserTasks} from "../controller/user";
import { auth } from './../middleware/auth';

 const router = Router()


router.route("/signin").post(singin)
router.route("/signUp").post(singUp)
router.route("/useremail").post(finduseremail)
router.route("/usertask").get(auth , findUserTasks)


export default router

