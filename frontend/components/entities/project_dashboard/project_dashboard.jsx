import React from 'react';
import ProjectGraph from './project_graph';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: '',
      toggle: false,
    };

    // this.toggleData = this.toggleData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /* After a transaction, nextProps.data becomes an object with
    undefined inside of it. Setting data to this.props.data fetches the
    correct array data */
    // debugger

    this.setState({ data: nextProps.projects })
    // let data;
    // if (nextProps.data instanceof Array) {
    //   data = nextProps.data;
    // } else {
    //   data = this.props.data
    // }
    //
    // const parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    //
    // data.forEach(d => {
    //   d.timestamp = parseTime(d.timestamp);
    //   d.amount = +d.amount;
    // });
    //
    // const sentTrans = data.filter(d => {
    //   return d.fromAddress === nextProps.currentUser;
    // });
    //
    // const receivedTrans = data.filter(d => {
    //   return d.toAddress === nextProps.currentUser;
    // });
    //
    // this.setState({ data: sentTrans, sentTrans, receivedTrans });
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  // toggleData() {
  //   if (this.state.toggle) {
  //     this.setState({
  //       data: totalData,
  //       toggle: false
  //     });
  //   } else {
  //     this.setState({
  //       data: userData,
  //       toggle: true
  //     });
  //
  //   }
  // }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="graph-container">
          <ProjectGraph currentUser={this.props.currentUser}
            data={this.state.data} />
        </div>
      );
    } else {
      return (
        <div className="graph-container graph">Project Dashboard</div>
      );
    }

  }
}

export default ProjectDashboard;
