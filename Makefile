SHELL := /bin/bash

ARROW := \033[1m\033[31m>\033[32m>\033[33m>\033[39m
CL_GREEN := \033[32m
CL_RESET := \033[39m



node_modules:
	@ echo -e "${ARROW} Install dependencies..."
	@ npm install


test:
	@ echo -e "${ARROW} Clone test module..."
	@ git submodule add https://github.com/Wikodit/2022B3API-testing.git test/



docker:
	@ # Execute this command inside another terminal
	@ echo -e "${ARROW} Setting up database..."
	@ docker compose up --force-recreate -V


start: node_modules test
	@ echo -e "${ARROW} Running the app..."
	@ npm run start


tests:
	@ echo -e "${ARROW} Run tests..."
	@ npm run test



.PHONY: docker start tests
