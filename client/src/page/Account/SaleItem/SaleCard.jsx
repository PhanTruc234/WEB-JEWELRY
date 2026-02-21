import { useCountdown } from "@/hooks/CountDown/useCountDown";
import React from "react";

export const SaleCard = React.memo(({ product }) => {
    const time = useCountdown(product?.promotion?.endAt);
    const img = product.images.find(i => i.isMain);
    return (
        <div className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300">

            <div className="absolute top-0 left-0 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-br-xl shadow">
                -{product.promotion.discount}%
            </div>

            <div className="absolute top-0 right-0 z-10 bg-yellow-300 text-red-700 text-xs font-bold px-3 py-1 rounded-bl-xl">
                {time}
            </div>

            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={img?.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
            </div>

            <div className="p-4">
                <h3 className="text-sm font-medium line-clamp-2 min-h-10">
                    {product.name}
                </h3>
            </div>
        </div>
    );
});