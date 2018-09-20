import React from "react";
import ReadString from '../entities/dashboard/readString';
import { DrizzleContext } from "drizzle-react";

export default ({component: Component, props}) => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return "Loading...";
      }

      return <Component {...props} drizzle={drizzle} drizzleState={drizzleState}/>;
    }}
  </DrizzleContext.Consumer>
);
