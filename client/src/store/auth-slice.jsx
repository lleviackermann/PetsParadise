import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLoggedIn: null,
    userInfo: null,
    userToken: null,
    expirationTime: null,
    otpSent: "no",
    cart: [],
  },
  reducers: {
    login(state, action) {
      state.userLoggedIn = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("lastLoggedIn", new Date(Date.now()).getTime());
      state.cart = action.payload.cart;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.userInfo = null;
      state.userToken = null;
      state.cart = [];
      localStorage.removeItem("token");
      localStorage.removeItem("lastLoggedIn");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
    otpSent(state, action) {
      state.otpSent = "yes";
    },
    otpVerified(state, action) {
      state.otpSent = "verified";
    },
    passwordChanged(state, action) {
      state.otpSent = "no";
    },
    otpVerificationFailure(state, action) {
      state.otpSent = "failure";
    },
    checkAuth(state, action) {
      if (
        +(
          new Date(Date.now()).getTime() - localStorage.getItem("lastLoggedIn")
        ) > 24184287
      ) {
        state.userLoggedIn = false;
        state.userInfo = null;
        localStorage.removeItem("token");
        localStorage.removeItem("lastLoggedIn");
      } else {
        state.userLoggedIn = true;
        state.userInfo = action.payload.user;
      }
    },
    updateCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
