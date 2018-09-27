import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line, Text } from 'react-konva';

class ProjectThermo extends React.Component {

  render() {
    return (
      <Stage width={200} height={200}>
        <Layer>
          <Line
            points={[35,27,157,27]}
            stroke={'white'}
            strokeWidth={2}
            />
          <Rect
            x={20}
            y={20}
            width={22}
            height={100}
            cornerRadius={9}
            fill={'#223562'}
            stroke={'white'}
            strokeWidth={1}
            shadowBlur={5}
            />
        </Layer>
      </Stage>
    );
  }
}

export default ProjectThermo;
