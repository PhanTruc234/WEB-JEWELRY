import conversationModel from "../models/conversation.model.js"

class ConsercationService {
    async getAllMessage(page, limit) {
        const skip = (page - 1) * limit
        const [messages, totalItems] = await Promise.all([
            conversationModel
                .find().populate("userId")
                .limit(limit)
                .skip(skip)
                .sort({ updatedAt: -1 }),
            conversationModel.countDocuments()
        ])
        const totalPages = Math.ceil(totalItems / limit);
        return {
            page,
            limit,
            totalItems,
            totalPages,
            messages
        };
    }
    async getMessageId(userId) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const mess = await conversationModel.findOne({ userId }).populate("userId")
        return mess
    }
}
export default new ConsercationService()