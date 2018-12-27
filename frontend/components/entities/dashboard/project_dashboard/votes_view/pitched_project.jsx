import React from 'react';
import PitchedProjectRect from './pitched_project_rect'

const PitchedProject = ({ valuation, capitalRequired, width, title, svg, x, valuationY, capitalRequiredY, capitalRaised }) =>{
  return (
    <div className="pitched-project">
      <PitchedProjectRect
                    isTop={true}
                    height={(valuation - capitalRequired)/24000}
                    width={width}
                    opacity={.3}
                    svg={svg}
                    x={x}
                    y={valuationY}
                    valuation={valuation}
                    capitalRequired={capitalRequired}
                    capitalRaised={capitalRaised} />
      <PitchedProjectRect
                    height={capitalRequired/24000}
                    width={width}
                    opacity={1}
                    svg={svg}
                    x={x}
                    y={capitalRequiredY}
                    valuation={valuation}
                    capitalRequired={capitalRequired}
                    capitalRaised={capitalRaised} />
    </div>
  );
}；

export default PitchedProject;
