# Linux & MacOS

## Docker

```bash
$ make docker
```

### Open another terminal

## Running the app

```bash
$ make start

```

## Testing e2e

```bash
$ make tests
```

# Windows

## Installation

```bash
$ npm install
```

## Get tests

```bash
# unit tests
$ git submodule add https://github.com/Wikodit/2022B3API-testing.git test/

```

## Setting up database

```bash
$ docker-compose up --force-recreate -V

$ docker start postgres

$ docker exec -it postgres psql -U postgres
  CREATE DATABASE devapi;
  \c devapi
  create extension if not exists "uuid-ossp";
```

## Running the app

```bash
$ npm run start

```

## Testing e2e

```bash
$ npm run test
```
