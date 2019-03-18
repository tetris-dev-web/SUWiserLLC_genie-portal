export const fetchProjectGraphData = () => {
  return fetch(`/api/project_graph_data`).then(response => {
    return response.json().then(projectGraphData => {
      return projectGraphData;
    })
  });
}
