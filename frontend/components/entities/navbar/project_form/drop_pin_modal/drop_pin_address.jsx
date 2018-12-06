import React from 'react';


class DropPinAddress extends React.Component{
  constructor(props){
    super(props);

      }

  render(){
    return(
      <div className='address'>
      {console.log("Props from pin addy is: ", this.props)}
        <input type="number" value={parseFloat(this.props.lat.toFixed(6))}></input>
        <input type="number" value={parseFloat(this.props.lng.toFixed(6))}></input>
        <div>street</div>
        <div>city</div>
      </div>
    );
  }
}

export default DropPinAddress;
