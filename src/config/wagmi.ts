'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';

// Fail fast on missing or placeholder WalletConnect Project ID
if (!projectId || projectId === 'your_walletconnect_project_id_here') {
  throw new Error(
    'NEXT_PUBLIC_WC_PROJECT_ID is missing or placeholder. Set a valid WalletConnect Project ID in .env.local and restart the server.'
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Base Mini App',
  projectId,
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
