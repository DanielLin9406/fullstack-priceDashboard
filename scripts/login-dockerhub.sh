#!/bin/bash
DOCKER_PASSWORD=$1
DOCKER_NAME=$2

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_NAME" --password-stdin