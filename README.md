# ApexHauz NodeJS REST API with Express, Mysql, and JWT Authentication

## Features

1. User can sign up
2. User can sign in
3. User can reset password
4. User can update his profile
5. User can create Property advert // admin account required
6. User can view all Property adverts
7. User can view all Property adverts created by a specific user
8. User can view all Property adverts of a specific type
9. User can view a single Property advert
10. User can update his Property advert // admin account required
11. User can mark his Property advert as sold // admin account required
12. User can delete his Property advert // admin account required
13. User can report a Property advert
14. User can view all reports // admin account required
15. User can view a specific report // admin account required
16. User can view all reports on a specific property advert // admin account required
17. Amins can delete a report

## API endpoints

1. `POST /api/v1/auth/signup`: Creates a new user
2. `POST /api/v1/auth/signin`: Logs in a user
3. `PATCH /api/v1/auth/reset-password`: Resets a user's password
4. `PATCH /api/v1/auth/update`: Updates a user's profile
5. `GET /api/v1/property`: Fetchs all property adverts
6. `GET /api/v1/property/search?type=propertyType`: Fetchs all property adverts of a specific type
7. `GET /api/v1/property/owner/<:userId>`: Fetchs all property adverts created by a specific user
8. `POST /api/v1/property`: Creates a new property advert
9. `PATCH /api/v1/property/<:propertyId>`: Updates a property advert
10. `PATCH /api/v1/property/<:propertyId>/sold`: Updates a property advert's status to sold
11. `SELETE /api/v1/property/<:propertyId>`: Deletes a property advert
12. `GET /api/v1/property/<:propertyId>`: Fetchs a specific property advert
13. `POST /api/v1/reports/create/<:propertyId>`: Creates a new report for a specific property advert
14. `GET /api/v1/reports/`: Fetchs all reports
15. `GET /api/v1/reports/<:reportId>`: Fetchs a specific report
16. `POST /api/v1/reports/property/<:propertyId>`: Fetchs all reports for a specific property advert
17. `POST /api/v1/reports/delete/<:propertyId>`: Deletes a specific report

## Body Payload Specification

Signup expects

```js
{
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    is_admin: Boolean, // optional, defaults to false
}
```

Signin expects

```js
{
    email or phone_number: String,
    password: String
}
```

Reset password expects

```js
{
    email or phone_number: String,
    current_password: String
    new_password: String
}
```

Update Profile expects

```js
{
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
}
```

Create property expects

```js
{
    price: Float,
    state: String,
    city: String,
    address: String,
    type: String,
    image: File, // Accepts multiple. Supported extensions: .png, .jpg, .jpeg
}
```

Update property expects

```js
{
    price: Float,
    state: String,
    city: String,
    address: String,
    type: String,
}
```

Create report expects

```js
{
    reason: String,
    description: String,
}
```

## Tools

- NodeJS/Express: Server
- MySQL: Data Storage
- JWT: Token based authentication
- bcryptjs: Password security
- Joi: Validations
- Cloudinary: Image storage

## Available scripts

- `start`: Starts the server with node
- `dev`: Starts the server in watch mode
- `db:up`: Creates the database
- `db:down`: Drops the database

## Getting started

You can either fork this repository or clone it by starting your terminal, then change the directory to where you would like to save it and run

```sh
git clone https://github.com/justkanye/capstoneProject-2.git
```

Change to the newly downloaded directory with

```sh
cd capstoneProject-2
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones. Optional variables: DB_PORT and SERVER_PORT.

Install the required dependencies with

```sh
npm install
```

Create Database with

```sh
npm run db:up
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
    │   ├── property.controller.js
    │   ├── report.controller.js
    │   └── user.controller.js
    ├── database
    │   ├── queries.js
    │   └── scripts
    │       ├── dbDown.js
    │       ├── dbUp.js
    │       ├── propertyTableUp.js
    │       ├── reportTableUp.js
    │       └── userTableUp.js
    ├── middlewares
    │   ├── asyncHandler.js
    │   ├── isPropertyOwner.js
    │   ├── validateToken.js
    │   └── validatorHandler.js
    ├── models
    │   ├── property.model.js
    │   ├── report.model.js
    │   └── user.model.js
    ├── routes
    │   ├── property.routes.js
    │   ├── report.routes.js
    │   └── user.routes.js
    ├── utils
    │   ├── cloudinary.js
    │   ├── multer.js
    │   ├── password.js
    │   ├── secrets.js
    │   └── token.js
    ├── validators
    │   ├── property.validator.js
    │   ├── report.validator.js
    │   └── user.validator.js
```
