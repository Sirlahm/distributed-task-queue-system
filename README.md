# Distributed Task Queue with Fault Tolerance and Dynamic Scaling

## Overview
This project implements a distributed task queue system using **Node.js**, **BullMQ**, and **Redis**, supporting **dynamic scaling** with **Docker & Kubernetes**.

## Features
- **Asynchronous Task Processing** with Redis-based message queue.
- **Dynamic Scaling** using Kubernetes HPA.
- **Fault Tolerance** via Redis Redlock & Exponential Backoff.
- **Unit & Integration Testing** with Jest & Supertest.
- **Docker & Kubernetes Deployment**.
## Installation
### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started)
- [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Steps
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start Redis:
   ```sh
   redis-server
   ```
   Or using Docker:
   ```sh
   docker run -d --name redis -p 6379:6379 redis
   ```
3. Start the system:
   ```sh
   npm start
   ```
4. Run tests:
   ```sh
   npm test
   ```
5. Run with Docker:
   ```sh
   docker-compose up --build
   ```
6. Deploy with Kubernetes:
   ```sh
   kubectl apply -f config/kubernetes.yaml
   ```
