import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/auth";

export function login(user) {
  return http.post(endPointUrl, user);
}
