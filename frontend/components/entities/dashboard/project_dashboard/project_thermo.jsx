import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line, Text } from 'react-konva';

const ProjectThermo = function( {project} ) {
  const { current_capital,capital_required } = project;
  const percentCompleted = (current_capital*100) / capital_required;
  const rectWidth = 22;
  const rectHeigth = 110;
  const filledRectHeigth = ( percentCompleted/100 ) * rectHeigth;
  const filledRectStartingY = ( rectHeigth+20 ) - ( filledRectHeigth+1 );
  const lineStartX = (percentCompleted>90) ? 33 : (20+rectWidth);
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Line
          points={[lineStartX,filledRectStartingY,190,filledRectStartingY]}
          stroke={'white'}
          strokeWidth={1.5}
          />
        <Rect
          x={21}
          y={ filledRectStartingY }
          width={ rectWidth-2 }
          height={ filledRectHeigth }
          cornerRadius={9}
          fill={'#223562'}
          shadowBlur={5}
          />
        <Rect
          x={20}
          y={20}
          width={ rectWidth }
          height={ rectHeigth }
          cornerRadius={9}
          stroke={'white'}
          strokeWidth={1}
          shadowBlur={5}
          />
      </Layer>
    </Stage>
  );
};
export default ProjectThermo;
