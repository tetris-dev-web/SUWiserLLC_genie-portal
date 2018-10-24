
import React from "react";
import ReadString from '../entities/dashboard/readString';
import { DrizzleContext } from "drizzle-react";

export default ({component: Component, props, actions}) => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
<<<<<<< HEAD
      // debugger window.web3 === undefined || this.props.web3.status === 'failed'
      // if (window.web3 === undefined) {
      //   return(
      //     // Display a web3 warning.
      //     <div className="warning">
      //       <p>This browser has no connection to the Ethereum network. </p>
      //       <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
      //     </div>
      //   );
      // }
=======

>>>>>>> a369a916a52f4a344302892be936624e2ecfad5f

      if (!initialized) {
        return "Loading...";
      }
      return <Component {...props} {...actions} drizzle={drizzle} drizzleState={drizzleState}/>;
    }}
  </DrizzleContext.Consumer>
);
