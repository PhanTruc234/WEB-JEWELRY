import { useGetListChatBot } from '@/hooks/ChatBot/useGetListChatBot'
import { ChatBoxStore } from '@/store/chatBoxStore/ChatBoxStore'
import { commonStore } from '@/store/commonStore/commonStore'
import { SendHorizontal, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

export const ChatBox = () => {
    const { setShowBot } = commonStore()
    const [historyMessages, setHistoryMessages] = useState([])
    const [liveMessages, setLiveMessages] = useState([])
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const { sendMessage } = ChatBoxStore()
    const { messagesInfo, isLoading, refreshMessage } = useGetListChatBot({
        limit: 10,
        cursor,
    })
    const onSubmit = async ({ message }) => {
        if (!message) return
        setLoading(true)
        setLiveMessages((prev) => [
            ...prev,
            { role: 'user', message, products: [] },
        ])
        await sendMessage(message)
        reset()
        setCursor(null)
        setLiveMessages([])
        await refreshMessage()
        setLoading(false)
    }
    useEffect(() => {
        if (!messagesInfo?.data?.data) return

        const { messages, nextCursor, hasMore } = messagesInfo.data.data
        console.log(messagesInfo.data.data, "messagesInfo.data.datamessagesInfo.data.data")
        console.log(cursor, "cursorcursor")
        setHistoryMessages((prev) => {
            if (!cursor) return messages
            return [...messages]
        })
        setCursor(nextCursor)
        setHasMore(hasMore)
    }, [messagesInfo])
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        if (scrollHeight <= clientHeight) return

        if (scrollTop === 0 && hasMore && !isLoading) {
            refreshMessage()
        }
    }
    const messages = [...historyMessages, ...liveMessages]
    console.log(historyMessages, "historyMessages")
    console.log(liveMessages, "liveMessages")
    console.log(messages, "messagesmessages")
    return (
        <div className="fixed bottom-20 right-6 z-50">
            <div className="w-80 h-105 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
                    <span className="font-semibold">AI Assistant</span>
                    <X
                        className="cursor-pointer hover:text-red-300"
                        onClick={() => setShowBot(false)}
                    />
                </div>
                <div
                    className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gray-50"
                    onScroll={handleScroll}
                >
                    {messages.map((msg, index) => (
                        <div key={index}>
                            {msg.role === 'assistant' ? (
                                <div className="flex items-start">
                                    <div className="bg-secondary text-white text-sm px-3 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
                                        {msg.message}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <div className="bg-gray-200 text-sm px-3 py-2 rounded-2xl rounded-tr-none max-w-[80%]">
                                        {msg.message}
                                    </div>
                                </div>
                            )}
                            {msg.products?.length > 0 && (
                                <div className="mt-2 w-20 space-y-2">
                                    {msg.products.map((p) => (
                                        <div
                                            key={p._id}
                                            className="min-w-35 bg-white border rounded-xl p-2 shadow-sm"
                                        >
                                            <img
                                                src={p.images?.[0]?.url}
                                                alt={p.name}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <div className="mt-1 text-sm font-medium line-clamp-2 text-[14px]">
                                                {p.name}
                                            </div>
                                            {p.promotion?.isActive && (
                                                <div className="text-xs text-red-500">
                                                    Giảm {p.promotion.discount}%
                                                </div>
                                            )}
                                            <div className='bg-primary flex items-center justify-center text-white mt-2 rounded-2xl text-[14px]'>
                                                <Link to={`/product/detail/${p._id}`}>Xem chi tiết</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="text-sm text-gray-400 italic">
                            Bot đang trả lời...
                        </div>
                    )}
                </div>
                <div className="p-3 border-t">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                        <textarea
                            {...register('message')}
                            placeholder="Nhập câu hỏi..."
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSubmit(onSubmit)()
                                }
                            }}
                            className="flex-1 resize-none border rounded-2xl px-4 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-indigo-500
             max-h-32 overflow-y-auto"
                        />
                        <button
                            type="submit"
                            className=" text-primary text-sm cursor-pointer"
                        >
                            <SendHorizontal />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
