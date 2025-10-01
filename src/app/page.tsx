'use client';

import WalletConnect from '@/components/WalletConnect';
import USDCBalance from '@/components/USDCBalance';
import USDCTransfer from '@/components/USDCTransfer';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Base Mini App
          </h1>
          <p className="text-lg text-gray-600">
            USDC DeFi functionality on Base network
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              🔵 Base Network
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              💰 USDC Ready
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Wallet Connection */}
          <WalletConnect />

          {/* Connected Features */}
          {isConnected && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* USDC Balance */}
              <div className="space-y-4">
                <USDCBalance />
              </div>

              {/* USDC Transfer */}
              <div className="space-y-4">
                <USDCTransfer />
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About This Mini App
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Features</h4>
                <ul className="space-y-1">
                  <li>• Connect wallet with OnchainKit</li>
                  <li>• View real-time USDC balance</li>
                  <li>• Transfer USDC with validation</li>
                  <li>• Transaction status tracking</li>
                  <li>• Base network support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Networks</h4>
                <ul className="space-y-1">
                  <li>• Base Mainnet (Chain ID: 8453)</li>
                  <li>• Base Sepolia (Chain ID: 84532)</li>
                  <li>• USDC Contract Integration</li>
                  <li>• Real-time balance updates</li>
                  <li>• Transaction receipts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
            <p>
              Built with Next.js 15, OnchainKit, and Wagmi on Base Network
            </p>
            <div className="mt-2 space-x-4">
              <a 
                href="https://docs.base.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Base Docs
              </a>
              <a 
                href="https://github.com/AidenP2P" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GitHub: AidenP2P
              </a>
              <a 
                href="https://onchainkit.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                OnchainKit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
