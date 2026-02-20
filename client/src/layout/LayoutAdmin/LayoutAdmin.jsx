import { UserAuthStore } from "@/store/userAuthStore";
import {
    Anvil,
    Layers,
    // ChartColumnBig,
    // ChartColumnStacked,
    GitBranch,
    ChevronDown,
    FilePenLine,
    BadgeCheck,
    Gem,
    House,
    ListIndentDecrease,
    Headset,
    ListIndentIncrease,
    ListOrdered,
    ClipboardCheck,
    Package,
    Receipt,
    LogOut,
    MessageSquareMore,
    MessageSquareText,
    Star,
    FolderTree,
    Settings,
    ShoppingBag,
    ShoppingCart,
    TicketPercent,
    User,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { ChatNotifyStore } from "@/store/ChatNotifyStore/ChatNotifyStore";
import { socket } from "@/socket";
import { API_CHAT_HASUNREAD } from "@/api/api";
import axios from "axios";
import axiosClient from "@/service/axiosClient";

export const LayoutAdmin = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDropDown, setIsDropDown] = useState(false)
    const [isDropDown2, setIsDropDown2] = useState(false)
    const [isDropDown3, setIsDropDown3] = useState(false)
    const [isDropDown4, setIsDropDown4] = useState(false)
    const [isDropDown5, setIsDropDown5] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const hasUnread = ChatNotifyStore(state => state.hasUnread);
    console.log(hasUnread, "hasUnreadhasUnreadhasUnread")
    const user = localStorage.getItem("user")
    const dataUser = user ? JSON.parse(user) : null;
    const { logout } = UserAuthStore();
    const handleLogout = async () => {
        await logout()
    }
    const onNotify = async () => {
        const res = await axiosClient.get(API_CHAT_HASUNREAD);
        console.log(res, "jfnbjfnbjfnb")
        if (res.data?.data?.hasUnread) {
            ChatNotifyStore.getState().markUnread();
        } else {
            ChatNotifyStore.getState().clearUnread();
        }
    };
    useEffect(() => {
        socket.emit("join_admin");
        onNotify();
        socket.on("admin_message_notify", onNotify);
        return () => socket.off("admin_message_notify", onNotify);
    }, []);
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <nav
                className={`bg-primary text-white min-h-screen flex flex-col justify-between transition-all duration-300 ease-in-out ${isOpen ? "w-70" : "w-17.5"
                    }`}
            >
                <div className="">
                    <div className="flex justify-between items-center mb-8 p-4">
                        {isOpen ? (
                            <>
                                <h2 className='font-luxurious text-[36px] text-secondary'>Liora Jewelry</h2>
                                <ListIndentDecrease
                                    className="size-6 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                />
                            </>
                        ) : (
                            <div className="w-full flex justify-center pr-4">
                                <ListIndentIncrease
                                    className="size-6 cursor-pointer"
                                    onClick={() => setIsOpen(true)}
                                />
                            </div>
                        )}
                    </div>
                    <Link to={"/admin/dashboard"} className="flex items-center gap-2 cursor-pointer  hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out">
                        <House className="size-5" />
                        {isOpen && <span>Dashboard</span>}
                    </Link>

                    <div>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out" onClick={() => setIsDropDown(!isDropDown)} >
                            <div className="flex items-center gap-2">
                                <FolderTree className="size-5" />
                                {isOpen && <p>Quản lý danh mục</p>}
                            </div>
                            {isOpen && <ChevronDown className="size-5 cursor-pointer" />}
                        </div>
                        {isOpen && (
                            <div className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ${isDropDown ? "max-h-125" : "max-h-0"
                                }`}>
                                <Link to={"/admin/product-manage/category"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <Layers className="size-5" />
                                    Loại sản phẩm
                                </Link>
                                <Link to={"/admin/product-manage/brand"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <BadgeCheck className="size-5" />
                                    Thương hiệu
                                </Link>
                                <Link to={"/admin/material-manage/material"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <Anvil className="size-5" />
                                    Quản lý vật liệu
                                </Link>
                                <Link to={"/admin/material-manage/gem"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <Gem className="size-5" />
                                    Quản lý đá quý
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out" onClick={() => setIsDropDown2(!isDropDown2)} >
                            <div className="flex gap-2 items-center">
                                <ListOrdered className="size-5" />
                                {isOpen && <p>Quản lý sản phẩm</p>}
                            </div>
                            {isOpen && <ChevronDown className="size-5" />}
                        </div>
                        {isOpen && (
                            <div className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ${isDropDown2 ? "max-h-125" : "max-h-0"
                                }`}>
                                <Link to={"/admin/product-manage/products"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <ShoppingBag className="size-5" />
                                    Danh sách sản phẩm
                                </Link>
                                <Link
                                    to={"/admin/product-manage/subcategory"}
                                    className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out"
                                >
                                    <GitBranch className="size-5" />
                                    Quản lý biến thể
                                </Link>
                                <Link to={"/admin/user-manage/reviews"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <Star className="size-5" />
                                    Đánh giá
                                </Link>
                                {/* <Link to={"/admin/order-manage/cart"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <ShoppingCart className="size-5" />
                                    Cart
                                </Link> */}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out" onClick={() => setIsDropDown3(!isDropDown3)} >
                            <div className="flex gap-2 items-center">
                                <Receipt className="size-5" />
                                {isOpen && <p>Quản lý đơn hàng</p>}
                            </div>
                            {isOpen && <ChevronDown className="size-5" />}
                        </div>
                        {isOpen && (
                            <div className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ${isDropDown3 ? "max-h-125" : "max-h-0"
                                }`}>
                                <Link to={"/admin/order-manage/orders"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <ClipboardCheck className="size-5" />
                                    Đơn hàng
                                </Link>
                                {/* <Link to={"/admin/order-manage/cart"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <ShoppingCart className="size-5" />
                                    Cart
                                </Link> */}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="relative flex items-center justify-between cursor-pointer hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out" onClick={() => setIsDropDown4(!isDropDown4)}>
                            <div className="flex gap-2 items-center">
                                <Users className="size-5" />
                                {isOpen && <p>Quản lý người dùng</p>}
                                {hasUnread && (
                                    <span className="absolute right-23 top-0 w-2.5 h-2.5 bg-red-500 rounded-full z-999" />
                                )}
                            </div>
                            {isOpen && <ChevronDown className="size-5" />}
                        </div>
                        {isOpen && (
                            <div className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ${isDropDown4 ? "max-h-125" : "max-h-0"
                                }`}>
                                <Link to={"/admin/user-manage/users"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <Users className="size-5" />
                                    Người dùng
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="relative flex items-center justify-between cursor-pointer hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out" onClick={() => setIsDropDown5(!isDropDown5)}>
                            <div className="flex gap-2 items-center">
                                <Headset className="size-5" />
                                {isOpen && <p>Chăm sóc & Hỗ trợ khách hàng</p>}
                                {hasUnread && (
                                    <span className="absolute right-23 top-0 w-2.5 h-2.5 bg-red-500 rounded-full z-999" />
                                )}
                            </div>
                            {isOpen && <ChevronDown className="size-5" />}
                        </div>
                        {isOpen && (
                            <div className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ${isDropDown5 ? "max-h-125" : "max-h-0"
                                }`}>
                                <Link to={"/admin/chat"} className="relative flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <MessageSquareMore className="size-5" />
                                    Nhắn tin
                                    {hasUnread && (
                                        <span className="absolute left-17 top-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                                    )}
                                </Link>
                                <Link to={"/admin/user-manage/require"} className="flex items-center gap-2 hover:bg-secondary p-2 transition-all duration-500 ease-in-out">
                                    <FilePenLine className="size-5" />
                                    Yêu cầu thiết kế
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to={'/admin/coupons'} className="flex items-center gap-2 hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out cursor-pointer">
                        <TicketPercent className="size-5" />
                        {isOpen && <span>Quản lý mã giảm giá</span>}
                    </Link>

                    <Link to={"/admin/settings"} className="flex items-center gap-2 hover:bg-secondary px-4 py-2 transition-all duration-500 ease-in-out cursor-pointer">
                        <Settings className="size-5" />
                        {isOpen && <span>Cài đặt</span>}
                    </Link>
                </div>

                <div className="p-4 border-t border-gray-50 text-sm text-center">
                    {isOpen ? "© 2025 Admin Panel" : "©"}
                </div>
            </nav>

            <main className="flex-1 overflow-auto h-full">
                <div className="bg-title h-25 flex items-center px-4 shadow-md justify-between">
                    <h1 className="text-2xl font-bold">Admin</h1>
                    <div>
                        <div className="flex items-center gap-2">
                            <div>
                                <img src={dataUser.avatar} alt="" className="size-10 rounded-full" />
                            </div>
                            <div className="relative cursor-pointer" onClick={() => setIsActive(!isActive)}>
                                <div className="flex items-center gap-2">
                                    <p>{dataUser.fullName}</p>
                                    <ChevronDown className="size-5" />
                                </div>
                                <div className={`absolute bg-white p-4 top-15 right-0 
                                min-w-40 rounded-lg overflow-hidden
                                ${isActive ? "animate-dropdown-open" : "animate-dropdown-close"} z-99 shadow-2xl`}>
                                    <div className=" space-y-2" >
                                        <Link to={"/"} className="flex items-center gap-2">
                                            <House className="size-5" />
                                            <p>Quay về</p>
                                        </Link>
                                        <div className="flex items-center gap-2 text-red-500 cursor-pointer " onClick={handleLogout}>
                                            <LogOut className="size-5" />
                                            <p>Đăng xuất</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-10 px-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
