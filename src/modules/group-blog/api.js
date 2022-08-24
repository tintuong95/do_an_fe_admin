import fetchAxios from "../../configs/axios.js";

async function fetchGroupBlogGets() {
  return await fetchAxios({
    method: "get",
    url: "/groupblog",
  });
}

export { fetchGroupBlogGets };
