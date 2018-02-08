export const signup = user => (
  $.ajax({
    method: 'POST',
    url: "/users",
    dataType: "JSON",
    data: { user }
  })
);

export const login = user => (
  $.ajax({
    method: 'POST',
    url: "users/sign_in",
    dataType: "JSON",
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    dataType: "JSON",
    url: '/users/sign_out'
  })
);
