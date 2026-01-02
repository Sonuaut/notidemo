# School Management System

## Development Notes

### API Access
The application uses an API that may be served through ngrok during development. When accessing the ngrok URL, you might see a warning like:

```
You are about to visit 4358-112-196-96-42.ngrok-free.app, served by 112.196.96.42. 
This website is served for free through ngrok.com. 
You should only visit this website if you trust whoever sent the link to you. (ERR_NGROK_6024)
```

This is a standard security warning from ngrok. You can safely proceed if you're working on this project.

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

For development with ngrok, use:
```
NEXT_PUBLIC_API_URL=https://7bff-112-196-96-42.ngrok-free.app
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.