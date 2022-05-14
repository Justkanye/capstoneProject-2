const { createPropertyTableQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createPropertyTableQuery, (err, res) => {
        if (err) {
			console.log('An error occured while trying to create properties table: ', err.sqlMessage || err.message || err);
			return;
		}
		if (!res.warningCount) console.log('Properties table successfully created.');
	    });
})();