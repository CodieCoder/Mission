import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import randomColor from "randomcolor";
import Moment from "moment";

const DesktopEachMessage = ({ data }) => {
  const navigate = useNavigate();

  const [messageDetails, setMessageDetails] = useState([]);

  // console.log(data);
  function showIcon() {
    let result = data.sender.charAt(0);
    return result;
  }

  function dateFormat() {
    return Moment(data.date).format("M/D/Y ");
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

  const openMessage = (data) => {
    navigate("/mail", { state: { id: data.id, user: data.name } });

    // console.log(data);
  };
  //   console.log(iconColor());
  return (
    <tr
      className={messageDetails.read}
      onClick={() => {
        openMessage(data);
      }}
      title={messageDetails.subject}
    >
      <td className="mobile-msg-date">{messageDetails.sender}</td>
      <td className="mobile-msg-sender">{messageDetails.subject}</td>
      <td className="mobile-msg-subject">{messageDetails.message}</td>
      <td className="mobile-msg-message">{messageDetails.date}</td>
    </tr>
  );
};

export default DesktopEachMessage;
