import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Fix for BigInt serialization and other blockchain-related issues
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
    };
    // Stub React Native async storage required by MetaMask SDK in web builds
    // This avoids bundling RN-only package '@react-native-async-storage/async-storage'
    // which causes "Module not found" in browser/Next.js environments.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ['@react-native-async-storage/async-storage']: false,
    };

    // Enable external modules for better compatibility
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    return config;
  },

  // Enable for better blockchain integration
  transpilePackages: [
    '@coinbase/onchainkit',
    '@rainbow-me/rainbowkit',
    'wagmi',
    'viem'
  ],

  // Environment variables validation (optional but recommended)
  env: {
    NEXT_PUBLIC_WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
  },
};

export default nextConfig;
