import { useEffect } from 'react';

function useKeyPress(callback) {
  useEffect(() => {
    window.addEventListener('keypress', callback);
    return () => {
      window.removeEventListener('keypress', callback);
    };
  }, [callback]);
}

export default useKeyPress;
