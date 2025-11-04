'use client';

import React from 'react';
import {
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from '@/store/editor-store';
import { EditableBlock } from './EditableBlock';

export const Canvas: React.FC = () => {
  const { components, isEditing } = useEditorStore();

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
  });

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

  return (
    <div
      ref={setNodeRef}
      className={`min-h-screen bg-gray-50 transition-all ${
        isOver ? 'bg-blue-50 ring-4 ring-blue-400 ring-inset' : ''
      }`}
    >
      <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-screen">
          {components.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold">Drop components here</p>
              <p className="text-sm mt-2">Drag components from the "Add Component" panel</p>
              <div className="mt-6 inline-block px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          ) : (
            components
              .sort((a, b) => a.order - b.order)
              .map((component) => <EditableBlock key={component.id} component={component} />)
          )}
        </div>
      </SortableContext>
    </div>
  );
};
