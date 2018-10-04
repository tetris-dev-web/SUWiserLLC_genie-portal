import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line, Text } from 'react-konva';

const ProjectThermo = function( {project} ) {
  console.log(project.close_date);
  const { current_capital,capital_required } = project;
  const percentCompleted = (current_capital*100) / capital_required;
  const rectWidth = 22;
  const rectHeigth = 110;
  const rectStartingX = 65;
  const rectStartingY = 55;
  const filledRectHeigth = ( percentCompleted/100 ) * rectHeigth;
  const filledRectStartingX = rectStartingX + 1;
  const filledRectStartingY = ( rectHeigth+rectStartingY ) - ( filledRectHeigth+1 );
  const lineStartX = (percentCompleted>90) ? 33 : (20+rectWidth);
  const veticalLineStartX = 190;
  const veticalLineStartY = 45;
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Line
          points={[15,55,190,55]}
          stroke={'white'}
          strokeWidth={1}
          />
        <Line
          points={[veticalLineStartX,veticalLineStartY,190,55]}
          stroke={'white'}
          strokeWidth={1}
          />
        <Line
          points={[lineStartX,filledRectStartingY,190,filledRectStartingY]}
          stroke={'#554037'}
          strokeWidth={1.5}
          />
        <Text
          x={rectStartingX - 45}
          y={90}
          text={ current_capital + '\n' + 'raised' }
          fontSize={17}
          fontFamily={'open sans condensed'}
          fill={'#554037'}
          strokeWidth={1}
          />
        <Text
          x={15}
          y={10}
          text={ 'Capital required' + '\n' + '$' + capital_required }
          fontSize={17}
          fontFamily={'open sans condensed'}
          fill={'white'}
          strokeWidth={1}
          />
        <Text
          x={veticalLineStartX-35}
          y={10}
          text={ 'close date' + '\n' + '18-10-25' }
          fontSize={13}
          fontFamily={'open sans condensed'}
          fill={'white'}
          strokeWidth={1}
          />
        <Rect
          x={ filledRectStartingX }
          y={ filledRectStartingY }
          width={ rectWidth-2 }
          height={ filledRectHeigth }
          cornerRadius={9}
          fill={'#223562'}
          shadowBlur={5}
          />
        <Rect
          x={ rectStartingX }
          y={ rectStartingY }
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
