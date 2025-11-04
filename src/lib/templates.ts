import { ComponentData, ThemeConfig } from './supabase';

export type PageTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  components: ComponentData[];
  theme: ThemeConfig;
};

// Template 1: Conservative Campaign Landing Page (Fully Populated)
const modernSaaSTemplate: PageTemplate = {
  id: 'modern-saas',
  name: 'Conservative Campaign',
  description: 'Professional campaign page for conservative candidates',
  category: 'Campaign',
  thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400',
  theme: {
    colors: {
      primary: '#DC2626',
      secondary: '#1D4ED8',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#F59E0B',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-1',
      type: 'hero',
      order: 0,
      props: {
        title: 'Fighting for American Values',
        subtitle: 'A proven conservative leader committed to freedom, security, and prosperity for all Americans',
        ctaText: 'Join Our Movement',
        ctaLink: '#',
      },
    },
    {
      id: 'text-1',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Trusted by thousands of conservative Americans</h2><p>From Main Street to Capitol Hill, we are building a movement for common-sense conservative values.</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      order: 2,
      props: {
        title: 'Our Conservative Priorities',
        images: [
          { url: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=400', alt: 'American Flag' },
          { url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400', alt: 'Community' },
          { url: 'https://images.unsplash.com/photo-1551817958-11e0f7bbef87?w=400', alt: 'Growth' },
        ],
        columns: 3,
      },
    },
    {
      id: 'text-2',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">A Platform Built on American Values</h2><p class="text-xl">Lower taxes, stronger borders, individual liberty, and limited government - the principles that made America great.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Ready to Make a Difference?',
        description: 'Join thousands of Americans standing up for conservative values',
        buttonText: 'Get Involved',
        buttonLink: '#',
        backgroundColor: '#DC2626',
      },
    },
  ],
};

// Template 2: Grassroots Campaign (Fully Populated)
const creativePortfolioTemplate: PageTemplate = {
  id: 'creative-portfolio',
  name: 'Grassroots Campaign',
  description: 'Build momentum from the ground up',
  category: 'Campaign',
  thumbnail: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400',
  theme: {
    colors: {
      primary: '#DC2626',
      secondary: '#1D4ED8',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#F59E0B',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-2',
      type: 'hero',
      order: 0,
      props: {
        title: 'A Voice for the People',
        subtitle: 'Standing strong for conservative principles and American values in our community',
        ctaText: 'Volunteer Now',
        ctaLink: '#',
      },
    },
    {
      id: 'text-3',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">About Our Candidate</h2><p class="text-lg">A lifelong conservative with deep roots in our community, fighting for lower taxes, limited government, and individual freedom.</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-2',
      type: 'gallery',
      order: 2,
      props: {
        title: 'On the Campaign Trail',
        images: [
          { url: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=400', alt: 'Rally' },
          { url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400', alt: 'Community' },
          { url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400', alt: 'Event' },
          { url: 'https://images.unsplash.com/photo-1464652149449-f3b8538144aa?w=400', alt: 'Town Hall' },
          { url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400', alt: 'Meeting' },
          { url: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400', alt: 'Speech' },
        ],
        columns: 3,
      },
    },
    {
      id: 'text-4',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Our Conservative Agenda</h2><p class="text-lg">Second Amendment Rights • Lower Taxes • Border Security • School Choice • Law & Order</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-2',
      type: 'cta',
      order: 4,
      props: {
        heading: "Join the Fight for Freedom",
        description: 'Every patriot counts. Volunteer, donate, or spread the word to help us win',
        buttonText: 'Take Action',
        buttonLink: '#',
        backgroundColor: '#DC2626',
      },
    },
  ],
};

// Template 3: Dark Cyberpunk (Fully Populated)
const darkCyberpunkTemplate: PageTemplate = {
  id: 'dark-cyberpunk',
  name: 'Dark Cyberpunk',
  description: 'Futuristic dark theme for tech products',
  category: 'Tech',
  thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
  theme: {
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      background: '#0f172a',
      text: '#e2e8f0',
      accent: '#06b6d4',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'dark',
  },
  components: [
    {
      id: 'hero-3',
      type: 'hero',
      order: 0,
      props: {
        title: 'The Future is Now',
        subtitle: 'Next-generation AI-powered solutions for the modern world',
        ctaText: 'Enter Portal',
        ctaLink: '#',
      },
    },
    {
      id: 'text-5',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-4xl font-bold mb-4 text-pink-500">Revolutionary Technology</h2><p class="text-xl text-slate-300">Experience the cutting edge of innovation with our advanced AI platform that transforms how you work.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'gallery-3',
      type: 'gallery',
      order: 2,
      props: {
        title: 'Core Systems',
        images: [
          { url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400', alt: 'System 1' },
          { url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400', alt: 'System 2' },
          { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', alt: 'System 3' },
        ],
        columns: 3,
      },
    },
    {
      id: 'text-6',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4 text-cyan-400">Advanced Capabilities</h2><p class="text-lg text-slate-400">Neural networks • Quantum processing • Real-time analytics • Predictive modeling</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-3',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Access the System',
        description: 'Join the revolution and unlock unlimited potential',
        buttonText: 'Initialize Connection',
        buttonLink: '#',
        backgroundColor: '#ec4899',
      },
    },
  ],
};

// Template 4: Minimal Blog (Fully Populated)
const minimalBlogTemplate: PageTemplate = {
  id: 'minimal-blog',
  name: 'Minimal Blog',
  description: 'Clean and elegant blog layout',
  category: 'Blog',
  thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
  theme: {
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#3b82f6',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-4',
      type: 'hero',
      order: 0,
      props: {
        title: 'Thoughts & Ideas',
        subtitle: 'A minimal blog about design, development, and creative thinking',
        ctaText: 'Read Articles',
        ctaLink: '#',
      },
    },
    {
      id: 'text-7',
      type: 'text',
      order: 1,
      props: {
        content: '<article class="prose prose-lg"><h2>Latest Articles</h2><p>Discover insights on modern web development, design principles, and creative thinking that will transform your work.</p></article>',
        alignment: 'left',
        fontSize: 'lg',
      },
    },
    {
      id: 'text-8',
      type: 'text',
      order: 2,
      props: {
        content: '<article class="prose prose-lg"><h3>The Art of Simplicity in Design</h3><p>Published March 15, 2025</p><p>Learn how minimalism can enhance user experience and create more impactful digital products.</p></article>',
        alignment: 'left',
        fontSize: 'md',
      },
    },
    {
      id: 'text-9',
      type: 'text',
      order: 3,
      props: {
        content: '<article class="prose prose-lg"><h3>Modern JavaScript Best Practices</h3><p>Published March 10, 2025</p><p>Explore cutting-edge JavaScript techniques and patterns that will level up your development skills.</p></article>',
        alignment: 'left',
        fontSize: 'md',
      },
    },
    {
      id: 'cta-4',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Subscribe to Newsletter',
        description: 'Get weekly insights delivered to your inbox',
        buttonText: 'Subscribe',
        buttonLink: '#',
        backgroundColor: '#1f2937',
      },
    },
  ],
};

// Template 5: E-commerce Product (Fully Populated)
const ecommerceTemplate: PageTemplate = {
  id: 'ecommerce-product',
  name: 'E-commerce Product',
  description: 'Product landing page for online stores',
  category: 'E-commerce',
  thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
  theme: {
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-5',
      type: 'hero',
      order: 0,
      props: {
        title: 'Premium Wireless Headphones',
        subtitle: 'Studio-quality sound. All-day comfort. 30-hour battery life.',
        ctaText: 'Shop Now - $299',
        ctaLink: '#',
      },
    },
    {
      id: 'text-10',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Features</h2><p class="text-lg">• Active Noise Cancellation<br>• Hi-Res Audio Certified<br>• Bluetooth 5.3<br>• Fast Charging (10 min = 5 hours)</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-4',
      type: 'gallery',
      order: 2,
      props: {
        title: 'Product Images',
        images: [
          { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', alt: 'Product view 1' },
          { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400', alt: 'Product view 2' },
          { url: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400', alt: 'Product view 3' },
          { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', alt: 'Product view 4' },
        ],
        columns: 4,
      },
    },
    {
      id: 'text-11',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Customer Reviews</h2><p class="text-xl">⭐⭐⭐⭐⭐ 4.9/5 from 2,847 reviews</p><p class="text-lg mt-4">"Best headphones I\'ve ever owned. The sound quality is incredible!" - Sarah M.</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-5',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Free Shipping & Returns',
        description: 'Order now and get free 2-day shipping + 60-day money-back guarantee',
        buttonText: 'Order Now',
        buttonLink: '#',
        backgroundColor: '#10b981',
      },
    },
  ],
};

// Template 6: Agency Landing (Fully Populated)
const agencyTemplate: PageTemplate = {
  id: 'agency-landing',
  name: 'Agency Landing',
  description: 'Professional agency showcase',
  category: 'Business',
  thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
  theme: {
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-6',
      type: 'hero',
      order: 0,
      props: {
        title: 'Digital Agency for Bold Brands',
        subtitle: 'We help companies build remarkable digital experiences that drive growth',
        ctaText: 'View Our Work',
        ctaLink: '#',
      },
    },
    {
      id: 'text-12',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">Our Services</h2><p class="text-xl">Strategy • Design • Development • Growth</p><p class="text-lg mt-4">End-to-end digital solutions tailored to your business needs.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'gallery-5',
      type: 'gallery',
      order: 2,
      props: {
        title: 'Recent Work',
        images: [
          { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', alt: 'Project 1' },
          { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', alt: 'Project 2' },
          { url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400', alt: 'Project 3' },
        ],
        columns: 3,
      },
    },
    {
      id: 'text-13',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2><p class="text-lg">We\'ve helped 200+ companies achieve their digital goals</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-6',
      type: 'cta',
      order: 4,
      props: {
        heading: "Let's create something amazing",
        description: 'Start your project with us today and bring your vision to life',
        buttonText: 'Get Started',
        buttonLink: '#',
        backgroundColor: '#6366f1',
      },
    },
  ],
};

// Template 7: Event Landing (Fully Populated)
const eventTemplate: PageTemplate = {
  id: 'event-landing',
  name: 'Event Landing',
  description: 'Conference and event promotion',
  category: 'Event',
  thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  theme: {
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#eab308',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-7',
      type: 'hero',
      order: 0,
      props: {
        title: 'Web Summit 2025',
        subtitle: 'Join 10,000+ attendees • March 15-17 • San Francisco',
        ctaText: 'Register Now',
        ctaLink: '#',
      },
    },
    {
      id: 'text-14',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">What to Expect</h2><p class="text-xl">3 days of keynotes, workshops, and networking with industry leaders</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'text-15',
      type: 'text',
      order: 2,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Featured Speakers</h2><p class="text-lg">• Jane Doe - CEO at TechCorp<br>• John Smith - Founder of StartupX<br>• Sarah Johnson - VP of Product at InnovateCo<br>• Mike Chen - Lead Designer at DesignHub</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-6',
      type: 'gallery',
      order: 3,
      props: {
        title: 'Last Year\'s Highlights',
        images: [
          { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400', alt: 'Event 1' },
          { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400', alt: 'Event 2' },
          { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', alt: 'Event 3' },
        ],
        columns: 3,
      },
    },
    {
      id: 'cta-7',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Early Bird Pricing',
        description: 'Save 30% on tickets - Limited spots available',
        buttonText: 'Secure Your Spot',
        buttonLink: '#',
        backgroundColor: '#f97316',
      },
    },
  ],
};

// Template 8: App Launch (Fully Populated)
const appLaunchTemplate: PageTemplate = {
  id: 'app-launch',
  name: 'App Launch',
  description: 'Mobile app marketing page',
  category: 'Tech',
  thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
  theme: {
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-8',
      type: 'hero',
      order: 0,
      props: {
        title: 'Your Life, Organized',
        subtitle: 'The productivity app that adapts to you. Available on iOS and Android.',
        ctaText: 'Download Free',
        ctaLink: '#',
      },
    },
    {
      id: 'text-16',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Why Users Love It</h2><p class="text-lg">• Smart task management with AI<br>• Seamless calendar integration<br>• Team collaboration features<br>• Cross-platform sync</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-7',
      type: 'gallery',
      order: 2,
      props: {
        title: 'App Screenshots',
        images: [
          { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', alt: 'Screenshot 1' },
          { url: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=400', alt: 'Screenshot 2' },
          { url: 'https://images.unsplash.com/photo-1551817958-11e0f7bbef87?w=400', alt: 'Screenshot 3' },
          { url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', alt: 'Screenshot 4' },
        ],
        columns: 4,
      },
    },
    {
      id: 'text-17',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Ratings & Reviews</h2><p class="text-xl">⭐⭐⭐⭐⭐ 4.8/5 on App Store</p><p class="text-xl">⭐⭐⭐⭐⭐ 4.7/5 on Google Play</p><p class="text-lg mt-4">Over 1 million downloads worldwide</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-8',
      type: 'cta',
      order: 4,
      props: {
        heading: 'Start Being More Productive Today',
        description: 'Free to download with premium features available',
        buttonText: 'Download Now',
        buttonLink: '#',
        backgroundColor: '#06b6d4',
      },
    },
  ],
};

// Template 9: Startup Pitch (Fully Populated)
const startupPitchTemplate: PageTemplate = {
  id: 'startup-pitch',
  name: 'Startup Pitch',
  description: 'Investor-ready startup presentation',
  category: 'Business',
  thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
  theme: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-9',
      type: 'hero',
      order: 0,
      props: {
        title: 'Disrupting the Industry',
        subtitle: 'Series A Funding Complete - $10M Raised',
        ctaText: 'View Pitch Deck',
        ctaLink: '#',
      },
    },
    {
      id: 'text-18',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">The Problem</h2><p class="text-xl">Traditional solutions are outdated, expensive, and slow. Businesses lose $500B annually due to inefficiency.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'text-19',
      type: 'text',
      order: 2,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">Our Solution</h2><p class="text-xl">AI-powered platform that reduces costs by 80% and increases efficiency by 5x.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'text-20',
      type: 'text',
      order: 3,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Traction</h2><p class="text-lg">• 500+ enterprise customers<br>• $5M ARR in 18 months<br>• 300% YoY growth<br>• Team of 45 across 3 continents</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-8',
      type: 'gallery',
      order: 4,
      props: {
        title: 'Our Team',
        images: [
          { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', alt: 'Team member 1' },
          { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', alt: 'Team member 2' },
          { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400', alt: 'Team member 3' },
        ],
        columns: 3,
      },
    },
    {
      id: 'cta-9',
      type: 'cta',
      order: 5,
      props: {
        heading: "Join Our Journey",
        description: "We're hiring talented people to change the world",
        buttonText: 'View Careers',
        buttonLink: '#',
        backgroundColor: '#8b5cf6',
      },
    },
  ],
};

// Template 10: Wellness & Health (Fully Populated)
const wellnessTemplate: PageTemplate = {
  id: 'wellness-health',
  name: 'Wellness & Health',
  description: 'Calming design for wellness brands',
  category: 'Health',
  thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
  theme: {
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    mode: 'light',
  },
  components: [
    {
      id: 'hero-10',
      type: 'hero',
      order: 0,
      props: {
        title: 'Find Your Balance',
        subtitle: 'Holistic wellness coaching for mind, body, and spirit',
        ctaText: 'Book Consultation',
        ctaLink: '#',
      },
    },
    {
      id: 'text-21',
      type: 'text',
      order: 1,
      props: {
        content: '<h2 class="text-4xl font-bold mb-6">Our Approach</h2><p class="text-xl">Evidence-based practices combined with ancient wisdom for lasting transformation.</p>',
        alignment: 'center',
        fontSize: 'xl',
      },
    },
    {
      id: 'text-22',
      type: 'text',
      order: 2,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Services</h2><p class="text-lg">• Personal Wellness Coaching<br>• Nutrition Planning<br>• Mindfulness & Meditation<br>• Movement & Yoga<br>• Sleep Optimization</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'gallery-9',
      type: 'gallery',
      order: 3,
      props: {
        title: 'Transform Your Life',
        images: [
          { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', alt: 'Wellness 1' },
          { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', alt: 'Wellness 2' },
          { url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400', alt: 'Wellness 3' },
        ],
        columns: 3,
      },
    },
    {
      id: 'text-23',
      type: 'text',
      order: 4,
      props: {
        content: '<h2 class="text-3xl font-bold mb-4">Client Success Stories</h2><p class="text-lg">"This program changed my life. I feel healthier and more balanced than ever before." - Emily R.</p><p class="text-lg mt-3">"The coaches are incredible. They truly care about your wellbeing." - David L.</p>',
        alignment: 'center',
        fontSize: 'lg',
      },
    },
    {
      id: 'cta-10',
      type: 'cta',
      order: 5,
      props: {
        heading: 'Start Your Journey Today',
        description: 'Free 30-minute consultation with our wellness experts',
        buttonText: 'Book Now',
        buttonLink: '#',
        backgroundColor: '#059669',
      },
    },
  ],
};

export const pageTemplates: PageTemplate[] = [
  modernSaaSTemplate,
  creativePortfolioTemplate,
  darkCyberpunkTemplate,
  minimalBlogTemplate,
  ecommerceTemplate,
  agencyTemplate,
  eventTemplate,
  appLaunchTemplate,
  startupPitchTemplate,
  wellnessTemplate,
];

export const getTemplateById = (id: string): PageTemplate | undefined => {
  return pageTemplates.find((template) => template.id === id);
};

export const getTemplatesByCategory = (category: string): PageTemplate[] => {
  return pageTemplates.filter((template) => template.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  pageTemplates.forEach((template) => categories.add(template.category));
  return Array.from(categories);
};
