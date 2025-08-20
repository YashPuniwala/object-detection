#!/bin/bash

# Object Detection App Startup Script for Windows
echo "🚀 Starting Object Detection Application..."

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker Desktop first."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Check if Docker Compose is available
if docker compose version > /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
    echo "✅ Using Docker Compose plugin"
elif command -v docker-compose > /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker-compose"
    echo "✅ Using Docker-Compose standalone"
else
    echo "❌ Docker Compose is not available."
    exit 1
fi

# Function to start development mode
start_dev() {
    echo "🔧 Starting in development mode..."
    $DOCKER_COMPOSE_CMD --profile dev up --build
}

# Function to start production mode
start_prod() {
    echo "🏭 Starting in production mode..."
    $DOCKER_COMPOSE_CMD up --build
}

# Parse command line arguments
case "${1:-}" in
    "dev")
        check_docker
        start_dev
        ;;
    "prod")
        check_docker
        start_prod
        ;;
    *)
        echo "Usage: $0 {dev|prod}"
        echo "  dev   - Start in development mode"
        echo "  prod  - Start in production mode"
        exit 1
        ;;
esac