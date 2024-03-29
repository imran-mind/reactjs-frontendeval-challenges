import { useState } from "react"

const useLocalStorage = (key, defaultValue) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const val = localStorage.getItem(key);
            if (val) {
                return JSON.parse(val);
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    })

    const setLocalStorage = (valueORFunc) => {
        let newValue;
        if (typeof valueORFunc === 'function') {
            newValue = valueORFunc(localStorageValue);
        } else {
            newValue = valueORFunc;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }
    return [
        localStorageValue,
        setLocalStorage
    ]
}
export default useLocalStorage;