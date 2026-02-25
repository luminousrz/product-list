'use client';

import { useState, useEffect } from 'react';
import ModalImage from './ModalImage';

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-96 rounded-xl overflow-hidden flex items-center justify-center">
        <ModalImage
          src={images[activeIndex]}
          alt={title}
          className="w-[90%] h-[80%]"
        />
      </div>

      {/* thumbnails */}
      <div className="flex overflow-x-auto gap-7">
        {images.slice(0, 3).map((img, i) => (
          <ModalImage
            key={img}
            src={img}
            alt={title + i}
            className="w-20 h-20 shrink-0"
            isActive={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}