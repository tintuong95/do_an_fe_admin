import { createAsyncThunk } from "@reduxjs/toolkit";
import {  fetchProductCreate, fetchProductGet, fetchProductGets, fetchProductRemove, fetchProductUpdate, fetchUserGets, fetchUserRemove } from "./api.js";



const actionUserGets =createAsyncThunk(
    "user/gets",
    async (payload,thunkAPI)=>{
        return await fetchUserGets()
    }
)


// const actionProductGet = createAsyncThunk(
//   "product/get",
//   async (payload, thunkAPI) => {
//     return await fetchProductGet(payload.id);
//   }
// );

// const actionProductCreate= createAsyncThunk(
//   "product/create",
//   async (payload, thunkAPI) => {
//     return await fetchProductCreate(payload);
//   }
// );

// const actionProductUpdate = createAsyncThunk(
//   "product/update",
//   async (payload, thunkAPI) => {
//     return await fetchProductUpdate(payload);
//   }
// );

const actionUserRemove = createAsyncThunk(
  "user/remove",
  async (payload, thunkAPI) => {
    const response=await fetchUserRemove(payload.id);
    thunkAPI.dispatch(actionUserGets());
    return response;
  }
);

export { actionUserGets, actionUserRemove };
