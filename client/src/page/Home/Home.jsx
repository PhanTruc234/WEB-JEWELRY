import React, { useState } from 'react'
import { Banner } from '../Banner/Banner'
import { Service } from '../ServiceShip/service'
import { SaleItem } from '../SaleItem/SaleItem'
import { BestSeller } from '../BestSeller/BestSeller'
import { OurStory } from '../OurStory/OurStory'
import { Featured } from '../Featured/Featured'
import { Stay } from '../Stay/Stay'
import { ChatBox } from '../Account/ChatBox/ChatBox'
import { Bot } from 'lucide-react'
import { commonStore } from '@/store/commonStore/commonStore'

export const Home = () => {
    const { setShowBot, showBot } = commonStore()
    return (
        <div className='relative'>
            <Banner />
            <Service />
            <SaleItem />
            <BestSeller />
            <OurStory />
            <Featured />
            <Stay />
            <div className='bottom-20 fixed right-13'>
                {showBot ? <ChatBox /> : <div className='bg-secondary rounded-full  w-12.5 h-12.5 flex items-center justify-center cursor-pointer'><Bot onClick={() => setShowBot(true)} size={30} className=' text-white' /></div>}
            </div>
        </div>
    )
}
