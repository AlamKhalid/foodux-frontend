import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/users";

export function register(user) {
  return http.post(endPointUrl, user);
}

export function getHiddenPosts(id) {
  return http.get(`${endPointUrl}/${id}/hidden-posts`);
}

export function getHiddenComments(id) {
  return http.get(`${endPointUrl}/${id}/hidden-comments`);
}

export function hidePost(body) {
  return http.post(`${endPointUrl}/hidden-post/add`, body);
}

export function unhidePost(body) {
  return http.post(`${endPointUrl}/hidden-post/remove`, body);
}

export function hideComment(body) {
  return http.post(`${endPointUrl}/hidden-comment/add`, body);
}

export function getAllUserPosts(id) {
  return http.get(`${endPointUrl}/${id}/posts`);
}

export function unhideComment(body) {
  return http.post(`${endPointUrl}/hidden-comment/remove`, body);
}
export function getUser(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function getFollowers(id) {
  return http.get(`${endPointUrl}/${id}/followers`);
}

export function getFollowing(id) {
  return http.get(`${endPointUrl}/${id}/following`);
}

export function startFollowing(id, body) {
  return http.post(`${endPointUrl}/${id}/add-following`, body);
}
