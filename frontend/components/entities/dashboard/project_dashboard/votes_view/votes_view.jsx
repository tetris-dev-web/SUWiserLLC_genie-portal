import React from 'react';
import CurrentVotingCycle from './current_voting_cycle';
import CapitalHistory from './capital_history';

const VotesView = () =>  {
  return (
    <div id='votes-graph'>
      <CurrentVotingCycle />
      <CapitalHistory />
    </div>
  );
};

export default VotesView;
