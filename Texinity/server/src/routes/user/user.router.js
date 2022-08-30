import  express  from "express";
import { signup, login, addUser } from "./user.controller.js";
const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login',  login)
userRouter.post('/add', addUser)

export default userRouter;


