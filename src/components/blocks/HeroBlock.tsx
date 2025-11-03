'use client';

import React from 'react';

export type HeroBlockProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
};

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}) => {
  return (
    <div
      className="relative flex items-center justify-center min-h-[500px] bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse" />

      <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slide-up">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up animation-delay-200">{subtitle}</p>
        <a
          href={ctaLink}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up animation-delay-400"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export const heroBlockConfig = {
  type: 'hero',
  name: 'Hero Section',
  category: 'marketing',
  defaultProps: {
    title: 'Welcome to Your Website',
    subtitle: 'Build beautiful pages with our visual editor',
    ctaText: 'Get Started',
    ctaLink: '#',
  },
  propsSchema: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    ctaText: { type: 'text', label: 'Button Text' },
    ctaLink: { type: 'text', label: 'Button Link' },
    backgroundImage: { type: 'image', label: 'Background Image' },
  },
};
