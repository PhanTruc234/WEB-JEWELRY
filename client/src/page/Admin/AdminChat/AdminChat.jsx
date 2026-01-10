import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useGetListChat } from "@/hooks/Chat/useGetListChat";
import { SendHorizontal } from "lucide-react";

export const AdminChat = () => {
    const [roomId, setRoomId] = useState("");
    const [msgs, setMsgs] = useState({ userId: {}, messages: [] });
    const [input, setInput] = useState("");
    const { chats, error, isLoading } = useGetListChat({ page: 1, limit: 10 });
    console.log(chats, "chatschatschats")
    useEffect(() => {
        const handler = (msg) => {
            console.log("SOCKET RECEIVED:", msg);
            setMsgs(prev => ({
                ...prev,
                messages: [...(prev.messages || []), msg]
            }));
            console.log(msg, "msghandle")
        };
        socket.on("message", handler);
        return () => {
            socket.off("message", handler);
        };
    }, []);
    console.log(msgs, "msgmsgmsgmsg")
    const joinRoom = (id) => {
        setRoomId(id);
        const rooms = chats?.data?.data?.messages ?? [];
        const convo = rooms.find((c) => c.roomId === id);
        console.log(convo, "convoconvo")
        setMsgs(convo ? convo : { userId: {}, messages: [] });
        setUnread(prev => ({
            ...prev,
            [id]: 0
        }));
        socket.emit("admin_join_room", id);
    };
    const send = () => {
        socket.emit("admin_message", { roomId, message: input });
        setInput("");
    };
    return (
        <div className="relative min-h-screen flex gap-4">
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="w-1/3 border-r">
                <h2 className="font-bold mb-2">Danh sách chat</h2>
                <ul>
                    {chats?.data?.data?.messages?.map((c) => (
                        <li
                            key={c.roomId}
                            onClick={() => joinRoom(c.roomId)}
                            className={`cursor-pointer p-2 border-b hover:bg-gray-100 ${roomId === c.roomId ? "bg-gray-200 font-bold" : ""
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <img src={c.userId.avatar} alt="" className="w-8 h-8 rounded-full" />
                                <span>{c.userId.fullName}</span>
                            </div>
                            <small className="text-gray-400">
                                {c.messages[c.messages.length - 1]?.message.slice(0, 30)}...
                            </small>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-2/3">
                <h3>Chat với: {chats?.data?.data?.messages?.userId?.name}</h3>
                <div className="h-100 overflow-y-auto border p-2">
                    {msgs?.messages?.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.from === "admin" ? "justify-end" : "justify-start items-center gap-3"}`}
                        >
                            {m.from === "customer" ? <div className="w-6 h-6 rounded-full overflow-hidden">
                                <img src={msgs?.userId?.avatar} alt="" className="w-full h-full object-cover" />
                            </div> : <div>
                            </div>}
                            <div
                                className={`mt-2 px-2 py-2 rounded-xl max-w-xs wrap-break-word shadow
                        ${m.from === "admin"
                                        ? "bg-primary text-white rounded-br-none"
                                        : "bg-secondary text-white border rounded-bl-none"
                                    }`}
                            >
                                <p className="text-sm">{m.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mt-2">
                    <input
                        className="border flex-1 p-2 rounded-2xl"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={send} className=" text-primary px-4 py-2">
                        <SendHorizontal />
                    </button>
                </div>
            </div>
        </div>
    );
};
