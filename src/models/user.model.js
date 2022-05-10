const db = require('../config/db.config');

//Constructor
class User{
	constructor(id, email, first_name, last_name, password, phone_number, address, is_admin){
		this.id = id;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
		this.phone = phone_number;
		this.address = address;
		this.is_admin = is_admin;
	}

//create
  static createUser(newUser, result) {
    db.query(`INSERT INTO [table] VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address, newUser.is_admin], (err, res) => {
      if(err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      console.log('Created user: ', { ...newUser })
      result(null, { id: res.insertId, ...newUser })
    })
  }

//get all

//find by id

}
module.exports = User;