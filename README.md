# Base Mini App - USDC DeFi

A modern Web3 mini-app built for the Base network featuring USDC DeFi functionality.

## Features

- 🔵 **Base Network Integration** - Built specifically for Base Mainnet and Base Sepolia
- 💰 **USDC Operations** - View balances and transfer USDC tokens
- 🔗 **Wallet Connection** - Seamless wallet integration using OnchainKit
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- ⚡ **Real-time Updates** - Live balance updates and transaction tracking
- 🛡️ **Security** - Input validation and error handling
- 🚀 **Production Ready** - Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Blockchain**: Coinbase OnchainKit + Wagmi + Viem
- **Styling**: Tailwind CSS
- **Network**: Base (Mainnet & Sepolia)
- **Token**: USDC (USD Coin)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AidenP2P/base-mini-app.git
cd base-mini-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_coinbase_api_key
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | Coinbase OnchainKit API key | Yes |
| `NEXT_PUBLIC_WC_PROJECT_ID` | WalletConnect Project ID | Yes |

## Network Configuration

### Base Mainnet
- **Chain ID**: 8453
- **RPC URL**: https://mainnet.base.org
- **USDC Contract**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

### Base Sepolia (Testnet)
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **USDC Contract**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

## Usage

1. **Connect Wallet**: Click the connect button to link your Web3 wallet
2. **Switch Network**: Ensure you're on Base Mainnet or Base Sepolia
3. **View Balance**: Your USDC balance will display automatically
4. **Transfer USDC**: Enter recipient address and amount to send USDC
5. **Track Transactions**: Monitor transaction status and view on BaseScan

## Architecture

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── WalletConnect.tsx    # Wallet connection UI
│   ├── USDCBalance.tsx      # Balance display
│   ├── USDCTransfer.tsx     # Transfer functionality
│   └── Providers.tsx        # Web3 providers
├── config/              # Configuration files
│   ├── wagmi.ts            # Wagmi configuration
│   └── contracts.ts        # Contract addresses & ABIs
└── hooks/               # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the MIT License.

## Links

- [Live Demo](https://base-mini-app-aidenp2p.vercel.app) (Coming Soon)
- [Base Documentation](https://docs.base.org)
- [OnchainKit](https://onchainkit.xyz)
- [GitHub Repository](https://github.com/AidenP2P/base-mini-app)

## Author

**AidenP2P** - [GitHub](https://github.com/AidenP2P)

Built with ❤️ for the Base ecosystem
