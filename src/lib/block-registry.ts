import { HeroBlock, heroBlockConfig } from '@/components/blocks/HeroBlock';
import { CTABlock, ctaBlockConfig } from '@/components/blocks/CTABlock';
import { GalleryBlock, galleryBlockConfig } from '@/components/blocks/GalleryBlock';
import { TextBlock, textBlockConfig } from '@/components/blocks/TextBlock';
import { FeatureBlock, featureBlockConfig } from '@/components/blocks/FeatureBlock';
import { TestimonialBlock, testimonialBlockConfig } from '@/components/blocks/TestimonialBlock';
import { PricingBlock, pricingBlockConfig } from '@/components/blocks/PricingBlock';
import { StatsBlock, statsBlockConfig } from '@/components/blocks/StatsBlock';
import { ContactBlock, contactBlockConfig } from '@/components/blocks/ContactBlock';
import { FooterBlock, footerBlockConfig } from '@/components/blocks/FooterBlock';

export type BlockConfig = {
  type: string;
  name: string;
  category: string;
  defaultProps: Record<string, any>;
  propsSchema: Record<string, any>;
};

export type BlockComponent = React.FC<any>;

export const blockRegistry: Record<string, { component: BlockComponent; config: BlockConfig }> = {
  hero: { component: HeroBlock, config: heroBlockConfig },
  cta: { component: CTABlock, config: ctaBlockConfig },
  gallery: { component: GalleryBlock, config: galleryBlockConfig },
  text: { component: TextBlock, config: textBlockConfig },
  feature: { component: FeatureBlock, config: featureBlockConfig },
  testimonial: { component: TestimonialBlock, config: testimonialBlockConfig },
  pricing: { component: PricingBlock, config: pricingBlockConfig },
  stats: { component: StatsBlock, config: statsBlockConfig },
  contact: { component: ContactBlock, config: contactBlockConfig },
  footer: { component: FooterBlock, config: footerBlockConfig },
};

export const getBlockComponent = (type: string): BlockComponent | null => {
  return blockRegistry[type]?.component || null;
};

export const getBlockConfig = (type: string): BlockConfig | null => {
  return blockRegistry[type]?.config || null;
};

export const getAllBlockConfigs = (): BlockConfig[] => {
  return Object.values(blockRegistry).map((block) => block.config);
};

export const getBlocksByCategory = (category: string): BlockConfig[] => {
  return getAllBlockConfigs().filter((config) => config.category === category);
};

export const getCategories = (): string[] => {
  const categories = new Set<string>();
  getAllBlockConfigs().forEach((config) => categories.add(config.category));
  return Array.from(categories);
};
