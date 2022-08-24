import fetchAxios from "../../configs/axios";

async function fetchCommentBlogsGets(payload) {
  return await fetchAxios({
    method: "get",
    url: "/commentblog?idBlog=" + payload.idBlog,
  });
}



async function fetchCommentBlogsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/commentblog/" + payload.id,
  });
}

export { fetchCommentBlogsRemove, fetchCommentBlogsGets };
