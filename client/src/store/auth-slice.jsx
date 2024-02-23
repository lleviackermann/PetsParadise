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
    userRole: null,
  },
  reducers: {
    login(state, action) {
      state.userLoggedIn = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.cart = action.payload.cart;
      state.userRole = action.payload.user.role;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.userInfo = null;
      state.userToken = null;
      state.userRole = null;
      state.cart = [];
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
        // localStorage.removeItem("token");
        // localStorage.removeItem("lastLoggedIn");
      } else {
        state.userLoggedIn = true;
        state.userInfo = action.payload.user;
      }
    },
    updateCart(state, action) {
      state.cart = action.payload;
    },
    updateRole(state, action) {
      state.userRole = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
