import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./nav";
import { Link } from "react-router-dom";
const user = "user";
let err;

const Homepage = () => {
  //set state
  const [userDetails, setUserDetails] = useState([]);
  //fetch messages from server
  const getDetails = async () => {
    try {
      const getter = await fetch(`http://localhost:7474/home/`);

      const details = await getter.json();

      err = details.err;

      setUserDetails(details.msg);

      // console.log(details);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Fragment>
      <NavBar info={userDetails} />
      <div id="homepage">
        <div className="container hm_box">
          <div className="container">
            <span className="greetingHd">
              Hello <span>{userDetails.name}</span>
            </span>
          </div>
          <br />
          <div className="">
            You have{" "}
            <span>
              {userDetails.falsy} unread messages out of {userDetails.count}{" "}
              total
            </span>
          </div>
          <br />
          <div>
            <Link to="/inbox" state={{ userDetails }}>
              <button className="btn btn-primary">View Messages</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Homepage;
