import express from "express";
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
import helmet from "helmet";
import rateLimit from "express-rate-limit"
import { authApiLimiter, globalLimiter } from "./libs/rateLimit.js";
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
app.use("/api/users", authApiLimiter, authUser, userRoute)
app.post("/logout", authApiLimiter, authUser, userController.logout);
app.use("/api/category", authApiLimiter, authUser, categoryRoute)
app.use("/api/subcategory", authApiLimiter, authUser, subcategoryRoute)
app.use("/api/brand", authApiLimiter, authUser, brandRoute)
app.use("/api/review", authApiLimiter, authUser, reviewRoute)
app.use("/api/product", authUser, productRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
