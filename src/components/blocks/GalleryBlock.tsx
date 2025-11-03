'use client';

import React from 'react';

export type GalleryBlockProps = {
  title: string;
  images: Array<{ url: string; alt: string }>;
  columns?: number;
};

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  title,
  images,
  columns = 3,
}) => {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">{title}</h2>
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 animate-fade-in group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const galleryBlockConfig = {
  type: 'gallery',
  name: 'Image Gallery',
  category: 'media',
  defaultProps: {
    title: 'Our Gallery',
    images: [
      { url: 'https://via.placeholder.com/400', alt: 'Image 1' },
      { url: 'https://via.placeholder.com/400', alt: 'Image 2' },
      { url: 'https://via.placeholder.com/400', alt: 'Image 3' },
    ],
    columns: 3,
  },
  propsSchema: {
    title: { type: 'text', label: 'Gallery Title' },
    images: { type: 'gallery', label: 'Images' },
    columns: { type: 'number', label: 'Columns', min: 1, max: 4 },
  },
};
