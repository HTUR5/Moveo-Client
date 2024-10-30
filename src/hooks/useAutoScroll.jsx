import { useEffect } from 'react';

function useAutoScroll(element, isScrolling) {
  useEffect(() => {
    // console.log("here")
    // console.log(element)
    if (isScrolling && element) {
      const interval = setInterval(() => {
        element.scrollBy({ top: 1, behavior: 'smooth' }); 
      }, 100); 

      return () => clearInterval(interval); 
    }
  }, [isScrolling, element]);
}

export default useAutoScroll;
