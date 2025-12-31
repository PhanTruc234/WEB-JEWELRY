import express from "express";
import chatBoxController from "../controller/chatBox.controller.js";
const route = express.Router();
route.post("/", chatBoxController.chatBox)
export default route;