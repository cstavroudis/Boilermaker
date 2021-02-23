import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Login, Signup } from "./Auth";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("UserHome", () => {
  let login;
  let signup;

  beforeEach(() => {
    login = shallow(<Login name="login" displayName="Login" error="null" />);
    signup = shallow(
      <Signup name="signup" displayName="Sign Up" error="null" />
    );
  });

  it("Login component renders a 'Login' button", () => {
    expect(login.find("button").text()).to.be.equal("Login");
  });

  it("Signup component renders a 'Sign Up' button", () => {
    expect(signup.find("button").text()).to.be.equal("Sign Up");
  });
});
