import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../redux/store";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formName = event.target.name;
    const email = event.target.email.value;
    const password = event.target.password.value;
    this.props.auth(email, password, formName);
  }

  render() {
    const { name, displayName, error } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    );
  }
}

const mapLogin = (state) => ({
  name: "login",
  displayName: "Login",
  error: state.user.error,
});

const mapSignup = (state) => ({
  name: "signup",
  displayName: "Sign Up",
  error: state.user.error,
});

const mapDispatch = (dispatch) => ({
  auth: (email, password, formName) =>
    dispatch(auth(email, password, formName)),
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

// Prop types
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  auth: PropTypes.func.isRequired,
  error: PropTypes.object,
};
