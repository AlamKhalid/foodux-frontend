import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/users";

export function register(user) {
  return http.post(endPointUrl, user);
}

export function getHiddenPosts(id) {
  return http.get(`${endPointUrl}/${id}/hiddenposts`);
}

export function getHiddenComments(id) {
  return http.get(`${endPointUrl}/${id}/hiddencomments`);
}

export function hidePost(body) {
  return http.post(`${endPointUrl}/hiddenpost/add`, body);
}

export function unhidePost(body) {
  return http.post(`${endPointUrl}/hiddenpost/remove`, body);
}

export function hideComment(body) {
  return http.post(`${endPointUrl}/hiddencomment/add`, body);
}

export function unhideComment(body) {
  return http.post(`${endPointUrl}/hiddencomment/remove`, body);
}
