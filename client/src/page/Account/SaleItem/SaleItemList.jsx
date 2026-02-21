import { useCountdown } from '@/hooks/CountDown/useCountDown'
import { useGetListOnTime } from '@/hooks/ProductOnTime/useGetListOnTime'
import { formatBigNumber } from '@/lib/format-big-number'
import { PaginationCustom } from '@/lib/PaginationCustom'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { SaleCard } from './SaleCard'

export const SaleItemList = () => {
    const [valuePage, setValuePage] = useState(1)
    const { productOnTimes, isLoading, refreshOnTime } = useGetListOnTime({
        page: valuePage,
        limit: 3,
        isActive: true
    })
    console.log(productOnTimes, "productOnTimesproductOnTimesproductOnTimes")
    const handleChangePage = (e, value) => {
        setValuePage(value)
    }
    return (
        <div className='p-16'>
            <h2 className='text-[36px] font-bold text-center text-primary mb-6'>Danh sách sản phẩm đang giảm giá</h2>
            {productOnTimes?.data?.data?.hasActiveSale && (
                <div className="grid grid-cols-3 gap-6">
                    {productOnTimes?.data?.data?.products.map((product) => (
                        <SaleCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            <PaginationCustom total={productOnTimes?.data?.data?.totalItems} valuePage={valuePage} handleChangePage={handleChangePage} limit={6} />
        </div>
    )
}
