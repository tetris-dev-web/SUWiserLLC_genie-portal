export const vote = vote_data => {
  return $.ajax({
    method: 'PATCH',
    url: `api/block_chain/vote`,
    data: { vote_data }
  });
};
