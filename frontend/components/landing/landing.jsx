import React from 'react';
import  Modal  from 'react-modal';
import { LandingDescription } from './landing_description';
import DemoOptions from './demo_options';
import { setDemoType } from '../../actions/ui_actions';
import './landing.scss';

class Landing extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (demoType) {
    this.props.history.push(`/dashboard/${demoType}`);
  }

  render () {
    return (
      <Modal
        isOpen={true}
        className='landing_modal'
        transparent={true}
        style={{
          overlay: {
            backgroundColor: "#333"
          }
        }}
        >
          <div className='landing'>
            <h1 className='landing_title'>PROGENY DEMO</h1>
            <LandingDescription />
            <DemoOptions handleClick={this.handleClick}/>
          </div>
    </Modal>
    )
  }
}

export default Landing;
