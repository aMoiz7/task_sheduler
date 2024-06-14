import { Router } from "express";
import { singUp, singin } from "../controller/user";

 const router = Router()


router.route("/signin").post(singin)
router.route("/signUp").post(singUp)

export default router

