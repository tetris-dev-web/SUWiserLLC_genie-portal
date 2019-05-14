import React from 'react';

class FourOhFourPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { title, description } = this.props;
    return (
          <div className='404_prompt' style={{display: 'flex', margin: 'auto'}}>
            <div className='404_message' style={{display: 'flex', flexDirection: 'column'}}>
              <h1 className='404_title' style={{margin: 'auto', fontSize: '90px', fontFamily: 'none'}}>{ title }</h1>
              <p className='404_description' style={{fontSize: '30px', margin: '30px'}}>{ description }</p>
            </div>
          </div>
        );
  }
}

export default FourOhFourPage;
