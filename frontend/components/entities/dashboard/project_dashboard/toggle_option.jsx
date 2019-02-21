import React from 'react';

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

export default ToggleOption;
