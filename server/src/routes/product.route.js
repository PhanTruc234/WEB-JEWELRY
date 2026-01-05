import express from "express"
import multer from "multer";
import path from "path"
import productController from "../controller/product.controller.js";
import { checkRole } from "../auth/checkRole.js";
import { middleware } from "../middleware/middleware.js";
import { createProductShema, updateProductSchema } from "../Schema/product.schema.js";
import { objectIdSchema } from "../Schema/commonSchema.js";
const route = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
route.get("/", productController.getAllProduct);
route.get('/date-time', productController.getOntime);
route.get("/:id", middleware(objectIdSchema, "params"), productController.getProductById);
route.post("/", checkRole("admin"), middleware(createProductShema, "body"), productController.createProduct);
route.put("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateProductSchema, "body"), productController.updateProduct);
route.post("/upload", checkRole("admin"), upload.array('product-images', 10), productController.uploadImgProduct)

route.delete("/delete-upload", checkRole("admin"), productController.removeImgTem)
route.delete("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), productController.deleteProduct)
route.delete("/:id/image", checkRole("admin"), middleware(objectIdSchema, "params"), productController.deleteImg)
export default route