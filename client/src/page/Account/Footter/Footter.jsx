import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'

export const Footter = () => {
    return (
        <div className='container grid grid-cols-5 gap-8'>
            <div className="space-y-3">
                <h2 className='font-luxurious text-[30px] text-secondary'>Liora Jewelry</h2>
                <p className='font-li'>Crafting timeless jewelry with passion and precision for over 30 years. Each piece tells a story of elegance and excellence.</p>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Facebook size={16} />
                    </div>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Instagram size={16} />
                    </div>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Twitter size={16} />
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Company</h2>
                <ul className="space-y-3">
                    <li className="font-li">About Us</li>
                    <li className="font-li">Our Story</li>
                    <li className="font-li">Careers</li>
                    <li className="font-li">Press</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Collections</h2>
                <ul className="space-y-3">
                    <li className="font-li">Engagement Rings</li>
                    <li className="font-li">Wedding Bands</li>
                    <li className="font-li">Necklaces</li>
                    <li className="font-li">Earrings</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Support</h2>
                <ul className="space-y-3">
                    <li className="font-li">Contact Us</li>
                    <li className="font-li">Size Guide</li>
                    <li className="font-li">Care Instructions</li>
                    <li className="font-li">Warranty</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Stay Updated</h2>
                <p className="font-li">Subscribe to our newsletter for exclusive offers and updates.</p>
                <div className='space-y-3'>
                    <input type="text" name="" id="" placeholder='Your Email' className='py-2.25 px-4.25 rounded-full border-none bg-white focus:border-none block w-full' />
                    <button className='btn py-2.25 px-4.25 bg-secondary block w-full'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}
