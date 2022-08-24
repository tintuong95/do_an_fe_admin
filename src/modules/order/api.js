import fetchAxios from "../../configs/axios.js";

async function fetchOrderGets() {
  return await fetchAxios({
    method: "GET",
    url: "/order",
  });
}

async function fetchOrderTotalTurnOver() {
  return await fetchAxios({
    method: "GET",
    url: "/order/total",
  });
}

async function fetchOrderTurnOverMonth(payload) {
  return await fetchAxios({
    method: "GET",
    url: "/order/total-month"
  });
}

async function fetchOrderTotalCouter() {
  return await fetchAxios({
    method: "GET",
    url: "/order/total-counter",
  });
}

async function fetchOrderCounterMonth(payload) {
  return await fetchAxios({
    method: "GET",
    url:
      "/order/total-counter-month",
  });
}

async function fetchOrderRemove(payload) {
  return await fetchAxios({
    method: "DELETE",
    url: "/order/" + payload.id,
  });
}
async function fetchOrderTotalData() {
  return await fetchAxios({
    method: "get",
    url: "/order/total-turn-over-data",
  });
}
async function fetchOrderCounterData() {
  return await fetchAxios({
    method: "get",
    url: "/order/total-counter-data",
  });
}
export {
  fetchOrderGets,
  fetchOrderRemove,
  fetchOrderTotalTurnOver,
  fetchOrderTurnOverMonth,
  fetchOrderCounterMonth,
  fetchOrderTotalCouter,
  fetchOrderTotalData,
  fetchOrderCounterData,
};
