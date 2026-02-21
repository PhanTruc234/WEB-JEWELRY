import express from "express"
import dashboardController from "../controller/dashboard.controller.js"
import { checkRole } from "../auth/checkRole.js"
const route = express.Router()
route.get("/", checkRole("admin"), dashboardController.getDashboard)
export default route