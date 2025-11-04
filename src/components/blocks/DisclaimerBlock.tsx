'use client';

import React from 'react';

export type DisclaimerBlockProps = {
  paidForBy: string;
  pacId: string;
  textColor?: string;
  backgroundColor?: string;
};

export const DisclaimerBlock: React.FC<DisclaimerBlockProps> = ({
  paidForBy,
  pacId,
  textColor = '#6b7280',
  backgroundColor = '#f9fafb',
}) => {
  return (
    <div
      className="py-4 px-6 text-center text-sm border-t"
      style={{
        color: textColor,
        backgroundColor: backgroundColor
      }}
    >
      <p>
        Paid for by {paidForBy} | PAC ID: {pacId}
      </p>
    </div>
  );
};

export const disclaimerBlockConfig = {
  type: 'disclaimer',
  name: 'Disclaimer',
  category: 'legal',
  defaultProps: {
    paidForBy: 'Americans for Progress PAC',
    pacId: 'C00123456',
    textColor: '#6b7280',
    backgroundColor: '#f9fafb',
  },
  propsSchema: {
    paidForBy: { type: 'text', label: 'Paid For By' },
    pacId: { type: 'text', label: 'PAC ID' },
    textColor: { type: 'color', label: 'Text Color' },
    backgroundColor: { type: 'color', label: 'Background Color' },
  },
};
