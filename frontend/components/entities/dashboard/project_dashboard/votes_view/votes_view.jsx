import React from 'react';
import CurrentVotingCycle from './current_voting_cycle';
import CapitalHistory from './capital_history';
import VotesView2 from './votes_view_2';

const VotesView = () =>  {
  return (
    <div id='votes-graph'>
      <VotesView2 />
      <CapitalHistory />
    </div>
  );
};

export default VotesView;


// <CurrentVotingCycle />
