import axios from "axios";
import history from "../history";

// initial state
const defaultUser = {};

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// ACTION CREATORS
const getUser = (user) => ({
  type: GET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// THUNK CREATORS
export const getMe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/me");
      dispatch(getUser(data || defaultUser));
    } catch (error) {
      console.log("There was an error in the getMe thunk creator.", error);
    }
  };
};

export const auth = (email, password, method) => {
  return async (dispatch) => {
    let res;
    try {
      res = await axios.post(`/auth/${method}`, { email, password });
    } catch (authError) {
      return dispatch(getUser({ error: authError }));
    }

    try {
      dispatch(getUser(res.data));
      history.push("/home");
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post("/auth/logout");
      dispatch(removeUser());
      history.push("/home");
    } catch (error) {
      console.log("There was an error in the logout thunk creator.", error);
    }
  };
};

// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
