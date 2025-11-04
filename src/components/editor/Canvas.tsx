'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Section } from './Section';
import { EditableBlock } from './EditableBlock';
import { useEditorStore } from '@/store/editor-store';

type SectionData = {
  id: string;
  layout: {
    columns: number;
    rows: number;
    gap: number;
  };
  style: {
    padding: string;
    margin: string;
    backgroundColor: string;
  };
  components: Array<{
    slotIndex: number;
    component: any;
  }>;
};

export const Canvas: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const { components, isEditing, addComponent } = useEditorStore();

  const addSection = (position: 'above' | 'below' | 'first', targetId?: string) => {
    const newSection: SectionData = {
      id: crypto.randomUUID(),
      layout: {
        columns: 1,
        rows: 1,
        gap: 16,
      },
      style: {
        padding: '2rem',
        margin: '0',
        backgroundColor: 'transparent',
      },
      components: [],
    };

    if (position === 'first') {
      setSections([newSection]);
      return;
    }

    const targetIndex = sections.findIndex((s) => s.id === targetId);
    const newSections = [...sections];

    if (position === 'above') {
      newSections.splice(targetIndex, 0, newSection);
    } else {
      newSections.splice(targetIndex + 1, 0, newSection);
    }

    setSections(newSections);
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  const updateSectionLayout = (sectionId: string, layout: SectionData['layout']) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, layout } : s))
    );
  };

  const updateSectionStyle = (sectionId: string, style: SectionData['style']) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, style } : s))
    );
  };

  const addComponentToSection = (sectionId: string, slotIndex: number, componentType: string, defaultProps: any) => {
    // Add component to the editor store
    addComponent(componentType, defaultProps);

    // Track it in the section
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        const newComponent = {
          slotIndex,
          component: {
            id: crypto.randomUUID(),
            type: componentType,
            props: defaultProps,
            order: s.components.length
          }
        };
        return {
          ...s,
          components: [...s.components, newComponent]
        };
      }
      return s;
    }));
  };

  // Show existing template components
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-white">
        {components
          .sort((a, b) => a.order - b.order)
          .map((component) => (
            <EditableBlock key={component.id} component={component} disabled />
          ))}
      </div>
    );
  }

  // Editing mode - show existing components AND allow sections
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Existing template components */}
      {components.length > 0 && (
        <div className="mb-8">
          {components
            .sort((a, b) => a.order - b.order)
            .map((component) => (
              <EditableBlock key={component.id} component={component} />
            ))}
        </div>
      )}

      {/* Add Section button after existing components */}
      {components.length > 0 && sections.length === 0 && (
        <div className="text-center py-8">
          <button
            onClick={() => addSection('first')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition-all"
          >
            <Plus size={20} />
            Add New Section
          </button>
        </div>
      )}

      {/* New sections */}
      {sections.length > 0 && (
        <div className="space-y-8 mt-8">
          {sections.map((section) => (
            <Section
              key={section.id}
              id={section.id}
              layout={section.layout}
              style={section.style}
              onAddSection={(position) => addSection(position, section.id)}
              onAddComponent={(slotIndex, componentType, defaultProps) =>
                addComponentToSection(section.id, slotIndex, componentType, defaultProps)
              }
              onDelete={() => deleteSection(section.id)}
              onUpdateLayout={(layout) => updateSectionLayout(section.id, layout)}
              onUpdateStyle={(style) => updateSectionStyle(section.id, style)}
            >
              {section.components.map((comp) => (
                <div key={comp.slotIndex} style={{ gridColumn: 'auto', gridRow: 'auto' }}>
                  <EditableBlock component={comp.component} />
                </div>
              ))}
            </Section>
          ))}
        </div>
      )}

      {/* Empty state - only if no components AND no sections */}
      {components.length === 0 && sections.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl font-semibold text-gray-700 mb-4">Start building your page</p>
          <p className="text-gray-500 mb-8">Add your first section or choose a template</p>
          <button
            onClick={() => addSection('first')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition-all"
          >
            <Plus size={20} />
            Add First Section
          </button>
        </div>
      )}
    </div>
  );
};
