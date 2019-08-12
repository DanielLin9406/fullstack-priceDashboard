#!/bin/bash

# Build image for a particular services 
docker build -t pg-price-dashboard_nginx:latest -f ./docker-dev.dockerfile .
docker build -t pg-price-dashboard_web:latest -f ./docker-dev.dockerfile .
docker build -t pg-price-dashboard_user:latest -f ./docker-dev.dockerfile .
docker build -t pg-price-dashboard_prices:latest -f ./docker-dev.dockerfile .
docker build -t pg-price-dashboard_promotions:latest -f ./docker-dev.dockerfile .
docker build -t pg-price-dashboard_upgrade-rules:latest -f ./docker-dev.dockerfile .

# Build all image and run container
docker-compose -f docker-compose-dev.yml --build
docker-compose -f docker-compose-dev.yml up
docker-compose up -d


