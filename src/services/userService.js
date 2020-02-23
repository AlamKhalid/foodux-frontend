import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/users";

export function register(user) {
  return http.post(endPointUrl, user);
}
