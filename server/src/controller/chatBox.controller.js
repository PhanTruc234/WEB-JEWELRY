import { parseIntent } from "../AI/parseIntent.js";
import productModel from "../models/product.model.js";
import aiService from "../services/ai.service.js";
class chatBoxController {
    chatBox = async (req, res) => {
        try {
            const { message } = req.body;
            const userId = req.user.id;

            if (!message || !userId) {
                return res.status(400).json({ message: "Message or userId missing" });
            }
            const intentData = await parseIntent(message);
            if (!intentData || !intentData.intent) {
                return res.json({
                    answer: "Mình chưa hiểu rõ câu hỏi, bạn nói lại giúp mình nhé 🙂",
                });
            }
            await aiService.createMessage({
                userId,
                role: "user",
                message,
                intent: intentData.intent,
                entities: intentData.entities,
            });

            let response;
            switch (intentData.intent) {
                case "GREETING":
                    response = { answer: "Chào bạn 👋 Mình có thể giúp gì?" };
                    break;

                case "ASK_SHIPPING":
                    response = { answer: "Shop giao hàng từ 2–4 ngày 🚚" };
                    break;

                case "ASK_PAYMENT":
                    response = {
                        answer: "Shop hỗ trợ COD, MoMo và chuyển khoản 💳",
                    };
                    break;
                case "SEARCH_PRODUCT": {
                    const { category, material, priceMax } = intentData.entities;
                    const pipeline = [];
                    pipeline.push({
                        $lookup: {
                            from: "categories",
                            localField: "categoryId",
                            foreignField: "_id",
                            as: "category"
                        }
                    });
                    pipeline.push({ $unwind: "$category" });
                    if (category) {
                        pipeline.push({
                            $match: {
                                "category.name": { $regex: category, $options: "i" }
                            }
                        });
                    }
                    if (material) {
                        pipeline.push({
                            $match: {
                                "variants.options.purity": { $regex: material, $options: "i" }
                            }
                        });
                    }
                    if (priceMax) {
                        pipeline.push({
                            $match: {
                                "variants.options.finalPrice": { $lte: priceMax }
                            }
                        });
                    }
                    pipeline.push({ $limit: 5 });
                    const products = await productModel.aggregate(pipeline);
                    response = products.length
                        ? {
                            answer: `Mình tìm được ${products.length} sản phẩm phù hợp 👇`,
                            products,
                        }
                        : {
                            answer: "Hiện tại shop chưa có sản phẩm phù hợp 😢",
                            products: [],
                        };

                    break;
                }
                default:
                    response = {
                        answer: "Mình chưa hiểu rõ, bạn nói chi tiết hơn giúp mình nha 🙂",
                    };
            }
            await aiService.createMessage({
                userId,
                role: "assistant",
                message: response.answer,
            });
            return res.json(response);
        } catch (err) {
            console.error("CHATBOX ERROR >>>", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
}
export default new chatBoxController();
