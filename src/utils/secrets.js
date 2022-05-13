require('dotenv/config');

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
    JWT_SECRET_KEY
} = process.env;

const requiredCredentials = [
    'DB_HOST',
    'DB_USER',
    'DB_PASS',
    'DB_NAME',
];

for (const credential of requiredCredentials) {
    if (!process.env[credential]) {
        console.log(`Missing required crendential: ${credential}`);
        process.exit(1);
    }
}

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
    JWT_SECRET_KEY
};
