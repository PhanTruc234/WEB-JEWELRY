import React from 'react'
import { Route, Routes } from 'react-router'
import { ProtectAdminRouter } from '../Protect/ProtectAdmin'
import { LayoutAdmin } from '@/layout/LayoutAdmin/LayoutAdmin'
import { CategoryPage } from '@/page/Admin/category'
import { BrandPage } from '@/page/Admin/Brand'
import { SubcategoryPage } from '@/page/Admin/subcategory'
import { AddProduct } from '@/page/Admin/product/addProduct'
import { Product } from '@/page/Admin/product/product'
import { EditProduct } from '@/page/Admin/product/editProduct'
import { AdminChat } from '@/page/Admin/AdminChat/AdminChat'
export const RouterAdmin = () => {
    return (
        <Routes>
            <Route element={<ProtectAdminRouter />}>
                <Route element={<LayoutAdmin />}>
                    <Route path="dashboard" element={<div>dashboard</div>} />
                    <Route path="product-manage/category" element={<CategoryPage />} />
                    <Route path="product-manage/subcategory" element={<SubcategoryPage />} />
                    <Route path="product-manage/brand" element={<BrandPage />} />
                    <Route path="product-manage/products" element={<Product />} />
                    <Route path="product-manage/products/add" element={<AddProduct />} />
                    <Route path="product-manage/products/edit/:id" element={<EditProduct />} />
                    <Route path="order-manage/orders" element={<div>order</div>} />
                    <Route path="order-manage/cart" element={<div>cart</div>} />
                    <Route path="user-manage/users" element={<div>users</div>} />
                    <Route path="user-manage/reviews" element={<div>reviews</div>} />
                    <Route path="coupons" element={<div>coupon</div>} />
                    <Route path="settings" element={<div>settings</div>} />
                    <Route path='chat' element={<AdminChat />} />
                </Route>
            </Route>
        </Routes>
    )
}
