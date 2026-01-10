import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userController from "./controller/user.controller.js";
import authUser from "./auth/checkAuth.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js"
import subcategoryRoute from "./routes/subcategory.route.js"
import brandRoute from "./routes/brand.route.js"
import reviewRoute from "./routes/review.route.js"
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.route.js"
import chatRoute from "./routes/conversation.route.js"
import helmet from "helmet";
import chatBotRoute from "./routes/chatBox.route.js"
import { authApiLimiter, globalLimiter } from "./libs/rateLimit.js";
import conversationModel from "./models/conversation.model.js";
// import { swaggerSpec, swaggerUiServe, swaggerUiSetup } from "./swagger.js";
const app = express()
const port = 3000
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
// chạy ratelimit riêng mới đến ratelimit chạy chung
// app.use('/api/docs', swaggerUiServe, swaggerUiSetup(swaggerSpec))
app.use("/api", globalLimiter);
app.use("/api", authRoute);
app.use("/api/chat", authUser, chatRoute)
app.use("/api/users", authApiLimiter, authUser, userRoute)
app.post("/logout", authApiLimiter, authUser, userController.logout);
app.use("/api/category", authApiLimiter, authUser, categoryRoute)
app.use("/api/subcategory", authApiLimiter, authUser, subcategoryRoute)
app.use("/api/brand", authApiLimiter, authUser, brandRoute)
app.use("/api/review", authApiLimiter, authUser, reviewRoute)
app.use("/api/product", authUser, productRoute)
app.use('/api/chat-bot', authUser, chatBotRoute)
app.use('/api/cart', authUser, cartRoute)
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})
let customer = {}
io.on("connect", (socket) => {
  socket.on("customer_open_chat", (userId) => {
    const roomId = userId;
    customer[roomId] = { roomId }
    console.log(customer, ">>> customer")
    socket.join(roomId)
    io.emit("customers_list", Object.values(customer))
  })
  socket.on("customer_message", async ({ userId, roomId, message }) => {
    console.log("From FE:", roomId, message);
    await conversationModel.findOneAndUpdate(
      { roomId },
      {
        $set: { userId },
        $push: { messages: { from: "customer", message } }
      },
      { upsert: true }
    );
    io.to(roomId).emit("message", {
      roomId,
      from: "customer",
      message
    })
  })
  socket.on("admin_join_room", (roomId) => {
    console.log(roomId, "roomIdroomIdroomId")
    socket.join(roomId)
  })
  socket.on("admin_message", async ({ userId, roomId, message }) => {
    await conversationModel.findOneAndUpdate(
      { roomId },
      {
        $set: { userId },
        $push: { messages: { from: "admin", message } }
      },
      { upsert: true }
    );
    io.to(roomId).emit("message", {
      roomId,
      from: "admin",
      message,
    });
  });
  socket.on("disconnect", () => {
    delete customer[socket.id]
    io.emit("customers_list", Object.values(customer));
  })
})
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
