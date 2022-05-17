# NodeJS REST API with Express, Mysql, and JWT Authentication

## Features
1. User can sign up
2. User can sign in
3. User can reset password
4. User can create Property advert
5. User can view all Property adverts
6. User can view all Property adverts created by a specific user
7. User can view all Property adverts of a specific type
8. User can view a single Property advert
9. User can update his Property advert
10. User can mark his Property advert as sold
11. User can delete his Property advert

## API endpoints

1. `POST /api/v1/auth/signup`: Creates a new user
2. `POST /api/v1/auth/signin`: Logs in a user
3. `PATCH /api/v1/auth/reset-password`: Resets a user's password
4. `GET /api/v1/property`: Fetchs all property adverts
5. `GET /api/v1/property/search?type=propertyType`: Fetchs all property adverts of a specific type
6. `GET /api/v1/property/owner/<:userId>`: Fetchs all property adverts created by a specific user
7. `POST /api/v1/property`: Creates a new property advert
8. `PATCH /api/v1/property/<:propertyId>`: Updates a property advert
9. `PATCH /api/v1/property/<:propertyId>/sold`: Updates a property advert's status to sold
10. `SELETE /api/v1/property/<:propertyId>`: Deletes a property advert
11. `GET /api/v1/property/<:propertyId>`: Fetchs a specific property advert

## Body Payload Specification
Signup expects

```js
{
    firstname: string,
    lastname: string,
    email: string,
    password: string
}
```

Signin expects

```js
{
    email: string,
    password: string
}
```
## Tools
* NodeJS/Express: Server
* MySQL: Data Storage
* JWT: Token based authentication
* bcryptjs: Password security
* Joi: Validations
* Cloudinary: Image storage

## Available scripts
* `start`: Starts the server with node
* `dev`: Starts the server in watch mode
* `db:up`: Creates the database
* `db:down`: Drops the database

## Getting started

You can either fork this repository or clone it by starting your terminal, then change the directory to where you would like to save it and run

```sh
git clone https://github.com/desirekaleba/node-mysql-jwt-auth.git
```
Change to the newly downloaded directory with

```sh
cd node-mysql-jwt-auth
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
npm install
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run dev
```

## Folder structure
```sh
.
├── README.md
├── package-lock.json
├── package.json
├── server.js
└── src
    ├── config
    │   ├── db.config.init.js
    │   └── db.config.js
    ├── controllers
    │   └── property.controller.js
    │   └── user.controller.js
    ├── database
    │   ├── queries.js
    │   └── scripts
    │       ├── dbDown.js
    │       ├── dbUp.js
    │       └── propertyTablesUp.js
    │       └── usserTablesUp.js
    ├── middlewares
    │   ├── isPropertyOwner.js
    │   └── validateToken.js
    ├── models
    │   └── property.model.js
    │   └── user.model.js
    ├── routes
    │   └── property.routes.js
    │   └── user.routes.js
    ├── utils
    │   ├── cloudinary.js
    │   ├── multer.js
    │   ├── password.js
    │   ├── secrets.js
    │   └── token.js
    ├── validators
    │   ├── user.validator.js
    │   ├── property.validator.js
    │   └── report.validator.js
```