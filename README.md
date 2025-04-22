# Simple Limitless Chat App

This is a simplified version of the Limitless Chat App that is designed to deploy easily to Vercel without any TypeScript errors or configuration issues.

## Features

- Chat interface with simulated responses based on Limitless pendant data
- Daily summary view with simulated data
- Settings page to store API keys (stored locally in browser)
- Support for both OpenAI and Anthropic Claude models
- Simple, clean UI using Tailwind CSS

## Deployment Instructions

### Deploy to Vercel

1. Fork or clone this repository to your GitHub account
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
3. Click "New Project" and import this repository
4. Keep all default settings (no environment variables needed for this demo)
5. Click "Deploy"

That's it! Your app will be deployed and accessible at a Vercel URL.

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## About This Version

This is a simplified version that uses:
- Next.js 12.3.4 and React 17.0.2 for maximum stability
- Tailwind CSS loaded via CDN (no build process needed)
- No TypeScript or complex dependencies
- Simulated data instead of actual API calls

The app demonstrates the UI and interaction flow without requiring actual API connections initially. You can later enhance it to use real API calls once the basic deployment is working.

## API Keys

The app is designed to work with:
- Limitless API Key: `sk-2a4a4d9e-23d2-4e5a-aba1-3e3809b4d287`
- OpenAI API Key: `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`
- Anthropic API Key: `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`

These keys are stored in your browser's localStorage and are not sent to any server in this demo version.
