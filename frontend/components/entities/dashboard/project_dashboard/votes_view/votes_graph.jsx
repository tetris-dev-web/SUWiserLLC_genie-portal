import React from 'react';
import { connect } from 'react-redux';
import VotesView from './votes_view';
import VotesViewCapitalRaised from './votes_view_capital_raised';


const mapStateToProps = () => {
  return {
    maxValuation: 5000000,
    capitalRaised: 3000000
  };
};

const VotesGraph = ({maxValuation, capitalRaised}) =>  {
  return (
    <div className='votes-graph' style={{ marginTop: (maxValuation - capitalRaised) / 24000 * 2 }}>
      <VotesView />
      <VotesViewCapitalRaised />
    </div>
  );
};

export default connect(mapStateToProps)(VotesGraph);


