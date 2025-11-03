'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentData } from '@/lib/supabase';
import { useEditorStore } from '@/store/editor-store';
import { GripVertical, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

type EditableBlockProps = {
  component: ComponentData;
  disabled?: boolean;
};

export const EditableBlock: React.FC<EditableBlockProps> = ({ component, disabled = false }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
    disabled,
  });

  const { updateComponent, removeComponent } = useEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [currentImageKey, setCurrentImageKey] = useState<string | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTextEdit = (key: string, value: string) => {
    updateComponent(component.id, { [key]: value });
  };

  const handleImageEdit = (key: string) => {
    setCurrentImageKey(key);
    setShowImageUploader(true);
  };

  const handleImageSelected = (url: string) => {
    if (currentImageKey) {
      updateComponent(component.id, { [currentImageKey]: url });
    }
  };

  if (disabled) {
    return (
      <div ref={setNodeRef}>
        {renderComponent(component, false, handleTextEdit, handleImageEdit)}
        <ImageUploader
          isOpen={showImageUploader}
          onClose={() => setShowImageUploader(false)}
          onImageSelected={handleImageSelected}
          currentImageUrl={currentImageKey ? component.props[currentImageKey] : undefined}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      {/* Drag handle and controls - Always visible on left edge */}
      <div className="absolute left-2 top-4 flex flex-col gap-2 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-gray-200">
        <button
          {...attributes}
          {...listeners}
          className="p-2 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing transition-colors"
          title="Drag to reorder"
        >
          <GripVertical size={20} className="text-gray-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm('Delete this component?')) {
              removeComponent(component.id);
            }
          }}
          className="p-2 hover:bg-red-50 rounded hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Component content with inline editing */}
      <div className="relative">
        {renderComponent(component, true, handleTextEdit, handleImageEdit)}
      </div>

      {/* Image Uploader Modal */}
      <ImageUploader
        isOpen={showImageUploader}
        onClose={() => setShowImageUploader(false)}
        onImageSelected={handleImageSelected}
        currentImageUrl={currentImageKey ? component.props[currentImageKey] : undefined}
      />
    </div>
  );
};

function renderComponent(
  component: ComponentData,
  editable: boolean,
  onTextEdit: (key: string, value: string) => void,
  onImageEdit: (key: string) => void
) {
  const { type, props } = component;
  const theme = useEditorStore((state) => state.theme);

  // Hero Block
  if (type === 'hero') {
    const gradientFrom = theme.colors.primary || '#3b82f6';
    const gradientTo = theme.colors.secondary || '#8b5cf6';

    return (
      <div
        className="relative flex items-center justify-center min-h-[500px] text-white overflow-hidden"
        style={{
          backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}33, ${gradientTo}33)`
          }}
        />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 animate-slide-up"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
            style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
          >
            {props.title}
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up animation-delay-200"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('subtitle', e.currentTarget.textContent || '')}
            style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
          >
            {props.subtitle}
          </p>
          <a
            href={props.ctaLink}
            className="inline-block px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up animation-delay-400"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('ctaText', e.currentTarget.textContent || '')}
            style={{
              outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none',
              cursor: editable ? 'text' : 'default',
              backgroundColor: theme.colors.background || '#ffffff',
              color: theme.colors.primary || '#3b82f6'
            }}
          >
            {props.ctaText}
          </a>
          {editable && (
            <button
              onClick={() => onImageEdit('backgroundImage')}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors"
              title="Change background image"
            >
              <ImageIcon size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // CTA Block
  if (type === 'cta') {
    const bgColor = theme.colors.primary || props.backgroundColor || '#3b82f6';

    return (
      <div
        className="py-16 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float animation-delay-1000" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2
            className="text-4xl font-bold text-white mb-4 animate-fade-in"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('heading', e.currentTarget.textContent || '')}
            style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
          >
            {props.heading}
          </h2>
          <p
            className="text-xl text-white/90 mb-8 animate-fade-in animation-delay-200"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('description', e.currentTarget.textContent || '')}
            style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
          >
            {props.description}
          </p>
          <a
            href={props.buttonLink}
            className="inline-block px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in animation-delay-400"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('buttonText', e.currentTarget.textContent || '')}
            style={{
              outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none',
              cursor: editable ? 'text' : 'default',
              backgroundColor: theme.colors.background || '#ffffff',
              color: theme.colors.primary || '#3b82f6'
            }}
          >
            {props.buttonText}
          </a>
        </div>
      </div>
    );
  }

  // Gallery Block
  if (type === 'gallery') {
    return (
      <div className="py-16 px-6" style={{ backgroundColor: theme.colors.background || '#f9fafb' }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12 animate-fade-in"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
            style={{
              outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none',
              cursor: editable ? 'text' : 'default',
              color: theme.colors.text || '#1f2937'
            }}
          >
            {props.title}
          </h2>
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))`,
            }}
          >
            {props.images?.map((image: any, index: number) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 animate-fade-in group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
                />
                {editable && (
                  <button
                    onClick={() => onImageEdit('images')}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <ImageIcon size={32} className="text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Text Block
  if (type === 'text') {
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
      <div className="py-8 px-6" style={{ backgroundColor: theme.colors.background || '#ffffff' }}>
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div
            className={`prose prose-lg ${alignmentClasses[props.alignment as keyof typeof alignmentClasses] || 'text-left'} ${fontSizeClasses[props.fontSize as keyof typeof fontSizeClasses] || 'text-base'}`}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('content', e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: props.content }}
            style={{
              outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none',
              cursor: editable ? 'text' : 'default',
              color: theme.colors.text || '#1f2937'
            }}
          />
        </div>
      </div>
    );
  }

  return <div>Unknown component type: {type}</div>;
}
