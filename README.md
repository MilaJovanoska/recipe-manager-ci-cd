# Recipe Manager App - CI/CD Project

Recipe Manager App is a full-stack web application developed for the course **Continuous Integration and Delivery**.

The purpose of this project is to demonstrate a complete software delivery workflow using Git, GitHub, Docker, Docker Compose, GitHub Actions, DockerHub, Kubernetes, and structured project documentation.

## Project Overview

Recipe Manager App is a CRUD web application for managing recipes. The application is designed as a full-stack system composed of:

* a Spring Boot backend application,
* a React frontend application,
* a PostgreSQL database.

The functional scope of the application is intentionally focused on recipe management. The main emphasis of the project is the DevOps workflow around the application, including source control, containerization, orchestration, CI/CD automation, deployment, and documentation.

## Project Goal

The main goal of this repository is to clearly demonstrate the practical use of the following concepts:

* Git repository initialization and basic Git workflow,
* meaningful commit history,
* branching and merging,
* merge conflict resolution,
* GitHub Pull Request workflow,
* Docker image creation,
* multi-service orchestration with Docker Compose,
* CI/CD automation with GitHub Actions,
* container image publishing to DockerHub,
* Kubernetes deployment using YAML manifests,
* project documentation with commands, explanations, and screenshots.

## Planned Technology Stack

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Flyway
* Maven

### Frontend

* React
* TypeScript
* Vite
* Material UI
* Axios
* React Router

### DevOps and Deployment

* Git
* GitHub
* Docker
* Docker Compose
* GitHub Actions
* DockerHub
* Kubernetes

## Planned Repository Structure

The repository will be organized into separate sections for application code, DevOps configuration, Kubernetes manifests, and documentation.

```text
recipe-manager-ci-cd/
├── backend/
├── frontend/
├── docs/
│   └── screenshots/
├── k8s/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Documentation and Evidence

The documentation will include explanations of the main Git, GitHub, Docker, Docker Compose, GitHub Actions, DockerHub, and Kubernetes concepts used in the project.

Screenshots will be added as evidence for the most important steps, including:

* Git branch and commit history,
* fast-forward merge,
* three-way merge,
* merge conflict resolution,
* GitHub Pull Request workflow,
* Docker image build,
* Docker Compose services,
* GitHub Actions pipeline,
* DockerHub image repositories,
* Kubernetes resources.

## Development Status

Current status: initial repository setup.

The project will be developed step by step using a structured Git workflow, clear commit messages, feature branches, Pull Requests, and documented verification steps.
