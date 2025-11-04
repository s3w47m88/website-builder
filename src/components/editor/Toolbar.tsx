'use client';

import React, { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor-store';
import { getAllBlockConfigs, getCategories } from '@/lib/block-registry';
import { Plus, Eye, EyeOff, Palette, Layout, Share2, Blocks, Briefcase } from 'lucide-react';
import { ThemePanel } from './ThemePanel';
import { TemplateSelector } from './TemplateSelector';
import { ShareLink } from './ShareLink';
import { BrandPanel } from './BrandPanel';
import { loadPage } from '@/lib/page-service';
import { PageTemplate } from '@/lib/templates';
import { useSearchParams } from 'next/navigation';

export const Toolbar: React.FC = () => {
  const { addComponent, isEditing, setEditing, components, theme, pageName, currentPageId, setPageName, setCurrentPageId, loadPage: loadPageToStore, resetEditor, isSaving } = useEditorStore();
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const searchParams = useSearchParams();

  const categories = getCategories();
  const blocks = getAllBlockConfigs();

  // Load page from URL parameter on mount
  useEffect(() => {
    const pageId = searchParams.get('page');
    if (pageId) {
      loadPage(pageId).then((page) => {
        loadPageToStore(page);
      }).catch((err) => {
        console.error('Failed to load page from URL:', err);
      });
    }
  }, [searchParams, loadPageToStore]);

  const handleAddBlock = (type: string, defaultProps: Record<string, any>) => {
    addComponent(type, defaultProps);
    setShowBlockLibrary(false);
  };

  const handleSelectTemplate = (template: PageTemplate) => {
    loadPageToStore({
      id: crypto.randomUUID(),
      name: template.name,
      components: template.components,
      theme: template.theme,
    });
  };

  const [showBrandPanel, setShowBrandPanel] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="text-xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-red-600 focus:outline-none px-2 py-1"
            placeholder="Campaign Name"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBrandPanel(true)}
            className="group flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            title="Brand"
          >
            <Briefcase size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Brand</span>
          </button>

          <button
            onClick={() => setShowTemplateSelector(true)}
            className="group flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            title="Templates"
          >
            <Layout size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Templates</span>
          </button>

          <button
            onClick={() => setShowBlockLibrary(!showBlockLibrary)}
            className="group flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            title="Add Component"
          >
            <Blocks size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Add Component</span>
          </button>

          <button
            onClick={() => setEditing(!isEditing)}
            className="group flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            title={isEditing ? 'Preview' : 'Edit'}
          >
            {isEditing ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">{isEditing ? 'Preview' : 'Edit'}</span>
          </button>

          <button
            onClick={() => setShowThemePanel(true)}
            className="group flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            title="Theme"
          >
            <Palette size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Theme</span>
          </button>

          <button
            onClick={() => setShowShareLink(true)}
            className="group flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            title="Share"
          >
            <Share2 size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Share</span>
          </button>

          {isSaving ? (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved
            </div>
          )}
        </div>
      </div>

      {/* Brand Panel */}
      <BrandPanel isOpen={showBrandPanel} onClose={() => setShowBrandPanel(false)} />

      {/* Theme Panel */}
      <ThemePanel isOpen={showThemePanel} onClose={() => setShowThemePanel(false)} />

      {/* Template Selector */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Share Link */}
      <ShareLink isOpen={showShareLink} onClose={() => setShowShareLink(false)} />

      {/* Block Library Modal */}
      {showBlockLibrary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Component</h2>
              <button
                onClick={() => setShowBlockLibrary(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {categories.map((category) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold capitalize mb-4">{category}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {blocks
                      .filter((block) => block.category === category)
                      .map((block) => (
                        <button
                          key={block.type}
                          onClick={() => handleAddBlock(block.type, block.defaultProps)}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                        >
                          <div className="font-semibold mb-1">{block.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{block.category}</div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
