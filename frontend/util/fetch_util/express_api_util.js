export const fetchApiData = (type, payload = {}) => {
  return fetch(
    `/api/${type}`,
    payload
  ).then(response => {
    return response.json().then(data => {
      return data;
    })
  });
}
