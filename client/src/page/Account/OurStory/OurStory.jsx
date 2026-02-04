import React, { useEffect, useState } from 'react'
import person from "../../assets/IMG-221.png"
import { commonStore } from '@/store/commonStore/commonStore'
import { useInView } from '@/lib/useInView'

export const OurStory = () => {
    const { value } = commonStore()
    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    const { inView, ref } = useInView()
    useEffect(() => {
        if (inView) {
            const timer = setInterval(() => {
                setCount(prev => prev + 1 < 30 ? prev + 1 : 30)
                setCount1(prev => prev + 1 < 50 ? prev + 1 : 50)
                setCount2(prev => prev + 1 < 100 ? prev + 1 : 100)
            }, 50)
            return () => clearInterval(timer)
        } else {
            setCount(0)
            setCount1(0)
            setCount2(0)
        }
    }, [inView])
    return (
        <div className='px-7.5' ref={ref}>
            <div className='grid grid-cols-2 gap-16'>
                <div className='w-full h-117 rounded-2xl overflow-hidden'>
                    <img src={person} alt="" className='w-full h-117 object-cover' />
                </div>
                <div>
                    <h3 className='text-[36px] font-bold mb-6'>Our Story</h3>
                    <div className='space-y-4 mb-6'>
                        <p className='font-light font-roboto'>For over three decades, Liora Jewelers has been synonymous with exceptional craftsmanship and timeless elegance. Founded in 1990 by master jeweler Elena Liora, our legacy began with a simple vision: to create jewelry that captures life's most precious moments.</p>
                        <p className='font-light font-roboto'>Each piece in our collection tells a story of dedication, artistry, and passion. Our skilled craftsmen combine traditional techniques with modern innovation, using only the finest materials sourced from trusted partners around the world.</p>
                        <p className='font-light font-roboto'>From engagement rings that symbolize eternal love to statement pieces that celebrate personal achievements, we believe that jewelry should be as unique and beautiful as the moments they commemorate.</p>
                    </div>
                    <div className='grid grid-cols-3 gap-6 mb-6'>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count}+</p>
                            <p className='text-[14px] font-roboto font-light'>Years of Excellence</p>
                        </div>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count1}K+</p>
                            <p className='text-[14px] font-roboto font-light'>Happy Customers</p>
                        </div>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count2}+</p>
                            <p className='text-[14px] font-roboto font-light'>Unique Designs</p>
                        </div>
                    </div>
                    <div>
                        <button className='btn'>Learn More About Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
