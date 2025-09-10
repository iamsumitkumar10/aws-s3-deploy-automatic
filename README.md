# AWS S3 Automatic Deployment Project

This project demonstrates a **React application** deployment workflow using **Jenkins**, **Docker**, and **AWS S3**. The pipeline automatically builds, deploys, and sends notifications upon deployment.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Project Structure](#project-structure)
* [Setup & Installation](#setup--installation)
* [Docker Setup](#docker-setup)
* [Jenkins Pipeline](#jenkins-pipeline)
* [AWS S3 Deployment](#aws-s3-deployment)
* [Email Notifications](#email-notifications)
* [License](#license)

---

## Project Overview

This project automates the deployment of a React application to **AWS S3** using **Jenkins pipelines**. The workflow includes:

1. Code changes pushed to Git repository.
2. Jenkins automatically fetches the latest code.
3. Project is built using Node.js.
4. Build output is deployed to an AWS S3 bucket.
5. Email notifications are sent on success or failure.

---

## Project Structure

```
aws-s3-deploy-automatic/
│
├─ src/
│  └─ App.js
├─ public/
├─ package.json
├─ package-lock.json
├─ Dockerfile        # For production deployment using Nginx
├─ Dockerfile.dev    # For local development
├─ Jenkinsfile       # CI/CD pipeline configuration
├─ README.md
└─ ...
```

---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/iamsumitkumar10/aws-s3-deploy-automatic.git
cd aws-s3-deploy-automatic
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Your React app will run at `http://localhost:5173`.

---

## Docker Setup

### Development Docker

```dockerfile
# Dockerfile.dev
FROM node:19-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]
```

### Production Docker

```dockerfile
# Dockerfile
FROM nginx:1.27.5-alpine-slim
WORKDIR /app
COPY ./dist /usr/share/nginx/html
EXPOSE 80
```

Build and run production Docker:

```bash
docker build -t react-app .
docker run -p 80:80 react-app
```

---

## Jenkins Pipeline

The **Jenkinsfile** automates the following stages:

1. **Clean Workspace** – Remove old build files and clear npm cache.
2. **Git Clone** – Clone the repository from GitHub.
3. **Setup NodeJS** – Install npm dependencies.
4. **Build Project** – Generate production build.
5. **Upload Build to S3** – Sync `dist/` folder with AWS S3 bucket.

---

## AWS S3 Deployment

* **Bucket Name:** `aws-s3-deploy-automatic`
* **Region:** `ap-south-1`
* The build folder `dist/` is uploaded to S3 automatically via the Jenkins pipeline.
* Existing files in the bucket are deleted to maintain a clean deployment.

---

## Email Notifications

After each build, Jenkins sends email notifications:

* **Success:** Build is successfully deployed, includes `BUILD_URL`.
* **Failure:** Build failed, includes `BUILD_URL` for logs.

Configured using `emailext` plugin in Jenkins.

