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
    <div className="min-h-screen bg-gray-50">
      <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`min-h-screen transition-colors ${
            isOver ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : ''
          }`}
        >
          {components.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No components yet</p>
              <p className="text-sm">Drag components from the panel or click "Templates" to get started</p>
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
