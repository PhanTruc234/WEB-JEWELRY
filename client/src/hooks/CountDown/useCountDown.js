import { useEffect, useState } from "react";

export const useCountdown = (endTime) => {
    const calculate = () => {
        if (!endTime) return null;
        const diff = new Date(endTime).getTime() - Date.now();
        if (diff <= 0) return "Đã kết thúc";

        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        return `${h}h ${m}m ${s}s`;
    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {
        const t = setInterval(() => setTime(calculate()), 1000);
        return () => clearInterval(t);
    }, [endTime]);

    return time;
};