import express from "express"
import multer from "multer";
import path from "path"
import productController from "../controller/product.controller.js";
import { checkRole } from "../auth/checkRole.js";
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
route.get("/:id", productController.getProductById);
route.put("/:id", checkRole("admin"), productController.updateProduct);
route.post("/", checkRole("admin"), productController.createProduct);
route.post("/upload", checkRole("admin"), upload.array('product-images', 10), productController.uploadImgProduct)

route.delete("/delete-upload", checkRole("admin"), productController.removeImgTem)
route.delete("/:id", checkRole("admin"), productController.deleteProduct)
route.delete("/:id/image", checkRole("admin"), productController.deleteImg)
export default route