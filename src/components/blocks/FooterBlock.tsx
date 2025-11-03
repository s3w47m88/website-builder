'use client';

import React from 'react';

export type FooterBlockProps = {
  companyName: string;
  tagline: string;
  links: Array<{
    title: string;
    url: string;
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
};

export const FooterBlock: React.FC<FooterBlockProps> = ({
  companyName,
  tagline,
  links,
  socialLinks = [],
}) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{companyName}</h3>
            <p className="text-gray-400">{tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-2xl hover:text-blue-400 transition-colors"
                  title={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const footerBlockConfig = {
  type: 'footer',
  name: 'Footer',
  category: 'layout',
  defaultProps: {
    companyName: 'Your Company',
    tagline: 'Building amazing experiences',
    links: [
      { title: 'About', url: '#about' },
      { title: 'Services', url: '#services' },
      { title: 'Contact', url: '#contact' },
      { title: 'Privacy', url: '#privacy' },
    ],
    socialLinks: [
      { platform: 'Twitter', url: '#', icon: '𝕏' },
      { platform: 'Facebook', url: '#', icon: '📘' },
      { platform: 'Instagram', url: '#', icon: '📷' },
    ],
  },
  propsSchema: {
    companyName: { type: 'text', label: 'Company Name' },
    tagline: { type: 'text', label: 'Tagline' },
    links: { type: 'array', label: 'Links' },
    socialLinks: { type: 'array', label: 'Social Links' },
  },
};
