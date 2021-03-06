import { useEffect, useRef, useState } from "react";

const useLocalStorage = (stateKey: string, defaultValue: any) => {
  const [storedValue, setValue] = useState(defaultValue);

  const isNewSession = useRef(true);

  useEffect(() => {
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);
      if (currentState) {
        setValue(JSON.parse(currentState));
      } else {
        setValue(defaultValue);
      }
      isNewSession.current = false;
      return;
    }
    try {
      localStorage.setItem(stateKey, JSON.stringify(storedValue));
    } catch (error) {}
  }, [storedValue, stateKey, defaultValue]);

  useEffect(() => {
    const onReceieveMessage = (e: any) => {
      const { key, newValue } = e;
      if (key === stateKey) {
        setValue(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onReceieveMessage);

    return () => window.removeEventListener("storage", onReceieveMessage);
    
  }, [stateKey, setValue]);

  return {storedValue, setValue};
}


export default useLocalStorage;
