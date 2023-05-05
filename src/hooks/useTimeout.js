import { useEffect } from 'react';

function useTimeout(callback, delay) {
  useEffect(() => {
    let id = setTimeout(callback, delay);
    return () => clearTimeout(id);
  }, [callback, delay]);
}

export default useTimeout;