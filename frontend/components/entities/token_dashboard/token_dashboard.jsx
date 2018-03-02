import React from 'react';
import TokenGraph from './token_graph';
import { data } from '../../../util/token_data_util'

class TokenDashboard extends React.Component {

  constructor(props){
    super(props);

    // var parseTime = d3.timeParse("%m/%d/%y");
    //
    // data1.forEach(function(datum) {
    //   datum.Date = parseTime(datum.Date);
    //   datum.Price = +datum.Price;
    // });
    //
    // data2.forEach(function(datum) {
    //   datum.Date = parseTime(datum.Date);
    //   datum.Price = +datum.Price;
    // });
    //
    this.state = {
      data: data,
      toggle: true
    };
    //
    // this.toggleData = this.toggleData.bind(this);
  }

  // toggleData() {
  //   if (this.state.toggle)
  //   {
  //     this.setState({
  //       data: data2,
  //       toggle: false
  //     });
  //   }
  //   else
  //   {
  //     this.setState({
  //       data: data1,
  //       toggle: true
  //     });
  //   }
  // }

  render() {
    return(
      <div>

        <TokenGraph currentUser={this.props.currentUser} data={this.state.data} />
      </div>
    );
  }
}

export default TokenDashboard;
