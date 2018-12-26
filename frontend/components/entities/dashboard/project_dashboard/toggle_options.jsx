import React from 'react';

// class ToggleOptions extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       selectionId: 1
//     };
//     this.updateSelection = this.updateSelection.bind(this);
//   }
//   // componentDidMount() {
//   //
//   //   this.updateSelection(2)
//   // }
//   updateSelection (selectionId) {
//     this.setState({
//       selectionId
//     });
//     this.props.toggleView(selectionId);
//   }

//   render () {
//     return (
//       <div className='toggle-view-options'>
//         <ToggleOption updateSelection={this.updateSelection}
//                       optionId={1}
//                       selected={this.state.selectionId === 1}/>

//         <ToggleOption updateSelection={this.updateSelection}
//                       optionId={2}
//                       selected={this.state.selectionId === 2}/>
//       </div>
//     );
//   }
// }

const ToggleOptions = ({ toggleView, viewId, numberOfViews }) => {
  const options = [];
  for(let i = 1; i <= numberOfViews; i++) {
    options.push(
      <div key={i} className='toggle-option'>
        <div className='toggle-button'
          id={viewId === i ? 'selected-button' : 'unselected-button'}
          onClick={() => toggleView(i)}>
        </div>
        <div className='toggle-icon'>
        </div>
      </div>
    );
  }
  
  return (
    <div className='toggle-view-options'>
      {options}
    </div>
  );
};

export default ToggleOptions;
