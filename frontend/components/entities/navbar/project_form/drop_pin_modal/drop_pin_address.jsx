import React from 'react';


class DropPinAddress extends React.Component{
  constructor(props){
    super(props);

      }

  render(){
    return(
      <div className='address'>
        <div className='latlng'>
          <input type="number" value={parseFloat(this.props.lat.toFixed(6))}></input>
          <input type="number" value={parseFloat(this.props.lng.toFixed(6))}></input>
        </div>
        <div className='address-inner'>
          <div>{this.props.city}</div>
          <div>{this.props.continent}</div>
        </div>
        <input type="button" value="Thumbs Up"></input>
      </div>
    );
  }
}

export default DropPinAddress;
