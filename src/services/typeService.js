import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/types";

export function getTypes() {
  return http.get(endPointUrl);
}
