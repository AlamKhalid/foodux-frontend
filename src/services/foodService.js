import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/foods";

export function getFoods() {
  return http.get(endPointUrl);
}
