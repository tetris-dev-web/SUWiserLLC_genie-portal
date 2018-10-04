import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line,Shape, Text } from 'react-konva';
import * as d3 from 'd3';


const ProjectThermo = function( {project} ) {
  const { current_capital,capital_required,start_date,close_date } = project;
  const percentCompleted = (current_capital*100) / capital_required;
  const rectWidth = 22;
  const rectHeigth = 110;
  const rectStartingX = 45;
  const rectStartingY = 55;
  const filledRectHeigth = ( percentCompleted/100 ) * rectHeigth;
  const filledRectStartingX = rectStartingX + 1;
  const filledRectStartingY = ( rectHeigth+rectStartingY ) - ( filledRectHeigth+1 );
  const lineStartX = (percentCompleted>90) ? 33 : (20+rectWidth);
  const veticalLineStartX = 190;
  const veticalLineStartY = 45;
  const timeNow = new Date();
  const formattedCloseDate = new Date(close_date);
  const formattedStartDate = new Date(start_date);
  const oneDay = 24*60*60*1000;
  const daysToClose = Math.round(Math.abs((formattedCloseDate.getTime() - timeNow.getTime())/(oneDay)));
  const xTimeScale = d3.scaleTime()
                   .domain([formattedStartDate,formattedCloseDate])
                   .range([rectStartingX + rectWidth + 60, rectStartingX + 130]).clamp(true);
  const yVoteScale = d3.scaleLinear()
                   .domain([1,200000])
                   .range([rectHeigth+rectStartingY, filledRectStartingY]).clamp(true);

  const daysToCloseLineX = xTimeScale(timeNow);

  const voteXScale = d3.scaleTime()
                    .domain([formattedStartDate,formattedCloseDate])
                    .range([rectStartingX+rectWidth+8,daysToCloseLineX]).clamp(true);
  const jsonVotes = JSON.parse(project.votes);

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
        <Line
          points={[daysToCloseLineX,55,daysToCloseLineX,160]}
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
        <Text
          x={daysToCloseLineX + 5}
          y={100}
          text={ daysToClose + ' days to close' }
          fontSize={13}
          fontFamily={'open sans condensed'}
          fill={'#554037'}
          strokeWidth={1}
          />
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(daysToCloseLineX, filledRectStartingY);
            context.lineTo(rectStartingX+2, filledRectStartingY);
            context.lineTo(rectStartingX+2, rectHeigth+rectStartingY);
            context.lineTo(rectStartingX+rectWidth+10, rectHeigth+rectStartingY);

            Object.keys(jsonVotes).forEach(date=>{
              const formattedDate = new Date(date);
              const x = voteXScale(formattedDate);
              const y = yVoteScale(jsonVotes[date]);
              debugger
              context.lineTo(x,y);
            });
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill="red"
          strokeWidth={4}
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
