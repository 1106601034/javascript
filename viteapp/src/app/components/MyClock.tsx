import { useState, useEffect } from "react";

export default function MyClock() {
    const [time, setTime] = useState(
        () => new Date().toLocaleString()
    );

    useEffect(() => {
        const interval = setInterval(
            () => {
                setTime(
                    new Date().toLocaleString()
                );
            }, 1000
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="my-clock">
            <h2>My Clock</h2>
            <h3>{time}</h3>
        </div>
    );
}