import { Request, Response } from "express";
import { userController,userMessage,allUserMessages,deleteUser,getNameById} from "../controller/user";
const router = require("express").Router();

router.post("/user", userController);
router.post("/message/:id", userMessage);
router.get("/allmessages/:id",allUserMessages)
router.delete("/delete/:id",deleteUser)
router.get("/:id",getNameById)

export default  router