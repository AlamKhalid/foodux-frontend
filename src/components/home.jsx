import React, { useState } from "react";
import _ from "lodash";
import LeftSidebar from "./leftSidebar";
import Newsfeed from "./newsfeed";
import Navbar from "./navbar";
import RightSidebar from "./rightSidebar";
import Spinner from "./common/spinner";

const Home = ({ user }) => {
  const [active] = useState(0);

  return (
    <React.Fragment>
      {_.isEmpty(user) ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Navbar user={user} />
          <div className="container-fluid container-lg my-3">
            <div className="row">
              <div className="d-none d-lg-block col-lg-3">
                <LeftSidebar active={active} />
              </div>
              <div className="col-12 col-md-8 col-lg-6">
                <Newsfeed user={user} />
              </div>
              <div className="d-none d-md-block col-md-4 col-lg-3">
                <RightSidebar />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
