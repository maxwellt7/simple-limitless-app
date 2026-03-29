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
- Next.js 14.2.x and React 18.2.x for maximum stability
- Tailwind CSS loaded via CDN (no build process needed)
- No TypeScript or complex dependencies
- Simulated data instead of actual API calls

The app demonstrates the UI and interaction flow without requiring actual API connections initially. You can later enhance it to use real API calls once the basic deployment is working.

## API Keys

The app requires the following API keys (see `.env.example`):
- **Limitless API Key** (required)
- **OpenAI API Key** (at least one LLM provider required)
- **Anthropic API Key** (at least one LLM provider required)

Keys are stored in your browser's localStorage and are not sent to any server in this demo version.
