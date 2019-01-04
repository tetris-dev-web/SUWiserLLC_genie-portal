import React from 'react';
import VotesView from './votes_view';
import VotesViewCapitalRaised from './votes_view_capital_raised';

const VotesGraph = () =>  {
  return (
    <div id='votes-graph'>
      <VotesView />
      <VotesViewCapitalRaised />
    </div>
  );
};

export default VotesGraph;


