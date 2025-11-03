import { supabase, PageConfig } from './supabase';

export async function savePage(pageConfig: Omit<PageConfig, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('pages')
    .insert({
      name: pageConfig.name,
      components: pageConfig.components,
      theme: pageConfig.theme,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving page:', error);
    throw new Error('Failed to save page');
  }

  return data as PageConfig;
}

export async function updatePage(id: string, pageConfig: Partial<PageConfig>) {
  const { data, error } = await supabase
    .from('pages')
    .update({
      name: pageConfig.name,
      components: pageConfig.components,
      theme: pageConfig.theme,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating page:', error);
    throw new Error('Failed to update page');
  }

  return data as PageConfig;
}

export async function loadPage(id: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error loading page:', error);
    throw new Error('Failed to load page');
  }

  return data as PageConfig;
}

export async function listPages() {
  const { data, error } = await supabase
    .from('pages')
    .select('id, name, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error listing pages:', error);
    throw new Error('Failed to list pages');
  }

  return data;
}

export async function deletePage(id: string) {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting page:', error);
    throw new Error('Failed to delete page');
  }
}
