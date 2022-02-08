import React from 'react';
import DoomsDayDetail from './dooms_day_detail';
import '../modal_styles.scss';

class StrategyModal extends React.Component {

  render() {
    return(
      <div className="modal-layer">
        <div className="ft-modal-header-cont">
          <div className="modal-header">
            Strategy
          </div>
        </div>
        <div className="ft-modal-body strategy-body">
          <div className="strategy-video-container">
            <object className="strategy-video"
              data="http://www.youtube.com/embed/pvG9u1tYYn4"></object>
          </div>
          <div className="ft-el-cont strategy-info">
            <h1 className="ft-el-header">STRATEGY</h1>
            <p className="ft-el-text">Genus Development Partners is an integrated real estate investment, design and development company headquartered in New York City that focuses on innovative and synergistic multi-use projects in central areas of large multi-cultural cities throughout the Americas. Each project will integrate a workshare/cooperative element. Current geographical foci are New York City, Philadelphia, Bogota and Puerto Rico. Genus Development will host a portal where potential investors can analyze projects through a data-driven dashboard. Stakes in each each project may be purchased as blockchain ledgered tokens that are tradable on secondary markets.
            </p>
          </div>
        </div>
        <div className='doomsday-style'>
          <DoomsDayDetail />
        </div>
      </div>
    );
  }
}

export default StrategyModal;
