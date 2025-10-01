import { base, baseSepolia } from 'wagmi/chains';

// USDC Contract Addresses
export const USDC_ADDRESSES = {
  [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  [baseSepolia.id]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const,
} as const;

// ERC-20 ABI (minimal for balance and transfer)
export const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
] as const;

// USDC has 6 decimals
export const USDC_DECIMALS = 6;

// Helper function to get USDC contract address for current chain
export function getUSDCAddress(chainId: number): `0x${string}` {
  const address = USDC_ADDRESSES[chainId as keyof typeof USDC_ADDRESSES];
  if (!address) {
    throw new Error(`USDC not supported on chain ${chainId}`);
  }
  return address;
}

// Helper function to format USDC amount (6 decimals)
export function formatUSDC(amount: bigint): string {
  const divisor = BigInt(10 ** USDC_DECIMALS);
  const wholePart = amount / divisor;
  const fractionalPart = amount % divisor;
  
  // Pad fractional part to 6 digits
  const fractionalStr = fractionalPart.toString().padStart(USDC_DECIMALS, '0');
  
  // Remove trailing zeros
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  if (trimmedFractional === '') {
    return wholePart.toString();
  }
  
  return `${wholePart}.${trimmedFractional}`;
}

// Helper function to parse USDC amount to BigInt (6 decimals)
export function parseUSDC(amount: string): bigint {
  const [whole, fractional = ''] = amount.split('.');
  
  // Ensure fractional part is not longer than 6 digits
  if (fractional.length > USDC_DECIMALS) {
    throw new Error(`Too many decimal places. USDC supports ${USDC_DECIMALS} decimals.`);
  }
  
  // Pad fractional part to 6 digits
  const paddedFractional = fractional.padEnd(USDC_DECIMALS, '0');
  
  return BigInt(whole + paddedFractional);
}