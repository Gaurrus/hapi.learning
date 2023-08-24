const Sequelize = require('sequelize');

const options = {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
};

const sequelize = new Sequelize('clever_schema', 'root', '1234', options);

module.exports.getUsers = async () => {
  try {
    await sequelize.authenticate();
    const [result, metadata] = await sequelize.query(
      'SELECT * FROM clever_table'
    );
    return result
  } catch (e) {
    console.log(e.message);
  }
};
