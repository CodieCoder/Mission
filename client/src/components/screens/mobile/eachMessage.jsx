import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";
import Moment from "moment";

const EachMessage = ({ data }) => {
  const [messageDetails, setMessageDetails] = useState([]);

  function showIcon() {
    let result = data.sender.charAt(0);
    return result;
  }

  function dateFormat() {
    return Moment(data.date).fromNow();
  }

  function iconColor() {
    let result = randomColor({
      luminosity: "dark",
      seed: data.sender,
    });
    result = { background: result };
    return result;
  }

  function isRead() {
    let read = "col-10 mobile-msg-details ";
    if (data.read == true) {
      read = read + "read-true";
    } else {
      read = read + "read-false";
    }
    // console.log(data);
    return read;
  }

  function shortner(text, max) {
    return text.substring(0, max) + "...";
  }

  //all the state
  const nowData = {
    icon: showIcon(),
    color: iconColor(),
    sender: data.sender,
    date: dateFormat(),
    subject: shortner(data.subject, 40),
    message: shortner(data.message, 40),
    read: isRead(),
  };
  // console.log(nowData);
  const showAll = () => {
    setMessageDetails(nowData);
  };

  useEffect(() => {
    showAll();
  }, []);

  //   console.log(iconColor());
  return (
    <div className="row">
      <div className="col-2 mobile-msg-icon">
        <div className="mobile-msg-icon-circle" style={messageDetails.color}>
          {messageDetails.icon}
        </div>
      </div>
      <div className={messageDetails.read}>
        <div className="mobile-msg-date">{messageDetails.date}</div>
        <div className="mobile-msg-sender">{messageDetails.sender}</div>
        <div className="mobile-msg-subject">{messageDetails.subject}</div>
        <div className="mobile-msg-message">{messageDetails.message}</div>
      </div>
    </div>
  );
};

export default EachMessage;
