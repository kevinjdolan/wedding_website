#!/bin/bash
set -e
docker-compose -f docker-compose.migrate.yaml build
docker-compose -f docker-compose.migrate.yaml up
