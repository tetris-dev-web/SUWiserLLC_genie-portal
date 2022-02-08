import React from 'react';
import InfoModal from "./InfoModal";
import {GenusDevInfo}  from "./orgInfo";
import DoomsDayClock from './DoomsDayClock/dooms_day_detail';


export const Bylaws = () => {
  return (
    <InfoModal
      modalTitle="BYLAWS"
      upperFigure={GenusDevInfo['bylaws']['upperFigure']}
      lowerFigure={GenusDevInfo['bylaws']["lowerFigure"]}
      content={GenusDevInfo['bylaws']['content']}
      />
  )
}

export const Strategy = () => {
  return (
    <InfoModal
      modalTitle="STRATEGY"
      upperFigure={GenusDevInfo["strategy"]["upperFigure"]}
      lowerFigure={< DoomsDayClock />}
      content={GenusDevInfo["strategy"]["content"]}
      />
  )
}


// export const OfferCicular = () => {
//   return (
//     <InfoModal
//       modalTitle="OFFER CIRCULAR"
//       upperFigure={{}}
//       lowerFigure={{}}
//       content={Genus}
//   )
// }
