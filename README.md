# Price Dashboard

[![Build Status](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard.svg?branch=master)](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive full-stack microservices application designed for managing product pricing, promotions, and upgrade rules. Originally developed as an internal tool, this project has been modernized into a robust, containerized solution demonstrating professional software engineering practices.

![Dashboard Preview](https://i.imgur.com/rAfJDVF.png)

## 🚀 Overview

The Price Dashboard serves as a central hub for pricing strategy management. It allows administrators to:
- Visualize current and upcoming promotions.
- Calculate complex product pricing based on user history and upgrade paths.
- Manage pricing rules dynamically.

The system is built on a **microservices architecture**, ensuring scalability and separation of concerns.

## 🏗 Architecture

The application is composed of several decoupled services:

- **Web Service**: A React-based frontend application.
- **User Service**: Handles authentication and user management (OAuth 2.0).
- **Prices Service**: Manages base product prices.
- **Promotions Service**: Handles promotional logic and scheduling.
- **Upgrade Rules Service**: Calculates pricing based on product upgrade paths.
- **Infrastructure**:
  - **Nginx**: Acts as a reverse proxy and static file server.
  - **Redis**: Provides caching for high-performance data retrieval.
  - **MongoDB Atlas**: Cloud-hosted NoSQL database for persistence.

## 🛠 Tech Stack

### Frontend (Web)
- **Core**: React 16, Redux (Module Pattern), React Router 4
- **Build Tools**: Webpack 4, Babel 7
- **Styling**: SCSS, Styled Components
- **State Management**: Redux Thunk, Context API
- **Quality**: ESLint, Prettier, Husky

### Backend (API Services)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching**: Redis
- **Authentication**: Google OAuth 2.0

### DevOps & Infrastructure
- **Containerization**: Docker, Docker Compose
- **CI/CD**: Travis CI
- **Cloud**: AWS (ECS, EKS ready), Terraform
- **Orchestration**: Kubernetes (k8s scripts included)

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js**: v10.16.0 or higher (v14+ recommended for local dev outside Docker)
- **npm**: v6.9+
- **Docker**: v19.03+
- **Docker Compose**: v1.25+

## ⚡ Getting Started

The recommended way to run the application is via **Docker Compose**, which orchestrates all services and dependencies automatically.

### Method 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DanielLin9406/fullstack-priceDashboard.git
   cd fullstack-priceDashboard
   ```

2. **Configure Environment Variables**
   Ensure `.env` files are set up in each service directory (`services/*/`). See the Environment Configuration section below.

3. **Start the Application**
   ```bash
   docker-compose -f docker-compose-dev.yml up
   ```

4. **Access the Dashboard**
   Open your browser and navigate to [http://localhost:3050](http://localhost:3050).

### Method 2: Local Development (npm)

For individual service development, you can run services locally.

1. **Install Dependencies**
   ```bash
   # Root dependencies
   npm install

   # Service dependencies
   npm install --prefix services/web
   npm install --prefix services/prices
   # ... repeat for other services
   ```

2. **Start Redis**
   ```bash
   redis-server
   ```

3. **Start Services**
   ```bash
   npm start
   ```
   This will use `concurrently` to start all services. Access the web app at [http://localhost:8080](http://localhost:8080).

## 🔧 Environment Configuration

Each service requires specific environment variables. Create a `.env` file in the respective service directories:

**Web Service** (`services/web/.env`)
```ini
GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
API_HOST_PRICES=http://localhost
API_PORT_PRICES=5000
# ... (see .env.example if available)
```

**Backend Services** (`services/prices/.env`, etc.)
```ini
PORT=5000
DATABASE_URL_DEV=<Your MongoDB Atlas Connection String>
REDIS_HOST_DEV=127.0.0.1
AUTH_HOST_DEV=localhost
```

## 📦 Production Build

To run the production version locally:

```bash
docker-compose -f docker-compose-stage.yml up
```
This serves the optimized React build via Nginx. Access at [http://localhost:3060](http://localhost:3060).

## 🧪 Testing (TODO)

- **Unit Tests**: Jest + Enzyme/React Testing Library
- **Integration Tests**: Supertest for APIs
- **E2E**: Cypress or Puppeteer

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
