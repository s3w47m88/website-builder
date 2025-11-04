'use client';

import React from 'react';

export type NewsBlockProps = {
  title: string;
  articles: Array<{
    headline: string;
    date: string;
    excerpt: string;
    link: string;
  }>;
};

export const NewsBlock: React.FC<NewsBlockProps> = ({ title, articles }) => {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-xl font-bold mb-3">{article.headline}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <a
                  href={article.link}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const newsBlockConfig = {
  type: 'news',
  name: 'News/Blog',
  category: 'content',
  defaultProps: {
    title: 'Latest News',
    articles: [
      {
        headline: 'Campaign Launch Event Draws Record Crowd',
        date: 'March 15, 2025',
        excerpt: 'Over 2,000 supporters gathered to kick off the campaign with an inspiring message of hope and change.',
        link: '#',
      },
      {
        headline: 'Endorsement from Veterans Association',
        date: 'March 10, 2025',
        excerpt: 'Local veterans group announces strong support for conservative values and leadership.',
        link: '#',
      },
      {
        headline: 'Town Hall Meeting This Saturday',
        date: 'March 5, 2025',
        excerpt: 'Join us for an open discussion on the issues that matter most to our community.',
        link: '#',
      },
    ],
  },
  propsSchema: {
    title: { type: 'text', label: 'Section Title' },
    articles: { type: 'array', label: 'Articles' },
  },
};
