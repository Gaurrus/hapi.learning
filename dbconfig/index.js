const Sequelize = require('sequelize');

const options = {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
};
const sequelize = new Sequelize('lesson2test', 'root', '1234', options);

module.exports.getUsers = async () => {
  try {
    await sequelize.authenticate();
    const [result, metadata] = await sequelize.query(
      'SELECT * FROM lesson2_users_table'
    );
    return result;
    // console.log('result :', result);
    // const [result, metadata] = await sequelize.query(
    //   'UPDATE lesson2_users_table SET password = 123 WHERE id = 1'
    // );
    // console.log('metadata :', metadata);
    // console.log('result :', result);
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};
