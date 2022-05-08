const db = require('../config/db.config');

//Constructor
class Property{
	constructor(id, owner, status, price, state, city, address, type, image_url, created_on){
		this.id = id;
		this.owner = owner;
		this.status = status;
		this.price = price;
		this.state = state;
		this.city = city;
		this.address = address;
		this.type = type;
		this.image_url = image_url;
		this.created_on = created_on;
	}
}

//create

//update

//delete

//get all

//find by type

//find by id


module.exports = Property;