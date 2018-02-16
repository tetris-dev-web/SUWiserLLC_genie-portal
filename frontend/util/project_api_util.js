export const fetchProjects = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/projects',
  });
};

export const fetchProject = id => {
  return $.ajax({
    method: 'GET',
    url: `api/projects/${id}`,
  });
};

export const createProject = project => {
  return $.ajax({
    method: 'POST',
    url: 'api/projects',
    data: { project }
  });
};
