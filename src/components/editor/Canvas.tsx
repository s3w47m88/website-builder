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
  const sortedComponents = [...components].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Empty state - only if no components AND no sections */}
      {components.length === 0 && sections.length === 0 ? (
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
      ) : (
        <div>
          {/* Add Section divider at top */}
          <SectionDivider
            onAddSection={() => {
              // Add section at beginning
              const newSection: SectionData = {
                id: crypto.randomUUID(),
                layout: { columns: 1, rows: 1, gap: 16 },
                style: { padding: '2rem', margin: '0', backgroundColor: 'transparent' },
                components: [],
              };
              setSections([newSection, ...sections]);
            }}
          />

          {/* Existing template components with dividers between */}
          {sortedComponents.map((component, index) => (
            <React.Fragment key={component.id}>
              <EditableBlock component={component} />
              <SectionDivider
                onAddSection={() => {
                  // Add section after this component
                  const newSection: SectionData = {
                    id: crypto.randomUUID(),
                    layout: { columns: 1, rows: 1, gap: 16 },
                    style: { padding: '2rem', margin: '0', backgroundColor: 'transparent' },
                    components: [],
                  };
                  setSections([...sections, newSection]);
                }}
              />
            </React.Fragment>
          ))}

          {/* New sections with dividers between */}
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <Section
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
              {index < sections.length - 1 && (
                <SectionDivider
                  onAddSection={() => {
                    // Add section between sections
                    const newSection: SectionData = {
                      id: crypto.randomUUID(),
                      layout: { columns: 1, rows: 1, gap: 16 },
                      style: { padding: '2rem', margin: '0', backgroundColor: 'transparent' },
                      components: [],
                    };
                    const newSections = [...sections];
                    newSections.splice(index + 1, 0, newSection);
                    setSections(newSections);
                  }}
                />
              )}
            </React.Fragment>
          ))}

          {/* Add Section divider at bottom */}
          <SectionDivider
            onAddSection={() => {
              const newSection: SectionData = {
                id: crypto.randomUUID(),
                layout: { columns: 1, rows: 1, gap: 16 },
                style: { padding: '2rem', margin: '0', backgroundColor: 'transparent' },
                components: [],
              };
              setSections([...sections, newSection]);
            }}
          />
        </div>
      )}
    </div>
  );
};

// Section Divider component that appears on hover
const SectionDivider: React.FC<{ onAddSection: () => void }> = ({ onAddSection }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-8 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onAddSection}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-0.5 bg-blue-400 relative">
          <button className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 shadow-lg whitespace-nowrap">
            <Plus size={14} />
            Add Section
          </button>
        </div>
      </div>
    </div>
  );
};
