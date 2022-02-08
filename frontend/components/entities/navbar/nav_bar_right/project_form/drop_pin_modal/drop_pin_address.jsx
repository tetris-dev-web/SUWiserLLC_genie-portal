import React from 'react';


class DropPinAddress extends React.Component{
  constructor(props){
    super(props);
    console.log(props);

      }


  render(){
    return(
      <div className='address'>
        <div className='latlng'>
          <input type="number" value={parseFloat(this.props.lat.toFixed(6))}></input>
          <input type="number" value={parseFloat(this.props.lng.toFixed(6))}></input>
        </div>
        <div className='address-inner'>
          <div className="city">
            <div>city</div>
            <div>{this.props.city}</div>
          </div>
          <div className="continent">
            <div>continent</div>
            <div>{this.props.continent}</div>
          </div>
        </div>
        <input type="button" value="Thumbs Up" onClick={this.props.closeModal}></input>
      </div>
    );
  }
}

export default DropPinAddress;
