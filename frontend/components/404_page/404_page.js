import React from 'react';

class FourOhFourPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { web3 } = this.props;
    return (
          <div className='404_prompt' style={{display: 'flex', margin: 'auto'}}>
            <div className='404_message' style={{display: 'flex', flexDirection: 'column'}}>
              <h1 className='404_title' style={{margin: 'auto', fontSize: '90px', fontFamily: 'none'}}>{ web3 ? 'Network Error' : 'Web3 404'}</h1>
              <p className='404_description' style={{fontSize: '30px', margin: '30px'}}>{web3 ? 'Please select the Ropsten network to continue.' : 'Unable to connect to your web3 provider. Please download Metamask to continue.'}</p>
              {
                web3 ?
                <div></div> :
                <a href="https://metamask.io/" target="_blank" className="metaMask-Button" style={{fontSize: '30px'}}>{web3 ? '' : 'Download MetaMask'}</a>
              }
            </div>
          </div>
        );
  }
}

export default FourOhFourPage;
