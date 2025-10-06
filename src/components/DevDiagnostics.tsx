'use client';

import { useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export default function DevDiagnostics() {
  const { isConnected } = useAccount();
  const { connectors } = useConnect();
  const [open, setOpen] = useState(true);

  const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
  const okitApiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '';

  const providers = useMemo(() => {
    if (typeof window === 'undefined') return [] as string[];
    const names: string[] = [];
    const eth: any = (window as any).ethereum;
    if (eth) {
      if (eth.isMetaMask) names.push('MetaMask');
      if (eth.isCoinbaseWallet) names.push('Coinbase Wallet');
      if (eth.providers && Array.isArray(eth.providers)) {
        for (const p of eth.providers) {
          if (p.isMetaMask && !names.includes('MetaMask')) names.push('MetaMask');
          if (p.isCoinbaseWallet && !names.includes('Coinbase Wallet')) names.push('Coinbase Wallet');
        }
      }
      if (names.length === 0) names.push('Injected');
    }
    return names;
  }, []);

  const okitOk = okitApiKey && okitApiKey.trim().length >= 10;
  const wcOk = wcProjectId && wcProjectId.trim().length >= 16;

  const mask = (v: string, keep = 4) => (v ? `${v.slice(0, keep)}…${v.slice(-keep)}` : '');

  return (
    <div className="w-full">
      <div className={`mb-4 rounded-md border p-3 text-sm ${!okitOk || !wcOk ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : 'bg-green-50 border-green-200 text-green-900'}`}>
        <div className="flex items-center justify-between">
          <div className="font-medium">Dev Diagnostics</div>
          <button className="text-xs underline" onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'}</button>
        </div>
        {open && (
          <div className="mt-2 grid gap-1">
            <div>
              <span className="font-medium">OnchainKit API Key:</span>{' '}
              {okitOk ? `OK (${mask(okitApiKey)})` : 'Missing or invalid'}
            </div>
            <div>
              <span className="font-medium">WalletConnect Project ID:</span>{' '}
              {wcOk ? `OK (${mask(wcProjectId)})` : 'Missing or invalid'}
            </div>
            <div>
              <span className="font-medium">Connectors:</span>{' '}
              {connectors && connectors.length > 0 ? connectors.map((c) => c.name).join(', ') : 'None detected'}
            </div>
            <div>
              <span className="font-medium">Browser Providers:</span>{' '}
              {providers.length > 0 ? providers.join(', ') : 'None'}
            </div>
            <div>
              <span className="font-medium">isConnected:</span> {isConnected ? 'true' : 'false'}
            </div>
            {!wcOk && (
              <div className="mt-1">Set NEXT_PUBLIC_WC_PROJECT_ID and restart the dev server.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

