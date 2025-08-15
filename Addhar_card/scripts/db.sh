#!/bin/bash

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to start database
start_db() {
    echo "Starting PostgreSQL database..."
    docker-compose up -d
    echo "Waiting for database to be ready..."
    sleep 5
}

# Function to stop database
stop_db() {
    echo "Stopping PostgreSQL database..."
    docker-compose down
}

# Function to reset database
reset_db() {
    echo "Resetting database..."
    docker-compose down -v
    docker-compose up -d
    echo "Waiting for database to be ready..."
    sleep 5
    echo "Running Prisma migrations..."
    npx prisma migrate reset --force
}

# Check if Docker is running
check_docker

# Parse command line arguments
case "$1" in
    "start")
        start_db
        ;;
    "stop")
        stop_db
        ;;
    "reset")
        reset_db
        ;;
    *)
        echo "Usage: $0 {start|stop|reset}"
        exit 1
        ;;
esac
