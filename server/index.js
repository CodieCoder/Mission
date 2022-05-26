const express = require("express");
const cors = require("cors");
const pool = require("./scripts/query");
const { md5 } = require("pg/lib/utils");

const app = express();
const port = 7474;
const defaultUser = "Jimmy";

app.use(cors());
app.use(express.json());

//functions thst I should move to class
function Summary(queryArray) {
  let newObj = [];
  queryArray.map((data) => {
    newObj.push({
      id: data.mail_id,
      sender: data.sender,
      date: data.date,
      subject: data.subject,
      message: data.content.substr(0, 50),
      read: data.isread,
    });
  });
  return newObj;
}

//Routes

//get number all unread messages and User name
app.get("/home", async (req, res) => {
  let result = { msg: "No result was found!", err: 0 };
  let user = defaultUser;
  try {
    user = md5(user);

    const getter = await pool.query(
      "SELECT isRead FROM mailbox WHERE user_id = $1",
      [user]
    );
    let getFalse = getter.rows;
    let UnreadCount = 0;
    for (let i = 0; i < getFalse.length; i++) {
      if (getFalse[i].isread == false) {
        UnreadCount++;
      }
    }

    result.err = 1;
    const data = {
      count: getter.rowCount,
      name: defaultUser,
      falsy: UnreadCount,
    };
    result.msg = data;
  } catch (err) {
    result.msg = err.message;
  }

  res.json(result);
});

//Get number of unread messages
app.get("/unread", async (req, res) => {
  let result = 0;
  user = md5(defaultUser);
  try {
    const getter = await pool.query(
      "SELECT COUNT(isRead)FROM mailbox WHERE user_id = $1 AND isRead = false",
      [user]
    );
    result = getter.rows[0].count;
    // console.log(getter.rows.count);
  } catch (err) {
    result;
  }
  res.json(result);
});

//Get all the messages
app.get("/all/:user", async (req, res) => {
  let result = { msg: "No result was found!", err: 0 };
  let user = md5(req.params.user);
  try {
    const getter = await pool.query(
      "SELECT * FROM mailbox WHERE user_id = $1 ORDER BY date DESC",
      [user]
    );
    result.err = 1;

    let msg = { count: getter.rowCount, data: Summary(getter.rows) };
    result.msg = msg;
  } catch (err) {
    result.err = 0;
    result.msg = err.message;
  }

  res.json(result);
});

//Get a message using the PUT protocol
app.put("/read/", async (req, res) => {
  let result = { msg: "No result was found!", err: 0 };
  let user = md5(defaultUser);
  let { id } = req.body;
  try {
    const getter = await pool.query(
      "UPDATE mailbox SET isread = $1 WHERE user_id = $2 AND mail_id = $3 RETURNING *",
      ["TRUE", user, id]
    );
    result.err = 1;
    let msg = { count: getter.rowCount, data: getter.rows[0] };
    result.msg = msg;
    result.test = getter;
  } catch (err) {
    result.err = 0;
    result.msg = err.message;
  }

  res.json(result);
  // res.json(result.test);
});

//POST
app.post("/mail/", async (req, res) => {
  const user = md5(defaultUser);
  const { sender } = req.body;
  const { subject } = req.body;
  const { content } = req.body;

  const addMail = await pool.query(
    "INSERT INTO mailbox (user_id, sender, subject, content, isRead) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [user, sender, subject, content, "FALSE"]
  );
  res.json(addMail.rows);
});

app.listen(port, () => {
  console.log(`Server has started on port '${port}'`);
});
