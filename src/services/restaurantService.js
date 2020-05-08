import http from "./httpService";

const endPointUrl = "http://localhost:4000/api/restaurants";

export function getRestaurants() {
  return http.get(endPointUrl);
}

export function registerRestaurant(body) {
  return http.post(endPointUrl, body);
}

export function getRestaurant(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function detailsFilledRes(id) {
  return http.get(`${endPointUrl}/${id}/details-filled`);
}

export function addDetails(id, body) {
  return http.post(`${endPointUrl}/${id}/add-details`, body);
}

export function verifyRestaurant(id) {
  return http.get(`${endPointUrl}/${id}/verify`);
}

export function getHiddenPostsRes(id) {
  return http.get(`${endPointUrl}/${id}/hidden-posts`);
}

export function getHiddenCommentsRes(id) {
  return http.get(`${endPointUrl}/${id}/hidden-comments`);
}

export function getBranchCity(id) {
  return http.get(`${endPointUrl}/${id}/get-branch-city`);
}

export function getServes(id) {
  return http.get(`${endPointUrl}/${id}/get-serves`);
}

export function getAllResPosts(id) {
  return http.get(`${endPointUrl}/${id}/posts`);
}
