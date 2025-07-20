# Proyecto VOD

This is a video-on-demand application with Express backend and React frontend using Vite.

## Project Structure

- `client/` - React frontend built with Vite
- `server/` - Express backend API

## Setup

1. Install all dependencies for both the server and client:

```bash
npm run install:all
```

2. Configure environment variables:

Create a `.env` file in the `client` directory with the following variables:
```
VITE_TMDB_API_TOKEN=your_tmdb_api_token_here
```

You can copy the `.env.example` file as a starting point:
```bash
cp client/.env.example client/.env
```

To get a TMDB API token:
- Register at [themoviedb.org](https://www.themoviedb.org/signup)
- Go to your account settings -> API -> Create -> Request an API key
- Once approved, generate an API Read Access Token (v4 auth)

## Development

Start the backend server (runs on port 3000):

```bash
npm run dev:server
```

In a separate terminal, start the frontend development server (runs on port 5173):

```bash
npm run dev:client
```

## Building for Production

Build the frontend for production:

```bash
npm run build
```

This will create a `dist` folder in the client directory with optimized production build.

## Running in Production

To run the application in production mode:

```bash
npm start
```

This will serve the static frontend files from the Express server.
