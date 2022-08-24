import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchBlogsGets, fetchBlogsPost, fetchBlogsRemove, fetchBlogsUpdate} from "./api"

const actionBlogsGets = createAsyncThunk(
    'blog/gets',
    async (payload, thunkAPI) => {
        return await fetchBlogsGets();
    }
)

const actionBlogsPost = createAsyncThunk(
  "blog/post",
  async (payload, thunkAPI) => {
    return await fetchBlogsPost(payload);
  }
);



const actionBlogsUpdate = createAsyncThunk(
  "blog/put",
  async (payload, thunkAPI) => {
    return await fetchBlogsUpdate(payload);
  }
);


const actionBlogsRemove = createAsyncThunk(
  "blog/remove",
  async (payload, thunkAPI) => {
    const response = await fetchBlogsRemove(payload);

    thunkAPI.dispatch(actionBlogsGets());
    return await response;
  }
);
export {actionBlogsRemove, actionBlogsGets, actionBlogsPost, actionBlogsUpdate };