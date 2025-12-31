import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AiSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        role: { type: String, enum: ["user", "assistant"], required: true },
        message: { type: String, required: true },
        intent: { type: String },
        entities: { type: Object },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model("ai", AiSchema);