const db = require("../config/db.config");
require("../database/scripts/userTableUp");
const {
  createNewUser,
  getByIdentifier,
  updateUserQuery,
} = require("../database/queries");

//Constructor
class User {
  constructor(
    email,
    first_name,
    last_name,
    password,
    phone_number,
    address,
    is_admin
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.phone = phone_number;
    this.address = address;
    this.is_admin = is_admin;
  }

  // create
  static create(newUser, result) {
    db.query(
      createNewUser,
      [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.phone,
        newUser.address,
        newUser.is_admin || false,
      ],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        console.log("New user created successfully!");
        this.findById(res.insertId, result);
      }
    );
  }

  // get all
  static getAll(result) {
    db.query(getByIdentifier("users"), (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }
      res.forEach((result) => delete result.password);
      console.log(`Found ${res.length} users`);
      result(null, { status: "success", data: res });
      return;
    });
  }

  // find by email
  static findByEmail(email, result) {
    db.query(getByIdentifier("users", "email"), [email], (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }
      if (res.length) {
        console.log("Found user");
        result(null, { status: "success", data: res[0] });
        return;
      }

      // not found
      result({ kind: "Not found" }, null);
    });
  }

  // find by phone_number
  static findByPhoneNumber(phone_number, result) {
    db.query(
      getByIdentifier("users", "phone_number"),
      [phone_number],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        if (res.length) {
          console.log("Found user");
          result(null, res[0]);
          return;
        }

        // not found
        result({ kind: "Not found" }, null);
      }
    );
  }

  // Password reset for user identified by email
  static updatePasswordByEmail(email, password, result) {
    db.query(
      `UPDATE users SET password = ? WHERE email = ?`,
      [password, email],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        if (res.length) {
          const user = res[0];
          delete user.password;
          console.log("Found user");
          result(null, { status: "success", data: user });
          return;
        }

        // not found
        result({ kind: "Not found" }, null);
      }
    );
  }

  // Password reset for user identified by phone_number
  static updatePasswordByPhoneNumber(phone_number, password, result) {
    db.query(
      `UPDATE users SET password = ? WHERE phone_number = ?`,
      [password, phone_number],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        if (res.length) {
          const user = res[0];
          delete user.password;
          console.log("Found user");
          result(null, { status: "success", data: user });
          return;
        }

        // not found
        result({ kind: "Not found" }, null);
        return;
      }
    );
  }

  // find by id
  static findById(id, result) {
    db.query(getByIdentifier("users", "id"), [id], (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }
      if (res[0]) {
        const user = res[0];
        delete user.password;
        console.log("Found user");
        result(null, { status: "success", data: user });
        return;
      }
      // not found
      result({ kind: "Not found" }, null);
      return;
    });
  }

  // update user by id
  static updateUserById(id, newUser, result) {
    db.query(
      updateUserQuery,
      [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.phone,
        newUser.address,
        id,
      ],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }

        this.findById(id, result);
      }
    );
  }
}

module.exports = User;
