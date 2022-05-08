const mysql = require('mysql');

const connection = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	database: ''
});


connection.connect(function(err) {
	if (err) throw err;
	console.log('Database Connected')
});

module.exports = connection;