import { BadRequest, Forbidden, NotFound } from "../core/error.response.js";
import productModel from "../models/product.model.js";
import reviewModel from "../models/review.model.js";
class ReviewService {
    async getAllReview(productId, page, limit) {
        const skip = (page - 1) * limit;
        const [allReview, totalItem] = await Promise.all([
            reviewModel
                .find({ productId })
                .populate("userId", "fullName avatar")
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 }),

            reviewModel.countDocuments({ productId })
        ]);
        const totalPage = Math.ceil(totalItem / limit);
        return {
            currentPage: page,
            totalItem,
            totalPage,
            limit,
            review: allReview
        };
    }
    async createReview(productId, userId, rating, comment) {
        if (!productId || !userId || !rating) {
            throw new BadRequest("Thiếu");
        }
        const [product, user] = await Promise.all([
            productModel.findById(productId),
            userModel.findById(userId)
        ]);
        if (!product) {
            throw new NotFound("Không tìm thấy sản phẩm");
        }
        if (!user) {
            throw new NotFound("Không tìm thấy người dùng");
        }
        const newComment = await reviewModel.create({
            productId,
            userId,
            rating,
            comment
        });
        return newComment
    }
    async updateReview(id, rating, comment, userId) {
        const findComment = await reviewModel.findById(id);
        if (!findComment) {
            throw new NotFound("Không tìm thấy bình luận");
        }

        if (findComment.userId.toString() !== userId) {
            throw new Forbidden("Bạn không có quyền sửa bình luận này");
        }

        const updatedReview = await reviewModel.findByIdAndUpdate(
            id,
            { rating, comment },
            { new: true }
        );
        return updatedReview;
    }
    async deleteReview(id, userId) {
        const findComment = await reviewModel.findById(id);
        if (!findComment) {
            throw new NotFound("Không tìm thấy bình luận");
        }

        if (findComment.userId.toString() !== userId) {
            throw new Forbidden("Bạn không có quyền xóa bình luận này");
        }
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        return deletedReview
    }
}
export default new ReviewService()