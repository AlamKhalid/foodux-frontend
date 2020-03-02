import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/categories";

export function getCategories() {
  return http.get(endPointUrl);
}
