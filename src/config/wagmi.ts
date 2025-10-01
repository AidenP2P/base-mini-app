'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not set');
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Base Mini App',
  projectId,
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});