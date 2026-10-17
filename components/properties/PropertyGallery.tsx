"use client";

import { useState } from "react";
import Image from "next/image";
import type { PropertyImage } from "@/types/property";

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const move = (direction: number) => setIndex((current) => (current + direction + images.length) % images.length);
  return (
    <div className="property-gallery" role="region" aria-label={`${title} photo gallery`} onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
    }}>
      <div className="gallery-main">
        <Image key={images[index].src} src={images[index].src} alt={images[index].alt} fill sizes="(max-width: 700px) 100vw, 1000px" loading="eager" />
        <div className="gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous photo">←</button><span aria-live="polite" aria-atomic="true">Photo {index + 1} of {images.length}</span><button type="button" onClick={() => move(1)} aria-label="Next photo">→</button></div>
      </div>
      <div className="gallery-thumbnails" aria-label="Choose a photo">{images.map((image, photoIndex) => <button key={image.src} type="button" aria-label={`Show photo ${photoIndex + 1}`} aria-pressed={index === photoIndex} onClick={() => setIndex(photoIndex)}><Image src={image.src} alt="" fill sizes="90px" /></button>)}</div>
    </div>
  );
}
