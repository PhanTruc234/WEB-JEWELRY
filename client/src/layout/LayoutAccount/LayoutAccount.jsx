import React from 'react'
import { Header } from '../../page/Header/Header'
import { Outlet } from 'react-router'

export const LayoutAccount = () => {
    return (
        <div>
            <header className='bg-primary py-3 px-16'>
                <Header />
            </header>
            <main className="bg-main">
                <Outlet />
            </main>
            <footer>

            </footer>
        </div>
    )
}
