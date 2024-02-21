import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    views: null,
    role: null,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = action.payload.notification;
    },
    removeNotification(state, action) {
      state.notification = null;
    },
    updateViews(state, action) {
      state.views = action.payload.views;
    },
    updateRole(state,action){
      state.role = action.payload
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
