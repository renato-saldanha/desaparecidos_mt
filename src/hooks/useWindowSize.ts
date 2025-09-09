import { useState, useEffect, useCallback, useRef } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

interface UseWindowSizeOptions {
    debounceMs?: number;
    initialWidth?: number;
    initialHeight?: number;
}

export const useWindowSize = (options: UseWindowSizeOptions = {}): WindowSize => {
    const { 
        debounceMs = 150, 
        initialWidth = 1024, 
        initialHeight = 768 
    } = options;

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : initialWidth,
        height: typeof window !== 'undefined' ? window.innerHeight : initialHeight,
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isResizingRef = useRef(false);

    const handleResize = useCallback(() => {
        if (isResizingRef.current) return;
        
        isResizingRef.current = true;
        
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        setTimeout(() => {
            isResizingRef.current = false;
        }, 50);
    }, []);

    const debouncedResize = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(handleResize, debounceMs);
    }, [handleResize, debounceMs]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        handleResize();

        window.addEventListener('resize', debouncedResize, { passive: true });
        
        return () => {
            window.removeEventListener('resize', debouncedResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleResize, debouncedResize]);

    return windowSize;
};