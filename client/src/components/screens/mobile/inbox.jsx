import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../nav";
import EachMessage from "./eachMessage";
import { Link } from "react-router-dom";
let err;

const InboxMobile = ({ user }) => {
  // console.log(`Passed:`, user);
  const [allMsgs, setMgs] = useState([]);
  const [unread, setunread] = useState([user.falsy]);

  //fetch messages from server
  const getAllMsg = async () => {
    try {
      const getter = await fetch(`http://localhost:7474/all/${user.name}`);

      const msgList = await getter.json();

      err = msgList.err;

      setMgs(msgList.msg.data);

      // console.log(msgList);
    } catch (error) {
      console.error(error.message);
    }
  };

  //fetch number of unread messages from server
  const getUnread = async () => {
    try {
      const getter = await fetch(`http://localhost:7474/unread`);

      const count = await getter.json();

      setunread(count);

      // console.log(count);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getUnread();
  }, []);
  useEffect(() => {
    getAllMsg();
  }, []);

  if (err === 0) {
    return (
      <div className="alert alert-danger noMessage">
        <h6>
          <i className="bi bi-exclamation-triangle"></i> No messages.
        </h6>
      </div>
    );
  }

  return (
    <Fragment>
      <NavBar info={{ name: user.name, count: user.count, falsy: unread }} />
      <div className="container">
        <br />
        <h5>Messages</h5>
        <br />
        {allMsgs.map((msg) => (
          <div
            className="container mobile-msg-div"
            title={msg.subject}
            key={msg.id}
          >
            <Link
              to="/mail"
              state={{ id: msg.id, user: user.name }}
              className="links"
            >
              <EachMessage data={msg} />
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default InboxMobile;
