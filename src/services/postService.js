import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function submitPost(post) {
  return http.post(endPointUrl, post);
}