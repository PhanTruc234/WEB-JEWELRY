import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import couponModel from "../models/coupon.model.js";

class CouponService {
    async getCoupon(page, limit, search) {
        const skip = (page - 1) * limit
        const query = {
            $and: []
        };
        if (search) {
            query.$and.push({ "code": { $regex: search, $options: "i" } })
        }
        const [coupon, totalItems] = await Promise.all([
            await couponModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip),
            await couponModel.countDocuments(query)
        ])
        const totalPage = Math.ceil(totalItems / limit);
        return {
            currentPage: page,
            totalItems,
            totalPage,
            limit,
            coupon
        }
    }
    async createCoupon(code, discountType, discountValue, minOrderValue, startDate, endDate, isActive) {
        if (!code || !discountType || discountValue == null || minOrderValue == null) {
            throw new BadRequest("Thiếu thông tin")
        }
        if (discountValue <= 0) {
            throw new BadRequest("Giá trị giảm không hợp lệ");
        }

        if (discountType === "percent" && discountValue > 100) {
            throw new BadRequest("Giảm % không được vượt quá 100");
        }

        if (minOrderValue < 0) {
            throw new BadRequest("Giá trị đơn hàng tối thiểu không hợp lệ");
        }
        const exitCode = await couponModel.findOne({ code })
        if (exitCode) {
            throw new Conflict("Mã giảm giá đã tồn tại")
        }
        let l = {
            startDate: null,
            endDate: null
        }
        if (isActive) {
            if (endDate <= startDate) {
                throw new BadRequest("Thời gian khuyến mãi không hợp lệ");
            }
            l.startDate = startDate;
            l.endDate = endDate
        }
        const cou = await couponModel.create({
            code,
            discountType,
            discountValue,
            minOrderValue,
            startDate: l.startDate,
            endDate: l.endDate,
            isActive,
        })
        return cou
    }
    async updateCoupon(id, code, discountType, discountValue, minOrderValue, startDate, endDate, isActive) {
        if (!code || !discountType || discountValue == null || minOrderValue == null) {
            throw new BadRequest("Thiếu thông tin")
        }
        if (discountValue <= 0) {
            throw new BadRequest("Giá trị giảm không hợp lệ");
        }

        if (discountType === "percent" && discountValue > 100) {
            throw new BadRequest("Giảm % không được vượt quá 100");
        }

        if (minOrderValue < 0) {
            throw new BadRequest("Giá trị đơn hàng tối thiểu không hợp lệ");
        }
        const exitCode = await couponModel.findOne({
            code,
            _id: { $ne: id }
        });
        if (exitCode) {
            throw new Conflict("Mã giảm giá đã tồn tại");
        }
        let l = {
            startDate: null,
            endDate: null
        }
        if (isActive) {
            if (endDate <= startDate) {
                throw new BadRequest("Thời gian khuyến mãi không hợp lệ");
            }
            l.startDate = startDate;
            l.endDate = endDate
        }
        const cou = await couponModel.findByIdAndUpdate(id, {
            code,
            discountType,
            discountValue,
            minOrderValue,
            startDate: l.startDate,
            endDate: l.endDate,
            isActive,
        }, { new: true })
        if (!cou) {
            throw new NotFound("Không tìm thấy mã giảm giá");
        }
        return cou
    }
    async deleteCoupon(id) {
        const remove = await couponModel.findByIdAndDelete(id)
        if (!remove) {
            throw new NotFound("Không tìm thấy mã giảm giá để xóa")
        }
        return remove
    }
}
export default new CouponService()