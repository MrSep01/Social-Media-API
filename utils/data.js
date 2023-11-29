// utils/data.js

const casual = require('casual');

const getRandomUsername = () => casual.username;
const getRandomEmail = () => casual.email;

module.exports = {
  getRandomUsername,
  getRandomEmail,
};
