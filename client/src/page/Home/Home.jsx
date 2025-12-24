import React from 'react'
import { Banner } from '../Banner/Banner'
import { Service } from '../ServiceShip/service'
import { SaleItem } from '../SaleItem/SaleItem'
import { BestSeller } from '../BestSeller/BestSeller'
import { OurStory } from '../OurStory/OurStory'
import { Featured } from '../Featured/Featured'
import { Stay } from '../Stay/Stay'

export const Home = () => {
    return (
        <div>
            <Banner />
            <Service />
            <SaleItem />
            <BestSeller />
            <OurStory />
            <Featured />
            <Stay />
        </div>
    )
}
