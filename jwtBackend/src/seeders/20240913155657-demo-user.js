"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "aiyo@gmail.com",
          password: "1234",
          username: "con ga",
        },
        {
          email: "chicken@gmail.com",
          password: "1234",
          username: "chickenattack",
        },
        {
          email: "motdoiliemkhiet@gmail.com",
          password: "1234",
          username: "anhliem",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
