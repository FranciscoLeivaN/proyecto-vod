# Proyecto VOD

This is a video-on-demand application with Express backend and React frontend using Vite.

## Project Structure

- `client/` - React frontend built with Vite
- `server/` - Express backend API
- `terraform/` - Infrastructure as Code for Docker deployment
- `.github/workflows/` - GitHub Actions workflows for deployment

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

## Deployment with Terraform and Docker

This project includes Terraform configuration to deploy the application using Docker containers.

### Prerequisites
- [Terraform](https://www.terraform.io/downloads.html) (v1.0+)
- [Docker](https://www.docker.com/get-started) installed and functioning
- [Docker Compose](https://docs.docker.com/compose/install/) (optional)

### Deployment Steps

1. Navigate to the Terraform directory:
   ```bash
   cd terraform
   ```

2. Create a `terraform.tfvars` file based on the example:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit the `terraform.tfvars` file with your values:
   - `tmdb_api_token`: Your TMDB API token
   - `server_port`: Port to expose the server (default: 3000)
   - `client_port`: Port to expose the client (default: 5173)
   - `use_nginx`: Whether to use Nginx as a reverse proxy

4. Initialize Terraform:
   ```bash
   terraform init
   ```

5. Deploy the infrastructure:
   ```bash
   terraform apply
   ```

For more details, see the [Terraform README](./terraform/README.md).

## Deployment with GitHub Pages

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Prerequisites
- GitHub repository with GitHub Pages enabled (see detailed instructions below)
- TMDB API Token added as a repository secret named `TMDB_API_TOKEN`

### Enabling GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" in the top navigation
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "GitHub Actions"
5. Save the settings

For more detailed instructions, see [GitHub Pages Setup Guide](./docs/github-pages-setup.md)

### How it works
1. Push your changes to the `main` branch
2. GitHub Actions workflow will build the React application
3. The built application will be deployed to GitHub Pages
4. The application will be available at `https://[your-username].github.io/proyecto-vod/`

### Manual deployment
You can also trigger the deployment manually from the Actions tab in your GitHub repository.

### Note about server functionality
When deployed to GitHub Pages, the application runs without the Express backend. All API calls are made directly to the TMDB API using the client-side environment variable.
