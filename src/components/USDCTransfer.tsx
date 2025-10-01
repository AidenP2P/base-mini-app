'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract, useChainId } from 'wagmi';
import { isAddress, parseUnits } from 'viem';
import { ERC20_ABI, getUSDCAddress, formatUSDC, parseUSDC } from '@/config/contracts';

export default function USDCTransfer() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get current balance
  const { data: balance } = useReadContract({
    address: getUSDCAddress(chainId),
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Write contract hook for transfer
  const { writeContract, data: hash, isPending } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const validateInputs = () => {
    setError('');
    
    if (!recipient.trim()) {
      setError('Please enter a recipient address');
      return false;
    }
    
    if (!isAddress(recipient)) {
      setError('Please enter a valid Ethereum address');
      return false;
    }
    
    if (!amount.trim()) {
      setError('Please enter an amount');
      return false;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return false;
    }
    
    if (numAmount.toString().split('.')[1]?.length > 6) {
      setError('USDC supports maximum 6 decimal places');
      return false;
    }
    
    try {
      const amountInWei = parseUSDC(amount);
      if (balance && amountInWei > balance) {
        setError(`Insufficient balance. You have ${formatUSDC(balance as bigint)} USDC`);
        return false;
      }
    } catch (err) {
      setError('Invalid amount format');
      return false;
    }
    
    if (recipient.toLowerCase() === address?.toLowerCase()) {
      setError('Cannot send USDC to yourself');
      return false;
    }
    
    return true;
  };

  const handleTransfer = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const amountInWei = parseUSDC(amount);
      
      writeContract({
        address: getUSDCAddress(chainId),
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, amountInWei],
      });
      
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
      setIsLoading(false);
    }
  };

  // Handle transaction status
  useEffect(() => {
    if (isConfirmed) {
      setSuccess(`Successfully transferred ${amount} USDC to ${recipient}`);
      setRecipient('');
      setAmount('');
      setIsLoading(false);
    }
  }, [isConfirmed, amount, recipient]);

  useEffect(() => {
    if (isPending || isConfirming) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPending, isConfirming]);

  if (!isConnected || !address) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">
          Connect your wallet to transfer USDC
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Transfer USDC
      </h3>
      
      <div className="space-y-4">
        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (USDC)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.000000"
              step="0.000001"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-gray-500 text-sm">USDC</span>
            </div>
          </div>
          {balance && (
            <p className="text-sm text-gray-500 mt-1">
              Available: {formatUSDC(balance as bigint)} USDC
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
            {hash && (
              <p className="text-green-600 text-xs mt-1 break-all">
                Transaction: {hash}
              </p>
            )}
          </div>
        )}

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          disabled={isLoading || !recipient || !amount}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isLoading || !recipient || !amount
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading
            ? isPending
              ? '📝 Preparing Transaction...'
              : isConfirming
              ? '⏳ Confirming Transaction...'
              : 'Processing...'
            : '💸 Transfer USDC'
          }
        </button>

        {/* Transaction Status */}
        {hash && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-600 text-sm font-medium">Transaction Submitted</p>
            <p className="text-blue-600 text-xs mt-1 break-all">
              Hash: {hash}
            </p>
            <a
              href={`https://${chainId === 8453 ? 'basescan.org' : 'sepolia.basescan.org'}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xs underline hover:text-blue-800"
            >
              View on BaseScan →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}