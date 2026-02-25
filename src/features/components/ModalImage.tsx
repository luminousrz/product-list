import Image from "next/image";
import { useState } from "react";

type ModalImageProps = {
    src: string,
    alt: string,
    className?: string,
    onClick?: () => void,
    isActive?: boolean
}
export default function ModalImages ({src, alt, className, onClick, isActive}: ModalImageProps){
    const [loaded , setLoaded] = useState(false)
    return (
        // The main pic (big one)
        <div
            onClick={onClick}
            className={`relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer ${
                isActive ? 'border border-gray-400 rounded-lg transition duration-200' : ''
            } ${className}`}
        >
            {/* while the images are still loading */}
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-300 via-gray-300 to-gray-300" />
            )}

            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-500 p-4 ${
                loaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadingComplete={() => setLoaded(true)}
            />
        </div>
  );
}
