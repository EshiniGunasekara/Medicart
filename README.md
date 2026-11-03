# MediCart — pharmacy & wellness demo

A responsive React storefront with a small Node.js/Express API and PostgreSQL schema, designed as the application for a DevOps CI/CD coursework project.

> **Important:** This is an educational demo, not a real pharmacy. Catalogue entries are illustrative. It does not validate prescriptions, provide medical advice, take payments, or schedule real deliveries. Do not enter real personal or health information.

## Features

- Responsive storefront, product search and category filtering
- Shopping bag with quantity controls and subtotal
- Demo checkout flow (front-end only; no payment or real order submission)
- Express API endpoints: `/api/health`, `/api/products`, and `/api/orders`
- PostgreSQL schema for products and demo order records
- Dockerfiles and Docker Compose for local full-stack environment
- Automated API tests using Node's built-in test runner

## Run with Docker (recommended)

Install Docker Desktop and ensure its WSL integration is enabled if using WSL, then from this directory:

```bash
docker compose up --build
```

Open:
- Storefront: http://localhost:8080
- API health: http://localhost:4000/api/health
- API products: http://localhost:4000/api/products

Stop containers with `Ctrl+C`, then `docker compose down`. To also remove local database data, use `docker compose down -v`.

## Run without Docker

Install a supported Node.js LTS release (Node 20 or 22) and npm, then:

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:4000

For the frontend development server, the sample UI uses an illustrative local catalogue so it works independently. The API is a separate service.

Run the API tests:

```bash
npm test
```

Build the production frontend:

```bash
npm run build
```

## Main structure

```text
frontend/              React + Vite website
backend/src/server.js  Express REST API
backend/test/          Automated API tests
backend/schema.sql     PostgreSQL tables and seed catalogue
Dockerfile.frontend    Multi-stage frontend build
Dockerfile.backend    Containerized API
docker-compose.yml     Local frontend + API + database
```

## Next coursework steps

1. Create a GitHub repository and push this project.
2. Add a GitHub Actions workflow for build, tests and a failing quality-gate demonstration.
3. Add Terraform files to provision the chosen deployment environment.
4. Configure deployment secrets and automatic deployment after successful checks.
5. Capture genuine screenshots of passing and failing pipeline runs, IaC provisioning and the live environment.

Do not put passwords, access tokens, database credentials or private keys into Git.
