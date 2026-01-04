import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import productModel from "../models/product.model.js";
import brandModel from "../models/brand.model.js";
import categoryModel from "../models/category.model.js";
import subcategoryModel from "../models/subcategory.model.js";
import reviewModel from "../models/review.model.js";
import { nanoid } from "nanoid";
import cloudinary from "../config/configCloudDinary.js";
import fs from "fs/promises";
import { getPublicId } from "../libs/publicId.js";
import { calcPrice } from "../libs/calcPrice.js";
class ProductService {
    async getAllProduct(page, limit, search, minPrice, maxPrice, color, carat, gram, purity, mm, categoryName, subCategoryName, brandName, isNewProduct, isFeatured) {
        const skip = (page - 1) * limit;
        const query = {
            $and: []
        };
        query.$and.push({ "variants.options.finalPrice": { $gte: minPrice, $lte: maxPrice } })
        if (color) {
            query.$and.push({
                "variants.color": { $regex: color, $options: "i" }
            })
        }
        if (isNewProduct) {
            query.$and.push({
                isNewProduct: JSON.parse(isNewProduct)
            })
        }
        if (isFeatured) {
            query.$and.push({
                isFeatured: JSON.parse(isFeatured)
            })
        }
        if (carat) {
            query.$and.push({ "variants.options": { $elemMatch: { type: "CARAT", value: carat } } });
        }
        if (gram) {
            query.$and.push({ "variants.options": { $elemMatch: { type: "GRAM", value: gram } } });
        }
        if (purity) {
            query.$and.push({ "variants.options": { $elemMatch: { type: "GRAM", purity: purity } } });
        }
        if (mm) {
            query.$and.push({ "variants.options": { $elemMatch: { type: "MM", value: mm } } });
        }
        if (search) query.$and.push({ name: { $regex: search, $options: "i" } });
        const [category, subcategory, brand] = await Promise.all([
            categoryName ? categoryModel.findOne({ slug: { $regex: categoryName, $options: "i" } }) : null,
            subCategoryName ? subcategoryModel.findOne({ slug: { $regex: subCategoryName, $options: "i" } }) : null,
            brandName ? brandModel.findOne({ slug: { $regex: brandName, $options: "i" } }) : null,
        ]);
        if (category) query.$and.push({ categoryId: category._id });
        if (subcategory) query.$and.push({ subCategoryId: subcategory._id });
        if (brand) query.$and.push({ brandId: brand._id });
        const [products, totalItems] = await Promise.all([
            productModel
                .find(query)
                .populate("brandId")
                .populate("categoryId")
                .populate("subCategoryId")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            productModel.countDocuments(query),
        ]);
        const now = new Date();
        const normalProducts = products.map(product => {
            if (
                product.promotion?.isActive &&
                product.promotion.endAt &&
                new Date(product.promotion.endAt) <= now
            ) {
                product.promotion.isActive = false;
                product.promotion.discount = 0;
                product.variants.forEach(variant => {
                    variant.options.forEach(option => {
                        option.finalPrice = option.originalPrice;
                    });
                });
            }
            return product;
        });
        const totalPages = Math.ceil(totalItems / limit)
        return {
            currentPage: page,
            totalItems,
            totalPages,
            limit,
            serverTime: now.toISOString(),
            products: normalProducts,
        };
    }
    async getOntime(isActive, page, limit) {
        const skip = (page - 1) * limit;
        const now = new Date()
        const hasActiveSale = !!(await productModel.exists({
            "promotion.isActive": true,
            "promotion.startAt": { $lte: now },
            "promotion.endAt": { $gt: now },
        }));
        console.log(">>> hasActiveSale", hasActiveSale)
        if (!hasActiveSale) {
            return {
                currentPage: page,
                totalItems: 0,
                products: [],
                serverTime: now.toISOString(),
                hasActiveSale,
            };
        }
        const query = isActive
            ? {
                "promotion.isActive": true,
                "promotion.startAt": { $lte: now },
                "promotion.endAt": { $gt: now },
            }
            : {};
        const [products, totalItems] = await Promise.all([
            productModel
                .find(query)
                .sort({ createdAt: -1 })
                .sort({ "promotion.discount": -1 })
                .skip(skip)
                .limit(limit),
            productModel.countDocuments(query),
        ]);
        console.log(products, "oooooooooo")
        return {
            currentPage: page,
            totalItems,
            products,
            serverTime: now.toISOString(),
            hasActiveSale
        }

    }
    async getProductById(id) {
        if (!id) {
            throw new BadRequest("Thiếu thông tin");
        }
        const data = await productModel.findById(id).populate("brandId")
            .populate("categoryId")
            .populate("subCategoryId");
        const now = new Date();
        if (
            data.promotion?.isActive &&
            data.promotion.endAt &&
            new Date(data.promotion.endAt) <= now
        ) {
            data.promotion.isActive = false;
            data.promotion.discount = 0;
            data.variants.forEach(variant => {
                variant.options.forEach(option => {
                    option.finalPrice = option.originalPrice;
                });
            });
        }
        return data;
    }
    async createProduct(data) {
        const { name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct } = data;

        if (!name || !brandId || !categoryId || !subCategoryId)
            throw new BadRequest("Thiếu thông tin");

        const slug = toSlug(name);

        const [existSlug, existBrand, existCategory, existSub] = await Promise.all([
            productModel.findOne({ slug }),
            brandModel.findById(brandId),
            categoryModel.findById(categoryId),
            subcategoryModel.findById(subCategoryId)
        ]);

        if (existSlug) throw new Conflict("Sản phẩm đã tồn tại");
        if (!existBrand) throw new NotFound("Không tìm thấy thương hiệu");
        if (!existCategory) throw new NotFound("Không tìm thấy danh mục");
        if (!existSub) throw new NotFound("Không tìm thấy danh mục phụ");

        if (!Array.isArray(variants) || variants.length === 0) {
            throw new BadRequest("Phải có ít nhất 1 variant");
        }
        if (!Array.isArray(images) || images.length === 0) {
            throw new BadRequest("Phải có ít nhất 1 ảnh");
        }

        const generateSku = variants.map((item) => ({
            color: item.color,
            options: item.options.map((op) => ({
                ...op,
                sku: `${toSlug(name).toUpperCase().slice(0, 3)}-${item.color ? item.color.toUpperCase().slice(0, 2) : "NO"
                    }-${String(op.value).replace('.', '')}-${nanoid(6).toUpperCase()}`,
                originalPrice: calcPrice(op),
                finalPrice: calcPrice(op, promotion.isActive ? promotion.discount : 0)
            }))
        }));
        let updatedPromotion = promotion;
        if (promotion?.isActive) {
            const start = new Date(promotion.startAt)
            const end = new Date(promotion.endAt);
            if (end <= start) {
                throw new BadRequest("Thời gian khuyến mãi không hợp lệ");
            }
            const diffMs = end.getTime() - start.getTime();
            const durationHours = Math.ceil(diffMs / (1000 * 60 * 60));
            const durationDays = Math.ceil(durationHours / 24);
            updatedPromotion = { ...updatedPromotion, durationHours, durationDays }
        }
        const newProduct = await productModel.create({
            slug,
            name,
            brandId,
            categoryId,
            subCategoryId,
            promotion: updatedPromotion,
            variants: generateSku,
            images,
            description,
            isFeatured: isFeatured || false,
            isNewProduct: isNewProduct || false,
            rating: 0,
            reviewCount: 0,
        });
        return newProduct
    }

