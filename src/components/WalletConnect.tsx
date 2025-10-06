'use client';

import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DevDiagnostics from '@/components/DevDiagnostics';

export default function WalletConnect() {
  const { address, isConnected, chain } = useAccount();

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <DevDiagnostics />
      <h2 className="text-2xl font-bold text-gray-800">
        Base Mini App - USDC DeFi
      </h2>
      
      <div className="flex flex-col items-center gap-4">
        {!isConnected ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your wallet to interact with USDC on Base
            </p>
            {/* Fallback to RainbowKit Connect in case OnchainKit button is blocked */}
            <div className="inline-flex items-center justify-center">
              <ConnectButton showBalance={false} chainStatus="icon" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              If the button above does not respond, try refreshing or disabling blockers.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              ✅ Wallet Connected
            </p>
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com/">
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            
            {address && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Connected Address:</p>
                <p className="text-xs font-mono text-gray-800 break-all">
                  {address}
                </p>
                {chain && (
                  <p className="text-sm text-gray-600 mt-2">
                    Network: <span className="font-semibold">{chain.name}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {chain && chain.id !== 8453 && chain.id !== 84532 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ Please switch to Base Mainnet or Base Sepolia to use this app
          </p>
        </div>
      )}
    </div>
  );
}
