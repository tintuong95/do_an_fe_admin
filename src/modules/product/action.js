import { createAsyncThunk } from "@reduxjs/toolkit";
import {  fetchProductCreate, fetchProductGet, fetchProductGets, fetchProductRemove, fetchProductUpdate } from "./api.js";



const actionProductGets =createAsyncThunk(
    "product/gets",
    async (payload,thunkAPI)=>{
        return await fetchProductGets()
    }
)


const actionProductGet = createAsyncThunk(
  "product/get",
  async (payload, thunkAPI) => {
    return await fetchProductGet(payload.id);
  }
);

const actionProductCreate= createAsyncThunk(
  "product/create",
  async (payload, thunkAPI) => {
    return await fetchProductCreate(payload);
  }
);

const actionProductUpdate = createAsyncThunk(
  "product/update",
  async (payload, thunkAPI) => {
    return await fetchProductUpdate(payload);
  }
);

const actionProductRemove = createAsyncThunk(
  "product/remove",
  async (payload, thunkAPI) => {
    const response=await fetchProductRemove(payload.id);
    thunkAPI.dispatch(actionProductGets());
    return response;
  }
);

export {
  actionProductGet,
  actionProductGets,
  actionProductCreate,
  actionProductRemove,
  actionProductUpdate,
};