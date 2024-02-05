import { useState } from 'react';

export function useLocalStorage(key: string, initialValue?: any) {
  function getInitialValue() {
    const storedData = window.localStorage.getItem(key);

    // If the key is present, use the value already in local storage
    if (storedData !== null) return storedData;

    // If an initial value has been passed in, use that
    if (initialValue) {
      if (initialValue instanceof Function) {
        return initialValue();
      } else {
        return JSON.stringify(initialValue);
      }
    }
  }

  const [state, setState] = useState(getInitialValue());

  const setStoredState = (newValue: any) => {
    setState(newValue);
    window.localStorage.setItem(key, newValue);
  };

  return [state, setStoredState];
}
