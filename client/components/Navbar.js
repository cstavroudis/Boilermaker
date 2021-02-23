import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>BOILERMAKER</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = (state) => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(Navbar);

// Prop types
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
