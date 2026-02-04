import React from 'react'

export const Stay = () => {
    return (
        <div className='px-7.5 mb-16'>
            <div className='bg-linear-to-r from-primary/20 to-secondary/20 text-center rounded-xl p-12'>
                <div className='space-y-4'>
                    <h3 className='font-h3'>Stay in Touch</h3>
                    <p className='font-p'>Be the first to know about new collections, exclusive offers, and jewelry care tips</p>
                    <div className='space-x-4'>
                        <input type="text" name="" id="" placeholder='Enter your email address' className='bg-white py-4.25 px-6.25 rounded-full' />
                        <button className='btn'>Subscribe</button>
                    </div>
                    <p className='font-p'>We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
        </div>
    )
}
