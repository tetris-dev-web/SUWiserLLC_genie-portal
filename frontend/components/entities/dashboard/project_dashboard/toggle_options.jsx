import React from 'react';

class ToggleOptions extends React.Component {
  constructor() {
    super();

    this.state = {
      showViewType: false
    };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState({showViewType: !this.state.showViewType});
  }

  generateOptions() {
    const { toggleView, viewId, optionIcons } = this.props;

    return optionIcons.map((icon, i) => (
      <div key={i} className='toggle-option' onClick={() => toggleView(i)}>
        <div>
          <div className='toggle-icon'>
            {icon}
          </div>
          <div className='toggle-button'
            id={viewId === i ? 'selected-button' : 'unselected-button'}>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { viewId, viewTitle, viewTypes } = this.props;
    const options = this.generateOptions();

    return (
      <div className="toggle-view-options-container">
        <div className='toggle-view-options'
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}>
          {options}
          <div className="toggle-view-title">{viewTitle}</div>
          <div className="toggle-view-current-view">{this.state.showViewType ? viewTypes[viewId]: ""}</div>
        </div>
      </div>
    );
  }
}

export default ToggleOptions;
