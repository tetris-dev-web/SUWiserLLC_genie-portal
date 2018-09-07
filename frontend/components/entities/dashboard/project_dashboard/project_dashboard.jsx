import React from 'react';
import ProjectGraph from './project_graph';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    // this.state = {
    //   data: '',
    //   toggle: false,
    // };

    // this.toggleData = this.toggleData.bind(this);
  }



  componentDidMount() {
    debugger
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
    debugger
    if (this.props.currentUser) {
      return (
        <div className="graph-container">
          <ProjectGraph currentUser={this.props.currentUser}
            data={this.props.projects} />
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
