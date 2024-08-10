'use client';

import React, { useState, useEffect } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<any>(null);

  useEffect(() => {
    const newCache = createCache({ key: 'css' });
    newCache.compat = true;
    setCache(newCache);
  }, []);

  if (!cache) return null;

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
