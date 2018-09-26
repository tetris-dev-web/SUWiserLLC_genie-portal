import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Text } from 'react-konva';

class ProjectThermo extends React.Component {

  render() {
    return (
      <Stage width={200} height={200}>
        <Layer>
          <Text text="Try click on rect" />
          <Rect
            x={20}
            y={20}
            width={50}
            height={50}
            fill={'green'}
            shadowBlur={5}
            />
        </Layer>
      </Stage>
    );
  }
}

export default ProjectThermo;
