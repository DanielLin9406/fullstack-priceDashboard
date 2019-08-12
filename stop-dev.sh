#!/bin/bash
docker stop $(docker ps -a -q)
docker stop rm <containerID>
docker container rm <containerID>