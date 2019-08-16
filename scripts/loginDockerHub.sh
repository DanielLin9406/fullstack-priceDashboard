#!/bin/bash
$DOCKER_PASSWORD=$1
$DOCKER_ID=$2

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin