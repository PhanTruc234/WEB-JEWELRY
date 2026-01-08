import { BadRequest, NotFound } from "../core/error.response.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartService {
    async getCart(userId, page, limit) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const skip = (page - 1) * limit;
        const cart = await cartModel
            .findOne({ userId })
            .populate({
                path: "items.productId",
                populate: [
                    { path: "brandId" },
                    { path: "categoryId" },
                    { path: "subCategoryId" }
                ]
            });
        if (!cart) {
            return {
                items: [],
                totalItems: 0,
                page,
                limit
            };
        }
        const totalItems = cart.items.length
        const paginatedItems = cart.items.slice(skip, skip + limit);
        return {
            data: paginatedItems,
            totalItems,
            page,
            limit
        };
    }
    async createCart(userId, productId, sku, quantity) {
        const products = await productModel.findById(productId).populate("brandId")
            .populate("categoryId")
            .populate("subCategoryId");
        if (!products) throw new Error("Không tìm thấy sản phẩm");
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = await cartModel.create({
                userId,
                items: [],
            });
        }
        const existingItem = cart.items.find(i => i.sku === sku);
        // const now = new Date();
        // if (
        //     products.promotion?.isActive &&
        //     products.promotion.endAt &&
        //     new Date(products.promotion.endAt) <= now
        // ) {
        //     products.promotion.isActive = false;
        //     products.promotion.discount = 0;
        //     products.variants.forEach(variant => {
        //         variant.options.forEach(option => {
        //             option.finalPrice = option.originalPrice;
        //         });
        //     });
        // }
        let a;
        products.variants.forEach((item) => {
            const option = item.options.find((o) => o.sku === sku)
            if (option) {
                a = { color: item.color, option };
            }
        })
        if (!a) throw new Error("Invalid SKU");
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({
                productId: products._id,
                color: a.color,
                sku: sku,
                type: a.option.type,
                value: a.option.value,
                purity: a.option.purity || null,
                unitPrice: a.option.finalPrice,
                quantity: quantity,
                stockQuantity: a.option.stockQuantity
            })
        }
        await cart.save();
        return cart
    }
    async updateCart(userId, sku, quantity) {
        const cart = await cartModel.findOne({ userId });
        if (!cart) throw new NotFound("Không tìm thấy cart");
        const item = cart.items.find(i => i.sku === sku);
        if (!item) throw new NotFound("Không tìm thấy đơn hàng");
        if (quantity <= 0) {
            cart.items = cart.items.filter(i => i.sku !== sku);
        } else {
            item.quantity = quantity;
        }
        await cart.save();
        return cart
    }
    async deleteCart(userId, sku) {
        const cart = await cartModel.findOne({ userId })
        if (!cart) throw new NotFound("Không tìm thấy cart");
        const item = cart.items.find(i => i.sku === sku);
        if (!item) throw new NotFound("Không tìm thấy sản phẩm");
        cart.items = cart.items.filter(i => i.sku !== sku);
        await cart.save();
        return cart
    }
    async clearCart(userId) {
        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            throw new NotFound("Không tìm thấy cart");
        }
        cart.items = [];
        await cart.save()
        return cart
    }
}
export default new CartService()