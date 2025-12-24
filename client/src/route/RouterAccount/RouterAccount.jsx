import React from 'react'
import { Route, Routes } from 'react-router'
import { LayoutAccount } from '../../layout/LayoutAccount/LayoutAccount'
import { Home } from '../../page/Home/Home'
import SignupPage from '@/page/signup/SignupPage'
import LoginPage from '@/page/login/LoginPage'

export const RouterAccount = () => {
    return (
        <Routes>
            <Route path='/' element={<LayoutAccount />}>
                <Route path='sign-up' element={<SignupPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}
