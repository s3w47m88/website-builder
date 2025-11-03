# Website Builder by Spencer Hill

A modern, visual website builder with drag-and-drop editing, themes, templates, and inline content editing.

## Features

- **10 Pre-built Templates** - SaaS, Portfolio, E-commerce, and more
- **Inline Editing** - Click to edit text, images, and buttons directly
- **Drag & Drop** - Reorder components with visible drag handles
- **Theme System** - 8 pre-built themes with custom color palettes
- **Auto-save** - Changes persist automatically to Supabase
- **Share Links** - Public preview and edit URLs
- **Advanced Image Uploader** - Auto-resize and WebP conversion
- **10 Component Types** - Hero, CTA, Gallery, Text, Features, Testimonials, Pricing, Stats, Contact, Footer

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v3
- Zustand (State Management)
- Supabase (PostgreSQL Database)
- @dnd-kit (Drag and Drop)
- Replicate API (AI Image Generation)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- (Optional) Replicate API key for AI image generation

### Installation

1. Clone the repository:
\`\`\`bash
git clone git@github.com:s3w47m88/website-builder.git
cd website-builder
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file with your credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
SUPABASE_PROJECT_ID=your_project_id
REPLICATE_API_TOKEN=your_replicate_token (optional)
\`\`\`

4. Run the Supabase migration:
\`\`\`bash
npm run migrate
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Railway Deployment

This project is configured for Railway deployment using Railway.toml (not Nixpacks).

1. Install Railway CLI:
\`\`\`bash
npm i -g @railway/cli
\`\`\`

2. Login to Railway:
\`\`\`bash
railway login
\`\`\`

3. Link to your project:
\`\`\`bash
railway link
\`\`\`

4. Set environment variables:
\`\`\`bash
railway variables --set "NEXT_PUBLIC_SUPABASE_URL=your_url" \\
  --set "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key" \\
  --set "SUPABASE_SECRET_KEY=your_secret" \\
  --set "SUPABASE_PROJECT_ID=your_project_id"
\`\`\`

5. Deploy:
\`\`\`bash
railway up
\`\`\`

## Critical Issue: React Hooks in Helper Functions

### What Broke the Deployment

**Issue**: Calling React hooks (\`useEditorStore\`) inside a regular JavaScript helper function (\`renderComponent\`) violates React's Rules of Hooks.

**Deployment ID that worked**: `827692ce-619c-492f-a15d-9d1662fd2e84`

**What changed**: In commit `6699529`, theme colors were added to all components. The \`renderComponent\` helper function was modified to call \`useEditorStore((state) => state.theme)\` directly inside the function body.

### The Problem

React hooks can **only** be called:
1. At the top level of a React component
2. At the top level of a custom hook
3. **NOT** inside regular JavaScript functions, loops, or conditions

\`\`\`typescript
// ❌ WRONG - Breaks React Rules of Hooks
function renderComponent(...) {
  const theme = useEditorStore((state) => state.theme); // ERROR!
  // ...
}
\`\`\`

### The Fix

Pass the theme as a **parameter** instead of calling the hook inside the helper function:

\`\`\`typescript
// ✅ CORRECT - Call hook in the component, pass as parameter
export const EditableBlock: React.FC<EditableBlockProps> = ({ component, disabled = false }) => {
  const { updateComponent, removeComponent, theme } = useEditorStore(); // Hook called here ✓

  return (
    <div>
      {renderComponent(component, true, handleTextEdit, handleImageEdit, theme)} {/* Pass theme ✓ */}
    </div>
  );
};

// ✅ CORRECT - Accept theme as parameter
function renderComponent(
  component: ComponentData,
  editable: boolean,
  onTextEdit: (key: string, value: string) => void,
  onImageEdit: (key: string) => void,
  theme: any // Parameter instead of hook call ✓
) {
  const { type, props } = component;
  // Now use theme.colors.primary, theme.colors.secondary, etc.
}
\`\`\`

### How to Prevent This

**Rules to Follow:**

1. **Only call hooks at the component level** - Extract theme/state in the component, not in helper functions
2. **Pass state as parameters** - Helper functions should receive state as arguments
3. **Test builds locally** - Run \`npm run build\` before deploying to catch these errors early
4. **Check for hook violations** - Look for \`use*\` function calls inside non-component functions

**Example Pattern:**

\`\`\`typescript
// Component (can use hooks)
const MyComponent = () => {
  const data = useMyHook(); // ✅ OK
  return <div>{helperFunction(data)}</div>; // Pass to helper
};

// Helper function (receives data as param)
function helperFunction(data: any) { // ✅ OK
  // Do NOT call useMyHook() here ❌
  return data.value;
}
\`\`\`

### Build Verification

Always test production builds locally before deploying:

\`\`\`bash
npm run build
\`\`\`

If you see errors about "Invalid hook call" or hooks being called in wrong places, refactor to pass data as parameters instead.

## License

MIT

## Author

Spencer Hill - [GitHub](https://github.com/s3w47m88)
