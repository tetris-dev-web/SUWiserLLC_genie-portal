
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
>>>>>>> ae5d08597b9ee2831d1ef3eed814e032883a9003

      if (!initialized) {
        return "Loading...";
      }
      return <Component {...props} {...actions} drizzle={drizzle} drizzleState={drizzleState}/>;
    }}
  </DrizzleContext.Consumer>
);
