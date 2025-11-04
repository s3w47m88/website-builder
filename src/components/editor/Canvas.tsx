'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Section } from './Section';
import { EditableBlock } from './EditableBlock';

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

  const addComponentToSection = (sectionId: string, slotIndex: number) => {
    // This will be called when user selects a component
    console.log('Add component to section', sectionId, 'at slot', slotIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {sections.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold text-gray-700 mb-4">Start building your page</p>
          <p className="text-gray-500 mb-8">Add your first section to get started</p>
          <button
            onClick={() => addSection('first')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition-all"
          >
            <Plus size={20} />
            Add First Section
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <Section
              key={section.id}
              id={section.id}
              layout={section.layout}
              style={section.style}
              onAddSection={(position) => addSection(position, section.id)}
              onAddComponent={(slotIndex) => addComponentToSection(section.id, slotIndex)}
              onDelete={() => deleteSection(section.id)}
              onUpdateLayout={(layout) => updateSectionLayout(section.id, layout)}
              onUpdateStyle={(style) => updateSectionStyle(section.id, style)}
            >
              {section.components.map((comp) => (
                <EditableBlock key={comp.component.id} component={comp.component} />
              ))}
            </Section>
          ))}
        </div>
      )}
    </div>
  );
};
