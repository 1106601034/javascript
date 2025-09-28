import React, { useState, useEffect } from "react";

export function UseStateExample() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div>
            <h1>Count: {count}</h1> {/* Display the current count */}
            <button onClick={increment}>Increment</button> {/* Increment the count */}
            <button onClick={decrement}>Decrement</button> {/* Decrement the count */}
        </div>
    );
}

export function UseEffectExample() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
        console.log(`Effect ran. Count is: ${count}`);

        return () => {
            console.log("Cleanup for previous effect");
            document.title = "React App";
        };
    }, [count]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
    );
}

export function UseEffectExample2() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => {
            //Cleanup function to clear the interval
            clearInterval(interval);
            console.log("Interval cleared");
        };
    }, []); // Runs only once when the component mounts

    return <h1>Timer: {count} seconds</h1>;
}
