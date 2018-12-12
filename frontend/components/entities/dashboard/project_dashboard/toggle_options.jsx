import React from 'react';

class ToggleOptions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectionId: 1
    };
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection (selectionId) {
    this.setState({
      selectionId
    });
    this.props.toggleView(selectionId);
  }

  render () {
    return (
      <div className='toggle-view-options'>
        <ToggleOption updateSelection={this.updateSelection}
                      optionId={1}
                      selected={this.state.selectionId === 1}/>
                      
        <ToggleOption updateSelection={this.updateSelection}
                      optionId={2}
                      selected={this.state.selectionId === 2}/>
      </div>
    );
  }
}

const ToggleOption = ({ updateSelection, optionId, selected }) => {
  return (
    <div className='toggle-option'>
      <div className='toggle-button'
           id={selected ? 'selected-button' : 'unselected-button'}
           onClick={() => updateSelection(optionId)}>
      </div>
      <div className='toggle-icon'>
      </div>
    </div>
  );
};

export default ToggleOptions;
