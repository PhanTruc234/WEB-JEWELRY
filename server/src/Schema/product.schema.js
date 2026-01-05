import z from "zod";
import { objectIdSchema } from "./commonSchema.js";
export const imageSchema = z.object({
    url: z.string().url("URL ảnh không hợp lệ"),
    isMain: z.boolean().optional(),
});
export const createProductShema = z.object({
    name: z.string().min(1, "Thiếu tên"),
    brandId: objectIdSchema.shape.id,
    categoryId: objectIdSchema.shape.id,
    subCategoryId: objectIdSchema.shape.id,
    promotion: z
        .object({
            isActive: z.boolean(),
            discount: z.coerce
                .number()
                .refine(n => Number.isFinite(n), "Giảm giá không hợp lệ")
                .gt(0)
                .lt(100)
                .optional(),
            startAt: z.coerce.date().optional(),
            endAt: z.coerce.date().optional(),
        })
        .optional()
        .superRefine((data, ctx) => {
            if (!data || !data.isActive) return;
            if (!data.discount || isNaN(Number(data.discount))) {
                ctx.addIssue({
                    path: ["discount"],
                    message: "Giảm giá phải là số",
                });
                return;
            }
            if (!(data.startAt instanceof Date)) {
                ctx.addIssue({
                    path: ["startAt"],
                    message: "Chọn ngày bắt đầu",
                });
            }

            if (!(data.endAt instanceof Date)) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Chọn ngày kết thúc",
                });
            }

            if (
                data.startAt instanceof Date &&
                data.endAt instanceof Date &&
                data.endAt <= data.startAt
            ) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Ngày kết thúc phải sau ngày bắt đầu",
                });
            }
        }),
    variants: z.array(
        z.object({
            color: z.string().min(1, "Chưa nhập màu"),
            options: z.array(
                z.object({
                    type: z.enum(["CARAT", "GRAM", "MM", "NONE"]),
                    value: z.coerce.number().optional(),
                    purity: z.string().nullable().optional(),
                    stockQuantity: z.coerce.number().min(0, "Số lượng phải ≥ 0"),
                }).refine(
                    (data) => {
                        if (data.type === "NONE") {
                            return data.value === undefined && data.purity === undefined;
                        }
                        return true;
                    },
                    {
                        message: "Không được nhập value / purity khi type là NONE",
                        path: ["value"],
                    }
                )
            ).min(1, "Ít nhất phải có 1 giá trị"),
        })
    ).min(1, "Ít nhất phải có 1 biến thể"),
    images: z.array(imageSchema).min(1, "Phải có ít nhất 1 ảnh"),
    description: z.string().min(1, "Thiếu mô tả"),
    isFeatured: z.boolean().optional(),
    isNewProduct: z.boolean().optional()
})
export const updateProductSchema = createProductShema;