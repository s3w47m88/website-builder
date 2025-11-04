'use client';

import { Suspense, useState, useEffect } from 'react';
import { Toolbar } from '@/components/editor/Toolbar';
import { Canvas } from '@/components/editor/Canvas';
import { OnboardingWizard } from '@/components/editor/OnboardingWizard';
import { FloatingEditButton } from '@/components/editor/FloatingEditButton';
import { ShareLink } from '@/components/editor/ShareLink';
import { EnvironmentIndicator } from '@/components/editor/EnvironmentIndicator';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useEditorStore } from '@/store/editor-store';
import { getAllPages } from '@/lib/page-service';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

function EditorContent() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSelectSite, setShowSelectSite] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { currentPageId, components, addComponent, reorderComponents } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before activating drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag started:', event.active.id, event.active.data.current);
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    console.log('Drag ended:', { activeId: active.id, overId: over?.id, activeData: active.data.current });

    // Check if this is a new block being dragged from the toolbar
    if (active.data.current?.type === 'NEW_BLOCK') {
      const { blockType, defaultProps } = active.data.current;

      // Add the component to the canvas (don't require specific drop zone)
      console.log('Adding new component:', blockType);
      addComponent(blockType, defaultProps);
      return;
    }

    // Otherwise, handle reordering existing components
    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);

      const newOrder = arrayMove(components, oldIndex, newIndex);
      reorderComponents(newOrder);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        // Check if there are any existing pages
        const pages = await getAllPages();

        // If no pages exist, show onboarding
        if (pages.length === 0) {
          setShowOnboarding(true);
          setShowSelectSite(false);
        }
        // If pages exist but no site is loaded, prompt to select one
        else if (!currentPageId) {
          setShowOnboarding(false);
          setShowSelectSite(true);
        }
        // Otherwise, a site is loaded, show the editor
        else {
          // Load the page data if currentPageId exists but components are empty
          if (components.length === 0) {
            try {
              const { loadPage } = await import('@/lib/page-service');
              const loadPageToStore = useEditorStore.getState().loadPage;
              const page = await loadPage(currentPageId);
              loadPageToStore(page);
            } catch (error) {
              console.error('Failed to load page:', error);
              // If page no longer exists, prompt to select
              setShowSelectSite(true);
            }
          }
          setShowOnboarding(false);
          setShowSelectSite(false);
        }
      } catch (error) {
        console.error('Failed to check pages:', error);
        // On error, show onboarding as fallback
        setShowOnboarding(true);
        setShowSelectSite(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, [currentPageId, components.length]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowSelectSite(false);
    // Force a re-check after onboarding completes
    setLoading(true);
  };

  const handleCreateNewSite = () => {
    setShowOnboarding(true);
    setShowSelectSite(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="h-screen flex flex-col">
          <Toolbar onCreateNewSite={handleCreateNewSite} />
          <div className="flex-1 overflow-auto">
            <OnboardingWizard isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
          </div>
          <EnvironmentIndicator />
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-blue-600 font-semibold">
              ✨ Drop to add component
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }

  if (showSelectSite) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="h-screen flex flex-col">
          <Toolbar onCreateNewSite={handleCreateNewSite} />
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
              <p className="text-gray-600 mb-8">
                You have existing sites. Please select one from "My Sites" to continue editing, or create a new one.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    const toolbar = document.querySelector('[data-sites-button]') as HTMLButtonElement;
                    toolbar?.click();
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Open My Sites
                </button>
                <button
                  onClick={handleCreateNewSite}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-semibold"
                >
                  Create New Site
                </button>
              </div>
            </div>
          </div>
          <EnvironmentIndicator />
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-blue-600 font-semibold">
              ✨ Drop to add component
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="h-screen flex flex-col">
        <Toolbar onCreateNewSite={handleCreateNewSite} />
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>
        <FloatingEditButton onShareClick={() => setShowShareLink(true)} />
        <ShareLink isOpen={showShareLink} onClose={() => setShowShareLink(false)} />
        <EnvironmentIndicator />
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-blue-600 font-semibold">
            ✨ Drop to add component
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      }>
        <EditorContent />
      </Suspense>
    </ProtectedRoute>
  );
}
