const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

// Allow other apps to use API
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.get('/', (req, res) => {
	res.json({message: "Welcome to Group 14's SideHustle NodeJs capsone project 2 REST API"})
});

// user routes
require('./src/routes/user.routes')(app);

// property routes
require('./src/routes/property.routes')(app);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});