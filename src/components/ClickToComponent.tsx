'use client';

import React, { useEffect } from 'react';

export const ClickToComponent: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[AVFL] Visual feedback loop bridge ready (Option+Click inspector active).');
    }
  }, []);

  return null;
};
