// Get the client
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import db from "../models/index";

// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

//ma hoa pass
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //    Promise: bluebird,
  //   // Add the dialect explicitly
  //   dialect: "mysql",
  // });
  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (error) {
    console.log(">>>check error", error);
  }
};

const getUserList = async () => {
  //test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });

  let newRole = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true,
  });

  let users = [];
  users = await db.User.findAll();
  return users;
  // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute("select * from user");
  //   return rows;
  // } catch (error) {
  //   console.log(">>>check error: ", error);
  // }
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id = ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>>check error: ", error);
  // }
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "select * from user WHERE id = ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>>check error: ", error);
  // }
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    { where: { id: id } }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "update user set email = ?, username = ? where id = ?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>>check error: ", error);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
