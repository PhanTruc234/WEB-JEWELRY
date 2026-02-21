import { useCountdown } from "@/hooks/CountDown/useCountDown";
import React from "react";

export const SaleList = React.memo(({ product }) => {
    const time = useCountdown(product?.promotion?.endAt);
    const img = product.images.find(i => i.isMain);
    return (
        <div className="relative flex gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-md transition">
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <img
                    src={img?.url}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 text-[11px] bg-red-500 text-white px-2 py-0.5 rounded-br-md font-semibold">
                    -{product.promotion.discount}%
                </div>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
                <h3 className="text-sm font-medium leading-tight line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-muted-foreground">
                        Kết thúc sau
                    </span>

                    <span className="text-xs font-bold text-red-600 tabular-nums">
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
});