#!/bin/bash

# Build image
docker build -t pg-price-dashboard_upgrade-rules:latest -f ./docker-dev.dockerfile .

# Build all image and run container
docker-compose -f docker-compose-dev.yml --build
docker-compose up -d