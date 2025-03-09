
import { useEffect, useState, useRef } from "react";

// Hook for smooth scrolling animations
export function useSmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);
}

// Hook for intersection observer animations
export function useIntersectionObserver(
  options = { threshold: 0.1, rootMargin: '0px' }
) {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options);

    return () => observer.current?.disconnect();
  }, [options.threshold, options.rootMargin]);

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      elements.forEach(element => currentObserver.observe(element));
      return () => elements.forEach(element => currentObserver.unobserve(element));
    }
  }, [elements]);

  return {
    observer: observer.current,
    setElements,
    entries
  };
}

// Hook for parallax effects
export function useParallax() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return position;
}

// Function to add motion to elements
export function applyMotion(element: HTMLElement, intensity = 1) {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const xPercent = x / width - 0.5;
    const yPercent = y / height - 0.5;
    
    element.style.transform = `
      translate(${xPercent * intensity * 10}px, ${yPercent * intensity * 10}px)
      rotate(${xPercent * intensity}deg)
    `;
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0) rotate(0)';
  });
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', () => {});
  };
}

// Types for animation properties
export type EasingFunction = 
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad';

export interface AnimationOptions {
  duration?: number;
  easing?: EasingFunction;
  delay?: number;
}

// Animation utility functions
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};
