
import React from "react";
import { DrizzleContext } from "drizzle-react";

export default ({component: Component, props, actions}) => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return "Loading...";
      }
      return <Component {...props} {...actions} drizzle={drizzle} drizzleState={drizzleState}/>;
    }}
  </DrizzleContext.Consumer>
);
