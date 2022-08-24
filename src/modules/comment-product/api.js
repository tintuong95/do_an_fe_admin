import fetchAxios from "../../configs/axios";

async function fetchCommentProductsGets(payload) {
  return await fetchAxios({
    method: "get",
    url: "/commentproduct?idProduct=" + payload.idProduct,
  });
}



async function fetchCommentProductsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/commentproduct/" + payload.id,
  });
}

export { fetchCommentProductsRemove, fetchCommentProductsGets };
