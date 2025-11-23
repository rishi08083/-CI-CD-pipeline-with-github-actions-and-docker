# 🚀 CI/CD Pipeline with GitHub Actions & Docker

A complete CI/CD pipeline implementation using GitHub Actions, Docker, and Docker Hub with a self-hosted runner on Windows. This project automates the entire workflow from code commit to Docker image deployment without requiring cloud infrastructure.

[![CI Pipeline](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/)
[![Self-Hosted](https://img.shields.io/badge/Runner-Self--Hosted-success)](https://docs.github.com/en/actions/hosting-your-own-runners)

## 📌 Project Overview

This project demonstrates a production-ready CI/CD pipeline that:

### 1️⃣ **CI Pipeline**

Automatically triggered on every push to the `main` branch:

- Checks out the latest code
- Authenticates with Docker Hub
- Builds Docker image from Dockerfile
- Pushes the image to Docker Hub repository
- Runs on a self-hosted Windows runner for full control

### 2️⃣ **Self-Hosted GitHub Runner**

A local Windows machine configured as a GitHub Actions runner that:

- Executes CI/CD workflows
- Provides faster build times
- Offers complete environment customization
- Reduces dependency on GitHub-hosted runners

### 3️⃣ **Docker Integration**

Complete containerization setup including:

- Custom Dockerfile for application packaging
- Docker Hub integration for image registry
- Local testing with Docker run commands
- Optional Minikube support for Kubernetes testing

## 🛠️ Technology Stack

| Technology                | Purpose                               |
| ------------------------- | ------------------------------------- |
| **GitHub Actions**        | CI/CD orchestration and automation    |
| **Docker**                | Application containerization          |
| **Docker Hub**            | Container registry for storing images |
| **Self-Hosted Runner**    | Custom Windows-based build agent      |
| **Minikube** _(Optional)_ | Local Kubernetes testing environment  |

## ✨ Key Features

- ✅ Fully automated CI/CD pipeline
- ✅ Zero cloud costs (uses self-hosted infrastructure)
- ✅ Docker Hub integration for image storage
- ✅ Secure credential management with GitHub Secrets
- ✅ Windows-compatible self-hosted runner
- ✅ Extensible workflow for testing and deployment
- ✅ Production-ready Dockerfile configuration

## 🔧 Setup Instructions

### Prerequisites

Ensure you have the following installed and configured:

- ✔️ **Docker Desktop** (for Windows)
- ✔️ **Git** (version control)
- ✔️ **GitHub account** (with repository access)
- ✔️ **Docker Hub account** (free tier works)
- ✔️ **Windows machine** (for self-hosted runner)

### ✅ Step 1: Clone the Repository

```bash
git clone https://github.com/rishi08083/-CI-CD-pipeline-with-github-actions-and-docker.git
cd -CI-CD-pipeline-with-github-actions-and-docker
```

### ✅ Step 2: Environment Setup

Verify all prerequisites are properly installed:

```bash
# Check Docker installation
docker --version

# Check Git installation
git --version

# Login to Docker Hub
docker login
```

### 🐳 Step 3: Docker Configuration

#### Build Docker Image Locally

```bash
docker build -t <your-dockerhub-username>/<image-name>:latest .
```

#### Run Docker Container Locally

```bash
docker run -p 3000:3000 <your-dockerhub-username>/<image-name>:latest
```

Access your application at `http://localhost:3000`

#### Push to Docker Hub (Manual - First Time)

```bash
docker login
docker push <your-dockerhub-username>/<image-name>:latest
```

### 🔐 Step 4: Configure GitHub Secrets

Navigate to your repository settings and add the following secrets:

1. Go to: **GitHub Repo → Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Add these secrets:

| Secret Name       | Value                        | Description                                            |
| ----------------- | ---------------------------- | ------------------------------------------------------ |
| `DOCKER_USERNAME` | Your Docker Hub username     | Used for Docker Hub authentication                     |
| `DOCKER_PASSWORD` | Your Docker Hub access token | Generate from Docker Hub → Account Settings → Security |

> **⚠️ Important:** Use Docker Hub access tokens instead of your password for better security.

### 🖥️ Step 5: Setup Self-Hosted Runner (Windows)

#### Step 1: Create Runner Directory

```powershell
mkdir C:\actions-runner
cd C:\actions-runner
```

#### Step 2: Download GitHub Runner

Go to: **GitHub Repo → Settings → Actions → Runners → New self-hosted runner**

GitHub will provide the download link. Download the runner package.

#### Step 3: Extract the Package

```powershell
# Extract using PowerShell
Expand-Archive -Path actions-runner-win-x64-*.zip -DestinationPath .
```

#### Step 4: Configure the Runner

GitHub provides a configuration command with a token. Run it:

```powershell
.\config.cmd --url https://github.com/rishi08083/-CI-CD-pipeline-with-github-actions-and-docker --token <GENERATED-TOKEN>
```

Follow the prompts:

- **Runner group:** Press Enter (default)
- **Runner name:** Press Enter or provide custom name
- **Labels:** Press Enter (uses default: self-hosted, Windows, X64)
- **Work folder:** Press Enter (uses default: \_work)

Expected output:

```
√ Runner successfully added
√ Runner connection is good
```

#### Step 5: Install and Start Runner as a Service

```powershell
# Install the service
.\svc.cmd install

# Start the service
.\svc.cmd start

# Check service status
.\svc.cmd status
```

Expected output:

```
√ Service actions.runner.<repo-name>.<runner-name> installed successfully
√ Service actions.runner.<repo-name>.<runner-name> started successfully
```

### 🟢 Step 6: Verify Runner Status

1. Navigate to: **GitHub → Repository → Settings → Actions → Runners**
2. You should see your runner with status: **🟢 Idle** (green dot)

### 🔁 Step 7: GitHub Actions Workflow

The CI/CD workflow is configured in `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: self-hosted

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker image
        run: docker build -t ${{ secrets.DOCKER_USERNAME }}/your-app-name:latest .

      - name: Push Docker image to Docker Hub
        run: docker push ${{ secrets.DOCKER_USERNAME }}/your-app-name:latest

      - name: Image digest
        run: echo "Image pushed successfully!"
```

> **📝 Note:** Replace `your-app-name` with your actual Docker Hub repository name.

### 🧪 Step 8: Test the CI/CD Pipeline

#### Trigger the Pipeline

Make a change to your code and push:

```bash
git add .
git commit -m "Testing CI/CD pipeline"
git push origin main
```

#### Monitor the Workflow

1. Go to: **GitHub → Repository → Actions**
2. You should see a new workflow run
3. Click on it to see real-time logs

Expected workflow steps:

- ✅ Set up job
- ✅ Checkout code
- ✅ Login to Docker Hub
- ✅ Build Docker image
- ✅ Push Docker image
- ✅ Complete job

### 🎯 Step 9: Verify Docker Hub

1. Visit [Docker Hub](https://hub.docker.com/)
2. Navigate to your repositories
3. Confirm your image is pushed with the latest tag
4. Check the timestamp matches your workflow run

## 📁 Project Structure

```
-CI-CD-pipeline-with-github-actions-and-docker/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline configuration
├── src/                        # Application source code
├── Dockerfile                  # Docker image definition
├── docker-compose.yml          # (Optional) Multi-container setup
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

## 🐳 Dockerfile Example

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## 📸 Screenshots & Deliverables

### Required Screenshots for Documentation

1. **✅ Self-Hosted Runner Status**

   - Location: GitHub → Settings → Actions → Runners
   - Shows: Runner online with green status indicator

2. **✅ Workflow Execution Results**

   - Location: GitHub → Actions tab
   - Shows: Successful workflow run with all steps completed

3. **✅ Docker Hub Repository**

   - Location: Docker Hub dashboard
   - Shows: Pushed image with latest tag

4. **✅ Local Docker Execution**

   - Terminal output showing: `docker run` command and application running

5. **✅ Project Folder Structure**

   - Screenshot of: Complete directory tree with all files

6. **✅ Application Running Locally**
   - Browser screenshot: Application accessed at localhost

## 🚀 Deployment Options

### Option 1: Local Docker Deployment

```bash
# Pull from Docker Hub
docker pull <your-username>/<image-name>:latest

# Run the container
docker run -d -p 3000:3000 <your-username>/<image-name>:latest
```

### Option 2: Minikube Deployment (Optional)

```bash
# Start Minikube
minikube start

# Create deployment
kubectl create deployment my-app --image=<your-username>/<image-name>:latest

# Expose the deployment
kubectl expose deployment my-app --type=NodePort --port=3000

# Get the service URL
minikube service my-app --url
```

### Option 3: Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"
services:
  app:
    image: <your-username>/<image-name>:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## 🔍 Troubleshooting

### Runner Not Connecting

```powershell
# Check service status
.\svc.cmd status

# View service logs
Get-EventLog -LogName Application -Source actions.runner.* -Newest 50

# Restart the service
.\svc.cmd stop
.\svc.cmd start
```

### Docker Build Failures

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t <image-name> .
```

### GitHub Actions Workflow Failing

- Verify GitHub Secrets are correctly configured
- Check runner logs in GitHub Actions tab
- Ensure Docker is running on the runner machine
- Verify network connectivity to Docker Hub

## 🎯 Project Outcomes

By completing this project, you have successfully:

- ✅ Built a complete CI/CD pipeline from scratch
- ✅ Automated Docker image building and deployment
- ✅ Configured and managed a self-hosted GitHub runner
- ✅ Integrated GitHub Actions with Docker Hub
- ✅ Implemented secure credential management
- ✅ Created production-ready containerized applications
- ✅ Gained hands-on DevOps experience

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Self-Hosted Runner Guide](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Docker Hub Guide](https://docs.docker.com/docker-hub/)
- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)

## 👤 Author

**Rishi**

- GitHub: [@rishi08083](https://github.com/rishi08083)
- Repository: [CI-CD-pipeline-with-github-actions-and-docker](https://github.com/rishi08083/-CI-CD-pipeline-with-github-actions-and-docker)

⭐ **Star this repository** if you found it helpful!

**Made with ❤️ and DevOps best practices**
