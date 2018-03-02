export const fetchUser = id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
);

export const updateUser = (user) => (
  $.ajax({
    method: 'PATCH',
    // url: "/users/edit",
    url: "/api/users/update_info",
    data: {user}
  })
);
