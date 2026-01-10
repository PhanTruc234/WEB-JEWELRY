import { useGetListCart } from '@/hooks/Cart/useGetListCart'
import { formatBigNumber } from '@/lib/format-big-number'
import { CartStore } from '@/store/cartStore/CartStore'
import React, { useState } from 'react'
import no_cart from "../../../assets/8a585d5429182bff2cea56bc9a9b8be0.jpg"
import { Trash2 } from 'lucide-react'
export const Cart = () => {
    const { carts, refreshCart, isLoading } = useGetListCart({
        page: 1, limit: 3
    })
    const { updateCart, deleteCart } = CartStore()
    const handleUpdateQty = async (item, type) => {
        const newQty =
            type === "inc" ? item.quantity + 1 : item.quantity - 1

        if (newQty < 1) return
        await updateCart(item.sku, newQty)
        await refreshCart()
    }
    const handleDelete = async (sku) => {
        await deleteCart(sku);
        await refreshCart()
    }
    console.log(carts, "cartscarts")
    return (
        <div className='my-40 relative min-h-screen'>
            {carts?.data?.data?.data?.length > 0 ? <h2 className='text-center mb-6 font-bold text-[28px] text-primary'>Giỏ hàng của bạn</h2> : ""}
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            {carts?.data?.data?.data?.length > 0 ? <div className='flex justify-center gap-12'>
                <div className='space-y-4'>
                    {carts?.data?.data?.data?.map((i) => {
                        const img = i?.productId?.images?.find((im) => im.isMain)
                        return (
                            <div className='w-175 bg-white shadow-2xl p-6 rounded-xl'>
                                <div className='flex gap-4'>
                                    <div className='w-30 h-30 rounded-xl overflow-hidden'>
                                        <img src={img?.url} alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex items-center justify-between flex-1'>
                                        <div className='space-y-2'>
                                            <p className='font-bold'>{i.productId.name}</p>
                                            <div className='flex items-center gap-2 font-light text-[14px]'>
                                                <p>{i.type}</p>
                                                <p>{i.value}</p>
                                                <p>{i.purity && i.purity}</p>
                                            </div>
                                            <div className='font-medium text-primary'>
                                                {formatBigNumber(i.unitPrice, true)}
                                            </div>
                                        </div>
                                        <div className='flex items-center rounded-full p-2 gap-4 bg-[#E7EDEE]'>
                                            <p className={`w-7.5 h-7.5 bg-secondary flex justify-center items-center text-white rounded-full text-[20px] ${i.quantity === 1 ? "pointer-events-none" : "cursor-pointer"}`} onClick={() => handleUpdateQty(i, "dec")}>-</p>
                                            <p>{i.quantity}</p>
                                            <p className='w-7.5 h-7.5 bg-secondary flex items-center justify-center text-white rounded-full text-[20px] cursor-pointer' onClick={() => handleUpdateQty(i, "inc")}>+</p>
                                        </div>
                                        <div className='w-10 h-10 bg-secondary flex justify-center items-center text-white rounded-full text-[20px] p-2 cursor-pointer' onClick={() => handleDelete(i.sku)}>
                                            <Trash2 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <div className="w-[320px] rounded-xl bg-white p-5 shadow-lg h-full">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">
                            Tổng đơn hàng
                        </h3>
                        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                            <span>Tổng phụ {carts?.data?.data?.data?.length}</span>
                            <span className="font-medium text-gray-800">{formatBigNumber(carts?.data?.data?.toatlPrice, true)}</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                            <span>Vận chuyển</span>
                            <span className="font-medium text-gray-800">Miễn phí</span>
                        </div>
                        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                            <span>Thuế ước tính</span>
                            <span className="font-medium text-gray-800">{formatBigNumber(carts?.data?.data?.tax ? carts?.data?.data?.tax : 0, true)}</span>
                        </div>

                        <div className="my-4 h-px w-full bg-gray-200" />
                        <div className="mb-5 flex items-center justify-between text-sm font-semibold">
                            <span className="text-gray-800">Tổng</span>
                            <span className="text-primary">{formatBigNumber(carts?.data?.data?.total ? carts?.data?.data?.total : 0, true)}</span>
                        </div>
                        <button className="mb-3 w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:opacity-90">
                            Tiến hành thanh toán
                        </button>

                        <button className="w-full rounded-lg border border-primary py-3 text-sm font-medium text-primary transition hover:bg-primary/10">
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div> : <div className='flex items-center justify-center'>
                <img src={no_cart} alt="" /></div>}
        </div>
    )
}
