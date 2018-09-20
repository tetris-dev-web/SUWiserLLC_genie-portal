import React from "react";
import ReadString from '../entities/dashboard/readString';
import { DrizzleContext } from "drizzle-react";

export default ({component: Component}) => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      console.log(drizzleContext)
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return "Loading...";
      }

      return <Component drizzle={drizzle} drizzleState={drizzleState}/>;
    }}
  </DrizzleContext.Consumer>
);
