"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ImageBreakProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

const ImageBreak = ({ src, alt, children }: ImageBreakProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div ref={ref} className={`relative w-full h-[60vh] min-h-[400px] md:h-[80vh] overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      >
        {children && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBreak;
