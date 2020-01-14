#!/bin/bash
set -e
docker-compose -f docker-compose.main.yaml build
docker-compose -f docker-compose.main.yaml up
