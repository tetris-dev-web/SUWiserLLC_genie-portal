import React from 'react';

const VotesViewCapitalRaisedLine = ({ xScale, yScale, activation }) => (
    <line x1="0" y1={yScale(activation.capital)} x2={xScale(activation.time)} y2={yScale(activation.capital)}></line>
);

export default VotesViewCapitalRaisedLine;