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

  const { updateComponent, removeComponent, theme } = useEditorStore();
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
        {renderComponent(component, false, handleTextEdit, handleImageEdit, theme)}
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
        {renderComponent(component, true, handleTextEdit, handleImageEdit, theme)}
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
  onImageEdit: (key: string) => void,
  theme: any
) {
  const { type, props } = component;

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

  // Feature Block
  if (type === 'feature') {
    return (
      <div className="py-16 px-6" style={{ backgroundColor: theme.colors.background || '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4 animate-fade-in"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default', color: theme.colors.text || '#1f2937' }}
            >
              {props.title}
            </h2>
            <p
              className="text-xl text-gray-600 animate-fade-in animation-delay-200"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('subtitle', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default' }}
            >
              {props.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {props.features?.map((feature: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`, borderColor: editable ? theme.colors.primary + '80' : '#e5e7eb' }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Testimonial Block
  if (type === 'testimonial') {
    return (
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12 animate-fade-in"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
            style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default', color: theme.colors.text || '#1f2937' }}
          >
            {props.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {props.testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  {testimonial.avatar && <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pricing Block
  if (type === 'pricing') {
    return (
      <div className="py-16 px-6" style={{ backgroundColor: theme.colors.background || '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4 animate-fade-in"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default', color: theme.colors.text || '#1f2937' }}
            >
              {props.title}
            </h2>
            <p
              className="text-xl text-gray-600 animate-fade-in animation-delay-200"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('subtitle', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default' }}
            >
              {props.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {props.plans?.map((plan: any, index: number) => (
              <div
                key={index}
                className="p-8 rounded-lg border-2 transition-all duration-300 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  borderColor: plan.highlighted ? theme.colors.primary || '#3b82f6' : '#e5e7eb',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.highlighted ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
                }}
              >
                {plan.highlighted && (
                  <div className="text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4" style={{ backgroundColor: theme.colors.primary || '#3b82f6' }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features?.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: plan.highlighted ? theme.colors.primary || '#3b82f6' : '#f3f4f6',
                    color: plan.highlighted ? '#ffffff' : '#1f2937'
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Stats Block
  if (type === 'stats') {
    return (
      <div className="py-16 px-6" style={{ backgroundColor: theme.colors.background || '#f9fafb' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {props.stats?.map((stat: any, index: number) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {stat.icon && <div className="text-5xl mb-3">{stat.icon}</div>}
                <div className="text-5xl font-bold mb-2" style={{ color: theme.colors.primary || '#3b82f6' }}>{stat.value}</div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Contact Block
  if (type === 'contact') {
    return (
      <div className="py-16 px-6" style={{ backgroundColor: theme.colors.background || '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4 animate-fade-in"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('title', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default', color: theme.colors.text || '#1f2937' }}
            >
              {props.title}
            </h2>
            <p
              className="text-xl text-gray-600 animate-fade-in animation-delay-200"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => editable && onTextEdit('subtitle', e.currentTarget.textContent || '')}
              style={{ outline: editable ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none', cursor: editable ? 'text' : 'default' }}
            >
              {props.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in animation-delay-400">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${props.email}`} className="hover:underline" style={{ color: theme.colors.primary || '#3b82f6' }}>{props.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href={`tel:${props.phone}`} className="hover:underline" style={{ color: theme.colors.primary || '#3b82f6' }}>{props.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">{props.address}</p>
                </div>
              </div>
            </div>
            {props.showForm && (
              <div className="animate-fade-in animation-delay-600">
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" style={{ borderColor: theme.colors.primary + '40' }} />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" style={{ borderColor: theme.colors.primary + '40' }} />
                  <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" style={{ borderColor: theme.colors.primary + '40' }} />
                  <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white transition-colors" style={{ backgroundColor: theme.colors.primary || '#3b82f6' }}>
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Footer Block
  if (type === 'footer') {
    return (
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => editable && onTextEdit('companyName', e.currentTarget.textContent || '')}
                style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
              >
                {props.companyName}
              </h3>
              <p
                className="text-gray-400"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => editable && onTextEdit('tagline', e.currentTarget.textContent || '')}
                style={{ outline: editable ? '2px dashed rgba(255,255,255,0.3)' : 'none', cursor: editable ? 'text' : 'default' }}
              >
                {props.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {props.links?.map((link: any, index: number) => (
                  <li key={index}>
                    <a href={link.url} className="text-gray-400 hover:text-white transition-colors">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {props.socialLinks?.map((social: any, index: number) => (
                  <a key={index} href={social.url} className="text-2xl hover:text-blue-400 transition-colors" title={social.platform}>{social.icon}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {props.companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return <div>Unknown component type: {type}</div>;
}
