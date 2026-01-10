import express from "express"
import conservationController from "../controller/conservation.controller.js"
const route = express.Router()
route.get("/", conservationController.getAllMessgae)
route.get("/me", conservationController.getMessageById)
export default route