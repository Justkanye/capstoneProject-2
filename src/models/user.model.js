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
}

//create

//get all

//find by id


modules.exports = User;