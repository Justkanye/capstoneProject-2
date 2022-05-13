const { createUserTableQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createUserTableQuery, (err, res) => {
        if (err) {
            console.log('An error occured while trying to create users table: ',  err.sqlMessage || err.message || err);
            return;
        }
        if (!res.warningCount) console.log('Users table successfully created.');
    });
})();