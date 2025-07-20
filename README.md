# Proyecto VOD

This is a video-on-demand application with Express backend and React frontend using Vite.

## Project Structure

- `client/` - React frontend built with Vite
- `server/` - Express backend API

## Setup

Install all dependencies for both the server and client:

```bash
npm run install:all
```

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
