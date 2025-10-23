import { useState, useEffect } from 'react';

// Custom hook to manage localStorage
const UseLocalStorage = (key: string, initialValue: string) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ?
            JSON.parse(storedValue) :
            initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

// Example usage
export default function LocalStorageExample1() {
    const [localStorageValue, setLocalStorageValue] =
        UseLocalStorage('myLocalStorageKey', 'default');

    return (
        <div>
            <p>Local Storage Value: {localStorageValue}</p>
            <button onClick={
                () =>
                    setLocalStorageValue('new value')}>
                Change Local Storage Value
            </button>
        </div>
    );
};

