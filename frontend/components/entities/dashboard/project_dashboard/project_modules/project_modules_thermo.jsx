import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line,Shape, Text } from 'react-konva';
import * as d3 from 'd3';


class ProjectThermo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showText: false,
    };
    this.toggleTextShowing = this.toggleTextShowing.bind(this);
  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }


  render() {
    //change vote expectation to capital raised
    const { project} = this.props
    const { current_capital, capital_required, start_date, close_date } = project;

    const percentCompleted = (current_capital*100) / capital_required;

    const rectDems = {
          Width : 22,
          Height: 110,
          StartingX : 45,
          StartingY : 55,
    }

    const filledRectHeight = ( percentCompleted/100 ) * rectDems.Height;
    const filledRectStartingX = rectDems.StartingX + 1;
    const filledRectStartingY = ( rectDems.Height+rectDems.StartingY ) - ( filledRectHeight+1 );

    const lineStartX = ( percentCompleted > 90) ? 33 : (20+rectDems.Width);
    const veticalLineStartX = 190;
    const veticalLineStartY = 45;

    const timeNow = new Date();
    const formattedCloseDate = new Date(close_date);
    const formattedStartDate = new Date(start_date);
    const oneDay = 24*60*60*1000;
    const daysToClose = Math.round(Math.abs((formattedCloseDate.getTime() - timeNow.getTime())/(oneDay)));
    let jsonVotes;
    if(project.votest) {
      jsonVotes = JSON.parse(project.votes);
    }else{
      jsonVotes = {};
    }

    const xTimeScale = d3.scaleTime()
                     .domain([formattedStartDate,formattedCloseDate])
                     .range([rectDems.StartingX + rectDems.Width + 60, rectDems.StartingX + 130]).clamp(true);

    const yVoteScale = d3.scaleLinear()
                     .domain([ 1,d3.max(Object.values(jsonVotes)) ])
                     .range([rectDems.Height+rectDems.StartingY, filledRectStartingY]).clamp(true);

    const daysToCloseLineX = xTimeScale(timeNow);

    const voteXScale = d3.scaleTime()
                      .domain([formattedStartDate,formattedCloseDate])
                      .range([rectDems.StartingX+rectDems.Width,daysToCloseLineX]).clamp(true);

    const sortedVotesByDate = Object.keys(jsonVotes).sort((a,b)=>{
      const date1 = new Date(a);
      const date2 = new Date(b);
      if(date1 < date2) return -1;
      else if (date1 > date2) return 1;
      else return 0;
    });

    const {showText} = this.state

    // TODO structure all lines as variables with names
    // TODO shift stylings to SCSS and make label text more transparent than number text
    // TODO make line draw on hover as an animation

    const CapRaisedLine = () => <Line
                points={[lineStartX,filledRectStartingY,190,filledRectStartingY]}
                stroke={'#00FFFF'}
                strokeWidth={1.5}/>


    const CapReqLine = () => <Line
                points={[15,55,190,55]}
                stroke={'white'}
                strokeWidth={.5}
                />



    const CurrentDayLine = () => <Line
                points={[daysToCloseLineX,55,daysToCloseLineX,160]}
                stroke={'#00FFFF'}
                strokeWidth={1.5}
                />




      return (
        <div className="temp">
          <div className="thermo-canvas-container">
            <Stage width={220} height={200}
              >
              <Layer>
                  <Text
                    x={5}
                    y={27}
                    text={ 'capital required' + '\n' + '$' + capital_required }
                    fontSize={12}
                    fontFamily={'open sans condensed'}
                    fill={'white'}
                    strokeWidth={1}
                    visible={showText}
                    />
                  <CapRaisedLine/>
                  <CapReqLine/>
                  <CurrentDayLine/>
                <Text
                  x={rectDems.StartingX-35}
                  y={filledRectStartingY}
                  text={ current_capital + '\n' + 'raised' }
                  fontSize={12}
                  fontFamily={'open sans condensed'}
                  fill={'#00FFFF'}
                  strokeWidth={1}
                  visible={showText}
                  />

                <Text
                  x={veticalLineStartX-18}
                  y={10}
                  text={ 'close date' + '\n' + '18-10-25' }
                  fontSize={13}
                  fontFamily={'open sans condensed'}
                  fill={'white'}
                  strokeWidth={1}
                  visible={showText}
                  />
                <Text
                  x={daysToCloseLineX - 14}
                  y={168}
                  text={ `${daysToClose} days \n till close` }
                  fontSize={12}
                  fontFamily={'open sans condensed'}
                  fill={'#00FFFF'}
                  strokeWidth={1}
                  visible={showText}
                  />
                  <Shape
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(daysToCloseLineX, filledRectStartingY);
                      context.lineTo(rectDems.StartingX - 1, filledRectStartingY);
                      context.lineTo(rectDems.StartingX - 1, rectDems.Height+rectDems.StartingY);
                      context.lineTo(rectDems.StartingX+rectDems.Width, rectDems.Height+rectDems.StartingY);
                      let sumVotes = 0;
                      sortedVotesByDate.forEach(date=>{
                        const formattedDate = new Date(date);
                        const x = voteXScale(formattedDate);
                        sumVotes += jsonVotes[date];
                        const y = yVoteScale(sumVotes);
                        context.lineTo(x,y);
                      });
                      // context.closePath();
                      context.fillStrokeShape(shape);
                    }}
                    fill="#00FFFF"
                    strokeWidth={4}
                    opacity={0.5}
                    />
                  <Rect
                    x={ 0 }
                    y={ 0 }
                    width={ 200 }
                    height={ 200 }
                    onMouseEnter={(e)=>{this.toggleTextShowing();}}
                    onMouseLeave={(e)=>{this.toggleTextShowing();}}
                    />
              </Layer>
            </Stage>
          </div>
        </div>
      );
    };
};

export default ProjectThermo;
