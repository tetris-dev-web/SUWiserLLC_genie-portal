import React from 'react';
import ProjectRect from './project_rect'

const PitchedProject = ({ valuation, capitalRequired, width, title, svg, x, valuationY, capitalRequiredY }) =>{
  return (
    <div className="pitched-project">
      <ProjectRect
                    height={(valuation - capitalRequired)/24000}
                    width={width}
                    opacity={.3}
                    svg={svg}
                    x={x}
                    y={valuationY} />
      <ProjectRect
                    height={capitalRequired/24000}
                    width={width}
                    opacity={1}
                    svg={svg}
                    x={x}
                    y={capitalRequiredY} />
    </div>
  );
}

// class PitchedProject extends React.Component{
//   constructor(props){
//     super(props);
//
//   }
//
//   render(){
//     return();
//   }
// }

export default PitchedProject;
