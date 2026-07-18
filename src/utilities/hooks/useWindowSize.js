import React, { useState, useEffect } from "react";

export default function useWindowSize() {
  const [screenSize, getDimension] = useState({
    width: 0,
    height: 0,
  });

  const setDimension = () => {
    getDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (screenSize.width === 0) {
      getDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return screenSize;
}
