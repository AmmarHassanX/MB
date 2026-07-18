import { useEffect } from "react";
import { useRouter } from "next/router";

const useScrollRestoration = () => {
  const router = useRouter();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";

    const saveScrollPosition = (url) => {
      sessionStorage.setItem(`scrollPosition:${url}`, JSON.stringify({ x: window.scrollX, y: window.scrollY }));
    };

    const restoreScrollPosition = (url) => {
      const scrollPosition = JSON.parse(sessionStorage.getItem(`scrollPosition:${url}`));
      if (scrollPosition) {
        window.scrollTo(scrollPosition.x, scrollPosition.y);
      }
    };

    const handleRouteChangeStart = () => {
      saveScrollPosition(router.asPath);
    };

    const handleRouteChangeComplete = (url) => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false;
        restoreScrollPosition(url);
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    router.beforePopState(() => {
      shouldScrollRestore = true;
      return true;
    });

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      window.history.scrollRestoration = "auto";
    };
  }, [router]);
};

export default useScrollRestoration;
