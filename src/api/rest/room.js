import axios from "../interceptor";
export const roomById = (id) => axios("room", { params: { id } });
