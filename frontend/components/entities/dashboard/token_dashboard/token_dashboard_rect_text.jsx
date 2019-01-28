import React from 'react';

const TokenDashBoardRectText = (props) => {
   let { inactiveTokenRatio, hoveredActiveTokens, hoveredTotalTokens, earningsData } = props

   if (earningsData) {
     let earningsPercentage = `${(100-(earningsData.hoveredEarnings/earningsData.totalEarnings)*100)}%`

     return (
       <g>
         <text x="0" y={earningsPercentage}>
           <tspan dx="-75px">
             { `$${earningsData.hoveredEarnings}` } in
           </tspan>
         </text>
         <text x="0" y={earningsPercentage}>
           <tspan dx="-75px" dy="1.5em">
             total earnings
           </tspan>
         </text>
       </g>
     );

   } else {

     return (
       <g>
         <text x="0" y={`${inactiveTokenRatio/2}%`} fill="black">
           <tspan dx="125px" dy="0">
             {hoveredTotalTokens} total
           </tspan>
         </text>
         <text x='125px' y={`${inactiveTokenRatio/2}%`}>
           <tspan dx="0" dy="1.5em">
             tokens owned
           </tspan>
         </text>
         <text x='125px' y={`${(100 - inactiveTokenRatio)/2 + inactiveTokenRatio}%`}>
           <tspan dx="0" dy="0">
             {hoveredActiveTokens} active
           </tspan>
         </text>
         <text x='125px' y={`${(100 - inactiveTokenRatio)/2 + inactiveTokenRatio}%`}>
           <tspan dx="0" dy="1.5em">
             tokens
           </tspan>
         </text>
       </g>
     );

   }
};

export default TokenDashBoardRectText;
