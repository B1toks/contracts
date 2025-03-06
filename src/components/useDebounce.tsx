import { useState, useEffect } from "react";

// Search
export function useDebounce<T> (value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value)
  
    useEffect (() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout (handler);
      };
    }, [value, delay]);
    
    return debouncedValue;
  }