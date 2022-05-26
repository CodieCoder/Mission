import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../nav";
import DesktopEachMessage from "./DesktopEachMessage";
let err;

const InboxDesktop = ({ user }) => {
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
        <table className="table table-sm mt-5  table-hover desktop-mail-table">
          <thead>
            <tr>
              <th scope="col">Sender</th>
              <th scope="col">Subject</th>
              <th scope="col"></th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {allMsgs.map((msg) => (
              <DesktopEachMessage key={msg.id} data={msg} />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default InboxDesktop;
