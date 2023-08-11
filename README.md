# Home Library Service

A Joi library is used to validate all schemas.
A Prisma was used as an ORM to store and update data.

## Downloading

```
git clone https://github.com/kosta4310/nodejs2023Q2-service.git
```

## Go to folder `nodejs2023Q2-service` and change the branch to `task2`

## Installing NPM modules

```
npm install
```

## Running a Docker container

A Docker Desktop must be running.
You need change a name of file `.env.example` to `.env`

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scan for security vulnerabilities

```
npm run scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
