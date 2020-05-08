import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/auth";

export function login(obj) {
  return http.post(endPointUrl, obj);
}
