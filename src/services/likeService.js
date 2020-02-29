import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/likes";

export function like(body) {
  return http.post(`${endPointUrl}/inc`, body);
}

export function unlike(body) {
  return http.post(`${endPointUrl}/dec`, body);
}

export function getAllLikedPosts(userId) {
  return http.get(`${endPointUrl}/${userId}/posts`);
}
