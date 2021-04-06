import axios from "../interceptor";
export const search = (text) => axios("search", { params: { text } });
