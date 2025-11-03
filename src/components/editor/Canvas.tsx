'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from '@/store/editor-store';
import { EditableBlock } from './EditableBlock';

export const Canvas: React.FC = () => {
  const { components, reorderComponents, selectComponent, isEditing } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);

      const newOrder = arrayMove(components, oldIndex, newIndex);
      reorderComponents(newOrder);
    }
  };

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div>
            {components.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No components yet</p>
                <p className="text-sm">Click "Templates" to get started or add components from the toolbar</p>
              </div>
            ) : (
              components
                .sort((a, b) => a.order - b.order)
                .map((component) => <EditableBlock key={component.id} component={component} />)
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
