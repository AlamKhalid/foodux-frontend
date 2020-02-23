import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/comments";

export function postComment(comment) {
  return http.post(endPointUrl, comment);
}
