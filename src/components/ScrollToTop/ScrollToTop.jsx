import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisInstance } from '../../hooks/useSmoothScroll';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (lenisInstance) {
      lenisInstance.stop();
      lenisInstance.scrollTo(0, { immediate: true, force: true });
      lenisInstance.start();
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
