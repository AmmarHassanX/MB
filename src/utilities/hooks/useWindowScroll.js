import { useEffect, useState } from "react";

const useWindowScroll = () => {
  const [scroll, setScroll] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  const getScroll = () => {
    setScroll({
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, [scroll]);

  return scroll;
};

export default useWindowScroll;
