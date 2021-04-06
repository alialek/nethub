import axios from "../interceptor";

export const category = (id, amount = 1000) =>
  axios("category", {
    params: {
      id,
      amount,
    },
  });
