import banner from "../../assets/banner.jpg"
export const Banner = () => {
    return (
        <div className="relative">
            <div>
                <img src={banner} alt="" className="img" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-2xl left-16">
                <h2 className="font-bold text-[60px] text-white">
                    Shine Bright Like a Diamond
                </h2>
                <p className="font-extralight text-[18px] text-white mb-8">
                    Timeless jewelry crafted with purity & passion. Discover our exquisite collection of handcrafted pieces that celebrate life's precious moments.
                </p>
                <div className="space-x-3 flex">
                    <button className="btn border-none leading-6">
                        Shop Now
                    </button>
                    <button className="btn1 text-white leading-6">
                        Discover Collections
                    </button>
                </div>
            </div>
        </div>
    )
}
