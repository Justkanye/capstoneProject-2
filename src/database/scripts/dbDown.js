const { dropDB: dropDBQuery } = require('../queries');

(() => {
    require('../../config/db.config.init').query(dropDBQuery, (err, _) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('Database dropped!');
        process.exit(0);
    });
})();