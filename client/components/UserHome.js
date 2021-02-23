import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const UserHome = (props) => {
  const email = props.email;

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

const mapState = (state) => ({
  email: state.user.email,
});

export default connect(mapState)(UserHome);

// PROP TYPES
UserHome.propTypes = {
  email: PropTypes.string,
};
