import React from 'react'
import { Route, Routes } from 'react-router'
import SignupPage from '@/page/Account/signup/SignupPage'
import LoginPage from '@/page/Account/login/LoginPage'
import { Collections } from '@/page/Account/Collections/Collections'
import { FilterProduct } from '@/page/Account/Collections/FilterProduct'
import { DetailProduct } from '@/page/Account/DetailProduct/DetailProduct'
import { Cart } from '@/page/Account/Cart/Cart'
import { CustomerChat } from '@/page/Account/CustomerChat/CustomerChat'
import { Compare } from '@/page/Account/Compare/Compare'
import { About } from '@/page/Account/About/About'
import { Home } from '@/page/Account/Home/Home'
import { LayoutAccount } from '@/layout/LayoutAccount/LayoutAccount'

export const RouterAccount = () => {
    return (
        <Routes>
            <Route path='/' element={<LayoutAccount />}>
                <Route path='sign-up' element={<SignupPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='collections' element={<Collections />} />
                <Route path='collections/:slug' element={<FilterProduct />} />
                <Route path='compare' element={<Compare />} />
                <Route path='product/detail/:id' element={<DetailProduct />} />
                <Route path='cart' element={<Cart />} />
                <Route path='chat-customer' element={<CustomerChat />} />
                <Route path='about' element={<About />} />
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}
