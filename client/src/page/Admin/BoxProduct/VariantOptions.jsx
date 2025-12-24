import { formatBigNumber } from '@/lib/format-big-number'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

export const VariantOptions = ({ control, register, variantsIndex, discount, isActive }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `variants.${variantsIndex}.options`
    })
    const pricePerGram = {
        "24K": 2000000,
        "18K": 1500000,
        "14K": 1200000,
        "925": 40000
    };
    const option = useWatch({
        control,
        name: `variants.${variantsIndex}.options`
    }) || []
    console.log(discount, ">>> discount")
    return (
        <div className="space-y-4">
            <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-80 transition cursor-pointer"
                onClick={() =>
                    append({
                        type: "NONE",
                        value: "",
                        stockQuantity: "",
                    })
                }
            >
                + Add Option
            </button>
            {fields.map((item, index) => {
                const type = option[index]?.type || "NONE"
                const value = option[index]?.value
                const purity = option[index]?.purity
                console.log("puritypurity", purity)
                return (
                    <div
                        key={item.id}
                        className="border rounded-2xl p-4 bg-white shadow-sm space-y-4"
                    >
                        <div className="grid grid-cols-3 gap-4">
                            <select
                                {...register(
                                    `variants.${variantsIndex}.options.${index}.type`
                                )}
                                className="border rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="NONE">No Size</option>
                                <option value="CARAT">Carat</option>
                                <option value="GRAM">Gram</option>
                                <option value="MM">MM</option>
                            </select>

                            {type === "CARAT" && (
                                <input
                                    type="text"
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    placeholder="Carat (e.g. 1.0)"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />
                            )}

                            {type === "GRAM" && (
                                <input
                                    type="text"
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    placeholder="Gram (e.g. 2.5)"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />
                            )}

                            {type === "MM" && (
                                <select
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    className="border rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">--- Chọn ---</option>
                                    {[4, 6, 8, 10, 12, 14, 16].map((mm) => (
                                        <option value={mm} key={mm}>
                                            {mm} mm
                                        </option>
                                    ))}
                                </select>
                            )}

                            {type === "NONE" && (
                                <input
                                    disabled
                                    placeholder="No size"
                                    className="border rounded-lg px-3 py-2 bg-gray-100 text-sm"
                                />
                            )}

                            {type === "GRAM" && (
                                <select
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.purity`
                                    )}
                                    className="border rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">--- Độ tinh khiết ---</option>
                                    <option value="24K">24K</option>
                                    <option value="18K">18K</option>
                                    <option value="14K">14K</option>
                                    <option value="925">Bạc 925</option>
                                </select>
                            )}
                        </div>
                        {(type === "CARAT" || type === "GRAM" || type === "MM") && (
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                                {type === "CARAT" && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(2500000, true)}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? 2500000 * value -
                                                    (2500000 * value * discount) / 100
                                                    : 2500000 * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )}
                                {type === "GRAM" && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                pricePerGram[`${purity}`],
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? pricePerGram[`${purity}`] * value -
                                                    (pricePerGram[`${purity}`] * value * discount) / 100
                                                    : pricePerGram[`${purity}`] * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )}

                                {type === "MM" && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(10000, true)}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? 10000 * value - (10000 * value * discount) / 100
                                                    : 10000 * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                {...register(
                                    `variants.${variantsIndex}.options.${index}.stockQuantity`
                                )}
                                placeholder="Stock"
                                className="border rounded-lg px-3 py-2 text-sm w-40"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700 cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
