import { useEffect, useState } from "react";
import { DispatchEvent, ListenEvent } from "./LocalStorageEvent";

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    DispatchEvent(key, value);
  };

  useEffect(() => {
    const f = (value: any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };

    ListenEvent(key, f);
  }, [key, storedValue]);

  return { storedValue, setValue };
};

export default useLocalStorage;
