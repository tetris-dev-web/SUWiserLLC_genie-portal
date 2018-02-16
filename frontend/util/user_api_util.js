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
    url: "/api/users/update_password",
    // url: `/api/users/${user.id}/edit`,

    data: {user}
  })
);
