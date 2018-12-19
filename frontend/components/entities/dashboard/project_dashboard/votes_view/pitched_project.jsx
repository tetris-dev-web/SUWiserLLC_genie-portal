import React from 'react';
import ProjectSubBar from './project_sub_bar'

const PitchedProject = ({ valuation, capitalRequired, width, title, svg, x, y }) =>{
  return (
    <div className="pitched-project">
      <ProjectSubBar
                    height={(valuation - capitalRequired)/24000}
                    width={width}
                    opacity={.5}
                    svg={svg}
                    x={x}
                    y={y} />
      <ProjectSubBar
                    height={capitalRequired/24000}
                    width={width}
                    opacity={1}
                    svg={svg}
                    x={x}
                    y={y} />
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
