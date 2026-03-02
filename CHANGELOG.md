# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-03-02

### 🏗 Infrastructure & DevOps
- **Docker**: Migrated all backend services (`prices`, `promotions`, `upgrade-rules`, `user`) to **Multi-stage Builds** using `node:alpine`. This significantly reduced image size and improved security by removing dev dependencies from production images.
- **Configuration**: Removed legacy `config/dev.js` and `config/keys.js`. Implemented **Zod** schema validation for environment variables (`src/config/env.js`). Services now fail fast at startup if required variables are missing or invalid.

### ♻️ Refactor
- **Shared Library**: Created a `shared/` directory to house common logic:
  - `libs/logger`: Centralized Winston configuration.
  - `libs/auth`: Unified Authentication middleware (migrated from `request-promise` to `axios`).
  - `libs/middleware`: Generic Zod request validation middleware.
  - `libs/router`: Express router factory.
- **Logging**: Replaced ad-hoc `console.log` with **Structured Logging (Winston)**. Logs are now output as JSON in production, suitable for ingestion by ELK/CloudWatch.
- **Prices Service**:
  - Removed anti-pattern Mongoose `exec` monkey-patching.
  - Implemented **Repository Pattern** in `PriceService.js` to handle Cache-Aside logic explicitly and cleanly.
- **Clean Up**: Removed unused legacy files and redundant dependencies (`request`, `request-promise`).

### ✨ Features
- **Health Checks**: Added `GET /health` endpoints to all microservices to support Kubernetes Liveness/Readiness probes.
- **Validation**: Added **Zod** middleware to `Promotions` service for `POST` and `PUT` requests, ensuring data integrity before reaching controllers.

### 📝 Documentation
- **README**: Complete overhaul of project documentation including architecture overview, tech stack details, and standardized startup instructions.
- **JSDoc**: Added comprehensive JSDoc comments to:
  - Core Services (`Prices`, `Promotions`).
  - Mongoose Schemas.
  - Shared Utilities and Middleware.
  - Frontend Helper functions.