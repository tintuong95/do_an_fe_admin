import fetchAxios from "../../configs/axios";

async function fetchBlogsGets() {
  return await fetchAxios({
    method: "get",
    url: "/blog",
  });
}

async function fetchBlogsPost(payload) {
  return await fetchAxios({
    method: "post",
    url: "/blog",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  });
}

async function fetchBlogsUpdate(payload) {
  return await fetchAxios({
    method: "put",
    url: "/blog/"+payload.id,
    data: payload.data,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  });
}


async function fetchBlogsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/blog/" + payload.id,
  
  });
}

export { fetchBlogsGets, fetchBlogsPost, fetchBlogsUpdate, fetchBlogsRemove };
