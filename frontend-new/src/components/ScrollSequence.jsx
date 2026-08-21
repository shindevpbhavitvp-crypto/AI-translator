import { useEffect, useRef, useState } from 'react';
import frameList from './frameList.json';
import './ScrollSequence.css';

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);

  const FRAME_COUNT = frameList.length;

  // Preload images
  useEffect(() => {
    if (FRAME_COUNT === 0) return;

    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/${frameList[i]}`;
      
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Handle drawing and resizing
  useEffect(() => {
    // We can start rendering as long as we have some images loaded, 
    // but waiting for all ensures a perfectly smooth scrub. 
    // Using a threshold like 90% or just waiting for all.
    if (loaded < FRAME_COUNT || !canvasRef.current || FRAME_COUNT === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = (imageIndex) => {
      if (!images[imageIndex]) return;

      const img = images[imageIndex];
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      // Calculate object-fit: cover logic
      const scale = Math.max(cw / iw, ch / ih);
      const x = (cw / 2) - (iw / 2) * scale;
      const y = (ch / 2) - (ih / 2) * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    const handleResize = () => {
      // Only resize if dimensions significantly changed to avoid mobile URL bar jitter
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (Math.abs(canvas.width - newWidth) > 50 || Math.abs(canvas.height - newHeight) > 50) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
      
      // Re-render current frame on resize
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? Math.max(0, Math.min(1, scrollTop / maxScrollTop)) : 0;
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );
      render(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup and draw frame 0

    let animationFrameId;
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? Math.max(0, Math.min(1, scrollTop / maxScrollTop)) : 0;
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      // Use requestAnimationFrame for smooth drawing
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => render(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial draw
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images]);

  return (
    <div className="scroll-sequence-container">
      <canvas ref={canvasRef} className="scroll-canvas" />
      <div className="scroll-overlay"></div>
    </div>
  );
}