    async updateProduct(id, data) {
        const { name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct } = data;

        const product = await productModel.findById(id);
        if (!product) throw new NotFound("Không tìm thấy sản phẩm");

        const [existBrand, existCategory, existSub] = await Promise.all([
            brandModel.findById(brandId),
            categoryModel.findById(categoryId),
            subcategoryModel.findById(subCategoryId),
        ]);

        if (!existBrand) throw new NotFound("Không tìm thấy thương hiệu");
        if (!existCategory) throw new NotFound("Không tìm thấy danh mục");
        if (!existSub) throw new NotFound("Không tìm thấy danh mục phụ");

        if (!Array.isArray(variants) || variants.length === 0)
            throw new BadRequest("Phải có ít nhất 1 variant");

        if (!Array.isArray(images) || images.length === 0)
            throw new BadRequest("Phải có ít nhất 1 ảnh");

        const generateSku = variants.map((item) => ({
            color: item.color,
            options: item.options.map((op) => ({
                ...op,
                sku: `${toSlug(name).toUpperCase().slice(0, 3)}-${toSlug(item.color ? item.color.toUpperCase().slice(0, 2) : "NO"
                )}-${String(op.value).replace('.', '')}-${nanoid(6).toUpperCase()}`,
                originalPrice: calcPrice(op),
                finalPrice: calcPrice(op, promotion.isActive ? promotion.discount : 0)
            }))
        }));
        let updatedPromotion = promotion;
        if (promotion?.isActive) {
            const start = new Date(promotion.startAt)
            const end = new Date(promotion.endAt);
            if (end <= start) {
                throw new BadRequest("Thời gian khuyến mãi không hợp lệ");
            }
            const diffMs = end.getTime() - start.getTime();
            const durationHours = Math.ceil(diffMs / (1000 * 60 * 60));
            const durationDays = Math.ceil(durationHours / 24);
            updatedPromotion = { ...updatedPromotion, durationHours, durationDays }
        }
        const mergedImg = [...images, ...product.images].filter(
            (v, i, arr) => arr.findIndex(t => t.url === v.url) === i
        );
        console.log(">>> mergedImg", mergedImg)
        const newSlug = name ? toSlug(name) : product.slug;
        return await productModel.findByIdAndUpdate(
            id,
            {
                slug: newSlug,
                name,
                brandId,
                categoryId,
                subCategoryId,
                promotion: updatedPromotion,
                variants: generateSku,
                images: mergedImg,
                description,
                isFeatured: isFeatured ?? product.isFeatured,
                isNewProduct: isNewProduct ?? product.isNewProduct,
            },
            { new: true }
        );
    }

