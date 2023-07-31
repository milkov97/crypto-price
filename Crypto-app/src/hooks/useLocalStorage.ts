import { useEffect, useState } from "react";

type ValueSetter<T> = (value: T) => void;

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, ValueSetter<T>] => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    })
    useEffect(() => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])

    return [value, setValue];
};

