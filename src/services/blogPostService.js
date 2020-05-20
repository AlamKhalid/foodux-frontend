import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/blog-posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function submitPost(obj) {
  return http.post(endPointUrl, obj);
}
