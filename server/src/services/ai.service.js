import { BadRequest } from "../core/error.response.js";
import aiModel from "../models/ai.model.js";

class AiService {
    async createMessage({
        userId,
        role = "user",
        message,
        intent = null,
        entities = null,
    }) {
        if (!userId || !message) {
            throw new BadRequest("Thiếu thông tin");
        }
        return aiModel.create({
            userId,
            role,
            message,
            intent,
            entities,
        });
    }
}

export default new AiService();
