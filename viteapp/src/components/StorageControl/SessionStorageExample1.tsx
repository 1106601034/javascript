import { useState, useEffect } from 'react';

// Custom hook to manage sessionStorage
const UseSessionStorage = (key: string, initialValue: string) => {
    const [value, setValue] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

// Example usage

export default function SessionStorageExample1() {
    const [sessionStorageValue, setSessionStorageValue] =
        UseSessionStorage('mySessionStorageKey', 'default');

    return (
        <div>
            <p>Session Storage Value: {sessionStorageValue}</p>
            <button
                onClick={
                    () =>
                        setSessionStorageValue('new value')
                }>
                Change Session Storage Value
            </button>
        </div>
    );
};
