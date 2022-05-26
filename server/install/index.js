const { Client } = require("pg");
const fs = require("fs");
const dbname = "mailbox_db_tested";
const tbname = "mailbox";
const usrTbname = "user_login";
const config = {
  user: "postgres",
  host: "localhost",
  password: "root",
  port: 5432,
};
async function createDb() {
  const client = new Client(config);
  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${dbname}`);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  } finally {
    await client.end();
  }
}

const mailQuery = `CREATE TABLE ${tbname}(mail_id SERIAL PRIMARY KEY,user_id VARCHAR(255), sender VARCHAR(255),date VARCHAR(20) DEFAULT CURRENT_TIMESTAMP,subject VARCHAR(150),content TEXT, isRead BOOLEAN DEFAULT FALSE);`;

const userQuery = `CREATE TABLE ${usrTbname}(id SERIAL PRIMARY KEY, user_id VARCHAR(25), password VARCHAR(25),name VARCHAR(55));`;

createDb().then((result) => {
  if (result) {
    console.log(`Database -${dbname}- created successfully.`);

    config.database = dbname;
    createTb(mailQuery).then((result) => {
      if (result) {
        console.log(`Table - ${tbname}- created successfully.`);
        createTb(userQuery).then((result) => {
          if (result) {
            console.log(`Table - ${usrTbname}- created successfully.`);

            createConfig();
          }
        });
      }
    });
  }
});

async function createTb(query) {
  const client = new Client(config);
  try {
    await client.connect();
    await client.query(query);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  } finally {
    await client.end();
  }
}

async function createUserTb(query) {
  const client = new Client(config);
  try {
    await client.connect();
    await client.query(query);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  } finally {
    await client.end();
  }
}

function createConfig() {
  fs.writeFile("../config/config.json", JSON.stringify(config), function (err) {
    if (err) throw err;
    console.log("Config file saved.");
  });
}