    async deleteProduct(id) {
        const deleted = await productModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFound("Không tìm thấy sản phẩm");
        return deleted;
    }
    async uploadImgProduct(files) {
        if (!files || files.length === 0) {
            throw new BadRequest("Vui lòng chọn ảnh");
        }
        const up = files.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, {
                folder: "products",
            });
            // await fs.unlink(item.path);
            return { url: result.secure_url };
        });
        const results = await Promise.all(up);
        return results;

    }
    async removeImgProduct(id, url) {
        const product = await productModel.findById(id);
        if (!product) throw new NotFound("Không tìm thấy sản phẩm");
        console.log("URL RECEIVED:", url);
        console.log("DB IMAGES BEFORE:", product.images);
        const publicId = getPublicId(url);
        product.images = product.images.filter((item) => item.url !== url);
        console.log("DB IMAGES after:", product.images);
        product.markModified("images");
        await Promise.all([
            cloudinary.uploader.destroy(publicId),
            product.save()
        ]);
        return product.images;
    }
    async removeImgTem(url) {
        if (!url) throw new BadRequest("Thiếu URL");
        const publicId = getPublicId(url);
        console.log("publicId", publicId)
        await cloudinary.uploader.destroy(publicId);
        return url
    }
    async updateRating(id) {
        const [reviews, total] = await Promise.all([
            reviewModel.find({ productId: id }),
            reviewModel.countDocuments({ productId: id }),
        ]);

        const avgRating = total === 0 ? 0 :
            parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(2));

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { rating: avgRating, reviewCount: total },
            { new: true }
        );

        if (!updatedProduct) throw new NotFound("Không tìm thấy sản phẩm");

        return {
            avgRating,
            totalReviews: total,
            product: updatedProduct,
        };
    }
}

export default new ProductService();
