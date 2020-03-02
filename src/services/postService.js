import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function getPost(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function updatePost(id, body) {
  return http.put(`${endPointUrl}/${id}`, body);
}

export function deletePost(post) {
  return http.delete(endPointUrl, { data: post });
}

export function submitPost(post) {
  return http.post(endPointUrl, post);
}
