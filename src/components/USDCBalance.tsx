'use client';

import { useAccount, useReadContract, useChainId } from 'wagmi';
import { ERC20_ABI, getUSDCAddress, formatUSDC } from '@/config/contracts';
import { useEffect } from 'react';

export default function USDCBalance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  // Read USDC balance
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: getUSDCAddress(chainId),
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  // Read USDC symbol
  const { data: symbol } = useReadContract({
    address: getUSDCAddress(chainId),
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: isConnected,
    },
  });

  // Refetch balance when component mounts or address changes
  useEffect(() => {
    if (address && isConnected) {
      refetch();
    }
  }, [address, isConnected, refetch]);

  if (!isConnected || !address) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">
          Connect your wallet to view USDC balance
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 text-center">
          Error loading USDC balance: {error.message}
        </p>
        <button 
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors mx-auto block"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Your USDC Balance
        </h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading balance...</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">
              {balance ? formatUSDC(balance as bigint) : '0.00'} {symbol || 'USDC'}
            </div>
            
            <div className="text-sm text-gray-500">
              Raw balance: {balance?.toString() || '0'}
            </div>
            
            <button 
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : '🔄 Refresh Balance'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-white rounded-lg">
        <div className="text-xs text-gray-500 space-y-1">
          <div>Contract: {getUSDCAddress(chainId)}</div>
          <div>Network: {chainId === 8453 ? 'Base Mainnet' : 'Base Sepolia'}</div>
          <div>Decimals: 6</div>
        </div>
      </div>
    </div>
  );
}