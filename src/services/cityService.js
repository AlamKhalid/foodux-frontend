import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/cities";

export function getCities() {
  return http.get(endPointUrl);
}
