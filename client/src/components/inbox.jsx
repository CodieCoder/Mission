import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InboxDesktop from "./screens/desktop/inbox";
import InboxMobile from "./screens/mobile/inbox";

const InboxPage = () => {
  const location = useLocation();
  const data = location.state;
  return <InboxMobile user={data.userDetails} />;
};

export default InboxPage;
