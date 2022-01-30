# APIs | Tecnical Challenge

Prove of conception application to define module structures, used packages, test structure, ci configuration and other concepts

# Prerequisites:

Have installed:

[Docker](https://docs.docker.com/install/)

[Docker compose](https://docs.docker.com/compose/install/)

# Run

Install dependencies

```shell
yarn
```

To run application to develop:

```shell
docker-compose up
```

# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Quick summary
- Version
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up?

- Summary of set up
- Configuration
- Dependencies
- How to run tests

### Contribution guidelines

- Writing tests
- Code review

### Who do I talk to?

- Repo owner or admin
- Other community or team contact
- All changes on files is refreshed in docker-compose context.

Apllication run in `http://localhost:3000` or EXPRESS_PORT environment variable

# Lint

To run application lint:

```shell
yarn lint
```

# Tests

To single execution:

```shell
yarn test
```

To watch:

```shell
yarn test:watch
```

## Integration Tests

To single execution:

```shell
yarn test:e2e
```

## Coverage

```shell
yarn test:cov
```
