const Sequelize = require('sequelize');

const seq = new Sequelize('users_schema', 'root', '1234', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
});

module.exports.getUsers = async () => {
  try {
    await seq.authenticate();
    const [result, metadata] = await seq.query('SELECT * FROM users_table');
    return result;
  } catch (e) {
    console.log(e);
  }
};
