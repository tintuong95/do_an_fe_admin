import { createSlice } from "@reduxjs/toolkit";
import history from "../../utils/history.js";
import { actionAdminLogin, actionAdminProfile } from "./action.js";

const initialState = {
  admin: {},
};

export const sliceAdmin = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    //admin profile success
    builder.addCase(
      actionAdminProfile.fulfilled,
      (state, { meta, payload, type }) => {
        console.log(payload);
      }
    );
    //admin profile failure
    builder.addCase(
      actionAdminProfile.rejected,
      (state, { meta, payload, type, error }) => {
        history.push("/login");
      }
    );
    //admin login success
    builder.addCase(
      actionAdminLogin.fulfilled,
      (state, { meta, payload, type }) => {
        history.push("/home")
      }
    );
    //admin login failure
    builder.addCase(
      actionAdminLogin.rejected,
      (state, { meta, payload, type, error }) => {
        console.log(error);
      }
    );
  },
});


export const {} =sliceAdmin.actions
