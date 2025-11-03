'use client';

import { Suspense } from 'react';
import { Toolbar } from '@/components/editor/Toolbar';
import { Canvas } from '@/components/editor/Canvas';

function EditorContent() {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1 overflow-auto">
        <Canvas />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
