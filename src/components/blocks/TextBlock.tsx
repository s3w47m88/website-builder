'use client';

import React from 'react';

export type TextBlockProps = {
  content: string;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
};

export const TextBlock: React.FC<TextBlockProps> = ({
  content,
  alignment = 'left',
  fontSize = 'md',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div
          className={`prose prose-lg ${alignmentClasses[alignment]} ${fontSizeClasses[fontSize]}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export const textBlockConfig = {
  type: 'text',
  name: 'Text Content',
  category: 'content',
  defaultProps: {
    content: '<p>Add your text content here. You can use rich text formatting.</p>',
    alignment: 'left',
    fontSize: 'md',
  },
  propsSchema: {
    content: { type: 'richtext', label: 'Content' },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: ['left', 'center', 'right'],
    },
    fontSize: {
      type: 'select',
      label: 'Font Size',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};
