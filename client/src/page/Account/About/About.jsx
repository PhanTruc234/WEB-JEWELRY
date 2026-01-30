import React from 'react'
import about_banner from "../../../assets/DIV-5.png"
import * as LucideIcons from "lucide-react";
import { ShieldAlert } from 'lucide-react'
export const About = () => {
    const heritageData = {
        heading: "Our Heritage Story",
        description: [
            "Founded in 1992 by master jeweler Marcus Liora, our journey began with a simple yet profound vision: to create jewelry that transcends trends and becomes treasured heirlooms for generations to come.",
            "What started as a small workshop in the heart of the jewelry district has grown into a renowned atelier, yet we've never lost sight of our core values - exceptional craftsmanship, personal service, and the belief that every piece of jewelry should tell a unique story.",
            "Today, under the guidance of the second generation, we continue to honor traditional techniques while embracing innovative design approaches, ensuring that each Liora creation is both timeless and contemporary."
        ],

        timeline: [
            {
                year: "1992",
                title: "Founded by Marcus Liora",
                description: "Started with traditional jewelry crafting techniques"
            },
            {
                year: "2010",
                title: "International Recognition",
                description: "Awarded Best Artisan Jewelry Designer"
            },
            {
                year: "2023",
                title: "Digital Innovation",
                description: "Launched AR preview and custom design platform"
            }
        ],

        images: [
            {
                src: "https://i0.wp.com/trangspa.vn/wp-content/uploads/2021/07/Che-tac-la-gi-trang-spa.jpg",
                caption: "Our Original Workshop - 1992"
            },
            {
                src: "https://cezan.edu.vn/uploads/910/90702880-6baa-4c3c-a0d7-a31b183e3549.jpeg"
            },
            {
                src: "https://mdjluxury.vn/wp-content/uploads/2018/08/xuong-MDJ.jpg"
            }
        ]
    };

    const valuesData = {
        heading: "Our Values & Principles",
        description:
            "These core values guide everything we do, from the selection of materials to the final polishing of each piece.",
        items: [
            {
                title: "Exceptional Quality",
                description:
                    "We source only the finest materials and employ rigorous quality standards to ensure every piece meets our exacting requirements.",
                icon: "Gem"
            },
            {
                title: "Artisan Craftsmanship",
                description:
                    "Each piece is meticulously handcrafted by skilled artisans who bring decades of experience to their work.",
                icon: "Hand"
            },
            {
                title: "Timeless Design",
                description:
                    "Our designs transcend fleeting trends, creating pieces that remain beautiful and relevant for generations.",
                icon: "Clock"
            },
            {
                title: "Personal Connection",
                description:
                    "We believe jewelry should tell your story, which is why we offer personalized service and custom design options.",
                icon: "Heart"
            },
            {
                title: "Trust & Integrity",
                description:
                    "Built on transparency and honesty, we provide detailed information about every stone and metal we use.",
                icon: "ShieldCheck"
            },
            {
                title: "Sustainable Practices",
                description:
                    "Committed to ethical sourcing and environmentally responsible practices in all aspects of our business.",
                icon: "Leaf"
            }
        ]
    };
    const data = {
        heading: "The Art of Craftsmanship",
        description: "From initial concept to final polish, each piece undergoes a meticulous process that combines traditional techniques with modern innovation to create jewelry of exceptional beauty and quality.",
        items: [
            {
                title: "Design & Concept",
                img: "https://bizweb.dktcdn.net/100/302/551/files/quy-trinh-che-tac-trang-suc-bac-4.jpg?v=1745295291062",
                paragraph: "Every piece begins with inspiration, carefully sketched and refined until the perfect design emerges.",
                list: [
                    {
                        text: "Handcrafted with precision and care"
                    },
                    {
                        text: "Quality checked at every stage"
                    },
                    {
                        text: "Backed by lifetime warranty"
                    }
                ]
            },
            {
                title: "Material Selection",
                img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
                paragraph:
                    "We carefully select the finest metals and gemstones, ensuring each material meets our exacting standards.",
                list: [
                    { text: "Handcrafted with precision and care" },
                    { text: "Quality checked at every stage" },
                    { text: "Backed by lifetime warranty" }
                ]
            },
            {
                title: "Expert Crafting",
                img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
                paragraph:
                    "Master craftsmen bring the design to life using time-honored techniques and modern precision tools.",
                list: [
                    { text: "Handcrafted with precision and care" },
                    { text: "Quality checked at every stage" },
                    { text: "Backed by lifetime warranty" }
                ]
            },
            {
                title: "Quality Assurance",
                img: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
                paragraph:
                    "Each piece undergoes rigorous inspection to ensure it meets our standards of perfection before delivery.",
                list: [
                    { text: "Handcrafted with precision and care" },
                    { text: "Quality checked at every stage" },
                    { text: "Backed by lifetime warranty" }
                ]
            }
        ]
    }
    const awardsData = {
        heading: "Recognition & Certifications",
        description:
            "Our commitment to excellence has been recognized by leading industry organizations, and we maintain the highest certifications to ensure quality and ethical standards.",
        sectionTitle: "Awards & Achievements",
        items: [
            {
                year: "2023",
                title: "Best Luxury Jewelry Brand",
                organization: "International Jewelry Awards",
                icon: "Trophy"
            },
            {
                year: "2022",
                title: "Excellence in Craftsmanship",
                organization: "American Gem Society",
                icon: "Medal"
            },
            {
                year: "2021",
                title: "Sustainable Jewelry Leader",
                organization: "Green Business Council",
                icon: "Leaf"
            },
            {
                year: "2020",
                title: "Designer of the Year",
                organization: "Jewelry Design Institute",
                icon: "Star"
            },
            {
                year: "2019",
                title: "Innovation in Custom Design",
                organization: "Jewelry Technology Summit",
                icon: "Lightbulb"
            },
            {
                year: "2018",
                title: "Customer Service Excellence",
                organization: "Retail Excellence Awards",
                icon: "Heart"
            },
            {
                year: "2017",
                title: "Heritage Preservation Award",
                organization: "Artisan Guild Society",
                icon: "Landmark"
            },
            {
                year: "2015",
                title: "Master Craftsman Recognition",
                organization: "International Artisan Council",
                icon: "Hammer"
            }
        ]
    };

    return (
        <div>
            <div className='w-full'>
                <img src={about_banner} alt="" className='w-full object-cover' />
            </div>
            <div className=''>
                <div className='relative mx-16'>
                    <div className='absolute -top-137.5 w-150  text-white'>
                        <h2 className='text-[48px] font-bold'>Crafting Timeless Elegance Since 1992</h2>
                        <p className='text-[18px] font-extralight mt-6'>For over three decades, Liora Jewelers has been synonymous with exceptional craftsmanship, uncompromising quality, and timeless design. Each piece we create tells a story of passion, precision, and the pursuit of perfection.</p>
                        <div className='mt-8 gap-4 flex'>
                            <button className='btn'>Our Collection</button>
                            <button className='bg-transparent border-white border btn'>Watch Our Story</button>
                        </div>
                    </div>
                </div>
                <div className='my-20 mx-16'>
                    <div className='grid grid-cols-2 gap-16 items-center'>
                        <div>
                            <div className='space-y-6'>
                                <h3 className='font-bold text-[36px] text-primary'>{heritageData.heading}</h3>
                                {heritageData.description.map((de) => (
                                    <p className='font-extralight'>{de}</p>
                                ))}
                            </div>
                            <div className='mt-12 space-y-4'>
                                {heritageData.timeline.map((time) => (
                                    <div className='flex items-center gap-4'>

                                        <div className="size-12 bg-primary rounded-full flex items-center justify-center text-[14px] font-bold text-white">
                                            <p>{time.year}</p>
                                        </div>
                                        <div>
                                            <h4 className='font-semibold'>{time.title}</h4>
                                            <p>{time.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='rounded-2xl overflow-hidden h-80 w-147'>
                                <img src={heritageData.images[0].src} alt="" className='w-full object-cover h-full' />
                            </div>
                            <div className='flex items-center gap-4'>
                                {heritageData.images.map((img, index) => {
                                    return (
                                        index >= 1 && <div className='w-71.5 h-50 rounded-2xl overflow-hidden'>
                                            <img src={img.src} alt="" className='w-full object-cover h-full' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white px-16 py-20'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[36px] text-primary'>{valuesData.heading}</h2>
                        <p className='font-extralight text-[18px] mt-2'>{valuesData.description}</p>
                    </div>
                    <div className='mt-16 grid grid-cols-3 gap-8'>
                        {valuesData.items.map((item) => {
                            const Icon = LucideIcons[item.icon]
                            return (
                                <div className='space-y-2 bg-[#FAF6F1] p-8 text-center rounded-xl'>
                                    <div className='flex justify-center'>
                                        <div className='size-16 rounded-full flex items-center justify-center bg-primary text-white'>
                                            {Icon && <Icon size={30} />}
                                        </div>
                                    </div>
                                    <h4 className='text-[20px] font-roboto font-semibold'>
                                        {item.title}
                                    </h4>
                                    <p className='font-extralight'>{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='mx-16 py-20'>
                    <div>
                        <div className='text-center space-y-2'>
                            <h2 className='font-bold text-[36px] text-primary'>{data.heading}</h2>
                            <p className='font-extralight w-3xl mx-auto'>{data.description}</p>
                        </div>
                        <div className='space-y-16 mt-16'>
                            {data.items.map((item, index) => {
                                return (
                                    index % 2 === 0 ?
                                        <div className='flex items-center gap-12'>
                                            <div className='min-w-149 h-100 rounded-2xl overflow-hidden'>
                                                <img src={item.img} alt="" className='w-full h-full object-cover' />
                                            </div>
                                            <div className='space-y-4'>
                                                <h2 className='font-bold text-[30px]'>{item.title}</h2>
                                                <p className='font-extralight text-[18px]'>{item.paragraph}</p>
                                                <ul className='space-y-2 font-extralight text-[14px] list-disc ml-4'>
                                                    {item.list.map((l) => (
                                                        <li>{l.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex items-center gap-12'>
                                            <div className='space-y-4'>
                                                <h2 className='font-bold text-[30px]'>{item.title}</h2>
                                                <p className='font-extralight text-[18px]'>{item.paragraph}</p>
                                                <ul className='space-y-2 font-extralight text-[14px] list-disc ml-4'>
                                                    {item.list.map((l) => (
                                                        <li>{l.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='min-w-149 h-100 rounded-2xl overflow-hidden'>
                                                <img src={item.img} alt="" className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='mx-16 py-20'>
                    <div>
                        <div className='text-center'>
                            <h2 className='font-bold text-[36px] text-primary'>{awardsData.heading}</h2>
                            <p className='font-extralight w-3xl mx-auto mt-2'>{awardsData.description}</p>
                        </div>
                        <div className='mt-16 text-center'>
                            <p className='font-bold text-[24px]'>{awardsData.sectionTitle}</p>
                        </div>
                        <div className='grid grid-cols-4 gap-6 mt-8'>
                            {awardsData.items.map((item, index) => {
                                const Icon = LucideIcons[item.icon];
                                return (
                                    <div key={index} className="bg-white rounded-xl p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A46A]">
                                            {Icon && <Icon size={22} color="#fff" />}
                                        </div>

                                        <p className="text-[#C8A46A] font-semibold">{item.year}</p>
                                        <h4 className="font-semibold mt-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.organization}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}