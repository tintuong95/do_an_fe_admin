import {createSlice} from "@reduxjs/toolkit"
import { openNotification } from "../../utils/notification.js";
import {actionBlogsChangeStatus, actionBlogsGets, actionBlogsPost, actionBlogsRemove, actionBlogsUpdate} from "./action"

const initialState = {
    blogs : [],
    blog : {}
}

export const spliceBlogs = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
      // Gets Blogs success
      builder.addCase(
        actionBlogsGets.fulfilled,
        (state, { meta, payload, type }) => {
          state.blogs = payload.data;
        }
      );

      // Gets Blogs fail
      builder.addCase(
        actionBlogsGets.rejected,
        (state, { meta, payload, type }, error) => {
          console.log(error);
        }
      );
      // Gets Blogs change status  success
      builder.addCase(
        actionBlogsChangeStatus.fulfilled,
        (state, { meta, payload, type }) => {
                    openNotification("success", "Bạn đã thay đổi thành công!");
        }
      );

      // Gets Blogs change status fail
      builder.addCase(
        actionBlogsChangeStatus.rejected,
        (state, { meta, payload, type }, error) => {
               openNotification("error", "Bạn đã thay đổi thất bại!");
        }
      );

      // Gets Blogs success
      builder.addCase(
        actionBlogsPost.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã tạo mới thành công!");
        }
      );

      // Gets Blogs fail
      builder.addCase(
        actionBlogsPost.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã tạo mới thất bại!");
        }
      );

      // Update Blogs success
      builder.addCase(
        actionBlogsUpdate.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã update thành công!");
        }
      );

      // Update Blogs fail
      builder.addCase(
        actionBlogsUpdate.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã update thất bại!");
        }
      );

      // Remove Blogs success
      builder.addCase(
        actionBlogsRemove.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã xóa thành công!");
        }
      );

      // Remove Blogs fail
      builder.addCase(
        actionBlogsRemove.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã xóa thất bại!");
        }
      );
    }
})

export const {} = spliceBlogs.actions;