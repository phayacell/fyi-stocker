# FYI Stocker

[![CircleCI](https://circleci.com/gh/hayato-yamashita/fyi-stocker.svg?style=svg&circle-token=7828e4d68ed4bc296c9811e6e9417e53ae654a1e)](https://circleci.com/gh/hayato-yamashita/fyi-stocker)

FYI に投稿した URL をストックするサービス。

## Required

- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### Versions

```bash
$ docker -v
Docker version 18.09.0, build 4d60db4
```

```bash
$ docker-compose -v
docker-compose version 1.23.2, build 1110ad01
```

## Build Setup

```bash
# install dependencies
$ docker-compose build

# serve with hot reload at localhost:3000
$ docker-compose up

# generate static project
$ docker-compose run --rm nuxt yarn run generate
```
