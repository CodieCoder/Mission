import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Moment from "moment";
import "../App.css";

const Message = () => {
  const navigate = useNavigate();
  const [messageDetails, setmessageDetails] = useState({ count: "", msg: "" });
  let data = useLocation();
  // console.log(data);
  data = data.state;
  const getMsg = async () => {
    try {
      const getter = await fetch(`http://localhost:7474/read/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const message = await getter.json();
      // console.log(message.msg.data);
      setmessageDetails({
        count: message.msg.count,
        msg: message.msg.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getMsg();
  }, []);
  // console.log(messageDetails);

  const dateFormat = () => {
    return Moment(messageDetails.msg.date).format("dddd, MMMM Do YYYY");
  };

  if (messageDetails.count === 0) {
    return (
      <div className="alert alert-danger noMessage">
        <h6>
          <i className="bi bi-exclamation-triangle"></i> This message does not
          exist. <hr />
          Please go back and try again.
        </h6>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="mail-top-header">
        <span
          title="Go back to Inbox"
          className="text-light mail-top-header-btn"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left"></i> Inbox
        </span>
      </div>
      <div className="container mail-div">
        <div className="container mail-head">
          <div className="mail-headers">
            <span className="mail-title">From : </span>
            <span className="mail-details">{messageDetails.msg.sender}</span>
          </div>
          <div className="mail-headers">
            <span className="mail-title">Subject : </span>
            <span className="mail-details">{messageDetails.msg.subject}</span>
          </div>
          <div className="mail-headers">
            <span className="mail-title">Date : </span>
            <span className="mail-details">{`${dateFormat()}`}</span>
          </div>
        </div>
        <div className="container mail-message">
          {messageDetails.msg.content}
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
