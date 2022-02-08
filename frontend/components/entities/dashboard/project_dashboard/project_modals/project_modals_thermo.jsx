import React from 'react';
import * as d3 from 'd3';


class ProjectThermo extends React.Component {
  constructor(props){
    super(props);
    this.project = this.props.project
    this.capitalBeingRaised  = this.props.capitalBeingRaised
    this.state = {
      showText: false,
    };
    this.toggleTextShowing = this.toggleTextShowing.bind(this);
    this.startGraph = this.startGraph.bind(this);
    this.populateData = this.populateData.bind(this);
    this.sortVotesByDate = this.sortVotesByDate.bind(this);
  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }

  componentDidMount(){
    this.populateData();
  }

  populateData () {
    const { project, capitalBeingRaised } = this.props
    const {xTimeScale, yVoteScale, daysToCloseLineX, voteXScale} = this.defineScales();

    const graph = this.startGraph()

    const text = graph.append("text")
      .attr("x", 17)
      .attr("y", 18)
      .style("font-size", "15px")
      .style("color", "white")
      .style("fill", "white")
      .style("visibility", "hidden")
      .text('Valuation: $' + `${this.props.capitalBeingRaised}`)


    // Reveal hidden text
    d3.select('.projectProgress-graph')
      .on("mouseover", function(){ return text.style("visibility", "visible"); })
      .on("mouseout", function(){ return text.style("visibility", "hidden"); });
  }


  startGraph() {
    const graphBase = d3.select(".projectProgress-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    graphBase.append("rect")
      .attr("width", "95%")
      .attr("height", "100%")
      .attr("fill", "black");
    return graphBase;
  }

  defineScales() { //make this a method
    const { capitalRequired, openingTime, closingTime } = this.project;
    const percentCompleted = (capitalBeingRaised*100) / capitalRequired;
    const timeNow = new Date();
    const formattedCloseDate = new Date(openingTime);
    const formattedStartDate = new Date(closingTime);
    const oneDay = 24*60*60*1000;
    const daysToClose = Math.round(Math.abs((formattedCloseDate.getTime() - timeNow.getTime())/(oneDay)));
    console.log("days",daysToClose)

    const jsonVotes = this.sortVotesByDate()
    console.log("days", jsonVotes)

    const xTimeScale = d3.scaleTime()
                     .domain([formattedStartDate, formattedCloseDate])
                     .range([rectDems.StartingX + rectDems.Width + 60, rectDems.StartingX + 130]).clamp(true);
    const yVoteScale = d3.scaleLinear()
                     .domain([ 1,d3.max(Object.values(jsonVotes)) ])
                     .range([rectDems.Height+rectDems.StartingY, filledRectStartingY]).clamp(true);

    const daysToCloseLineX = xTimeScale(timeNow);


    const voteXScale = d3.scaleTime()
                      .domain([formattedStartDate,formattedCloseDate])
                      .range([rectDems.StartingX+rectDems.Width,daysToCloseLineX]).clamp(true);

    return {xTimeScale, yVoteScale, daysToCloseLineX, voteXScale}
  }


  sortVotesByDate() {
    let jsonVotes;
    if(this.project.votes) {
      jsonVotes = JSON.parse(this.project.votes);
    } else{
      jsonVotes = {};
    }

    const sortedVotesByDate = Object.keys(jsonVotes).sort((a,b)=>{
      const date1 = new Date(a);
      const date2 = new Date(b);
      if(date1 < date2) return -1;
      else if (date1 > date2) return 1;
      else return 0;
    });
    return jsonVotes
  }

  render() {

    const {showText} = this.state

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
        <div className="projectProgress-graph">
            <h3 className="text-hidden">funding progress</h3>
        </div>
      );
    };
};
// <Text
//   x={rectDems.StartingX-35}
//   y={filledRectStartingY}
//   text={ capitalBeingRaised + '\n' + 'raised' }
//   fontSize={12}
//   fontFamily={'open sans condensed'}
//   fill={'#00FFFF'}
//   strokeWidth={1}
//   visible={showText}
//   />

// <Text
//   x={veticalLineStartX-18}
//   y={10}
//   text={ 'close date' + '\n' + '18-10-25' }
//   fontSize={13}
//   fontFamily={'open sans condensed'}
//   fill={'white'}
//   strokeWidth={1}
//   visible={showText}
//   />
export default ProjectThermo;
//change vote expectation to capital raised
// const rectDems = {
//       Width : 22,
//       Height: 110,
//       StartingX : 45,
//       StartingY : 55,
// }
//
// const filledRectHeight = ( percentCompleted/100 ) * rectDems.Height;
// const filledRectStartingX = rectDems.StartingX + 1;
// const filledRectStartingY = ( rectDems.Height+rectDems.StartingY ) - ( filledRectHeight+1 );
//
// const lineStartX = ( percentCompleted > 90) ? 33 : (20+rectDems.Width);
// const veticalLineStartX = 190;
// const veticalLineStartY = 45;



// <Stage width={220} height={200}>
//   <Layer>
//     <Text
//       x={5}
//       y={27}
//       text={ 'capital required' + '\n' + '$' + capitalRequired }
//       fontSize={12}
//       fontFamily={'open sans condensed'}
//       fill={'white'}
//       strokeWidth={1}
//       visible={showText}
//       />
//     <CapRaisedLine/>
//     <CapReqLine/>
//     <CurrentDayLine/>
//
//     <Text
//       x={veticalLineStartX-18}
//       y={10}
//       text={ capitalBeingRaised + '\n' + 'raised' }
//       fontSize={13}
//       fontFamily={'open sans condensed'}
//       fill={'white'}
//       strokeWidth={1}
//       visible={showText}
//       />
//     <Text
//       x={daysToCloseLineX - 14}
//       y={168}
//       text={ `${daysToClose} days \n till close` }
//       fontSize={12}
//       fontFamily={'open sans condensed'}
//       fill={'#00FFFF'}
//       strokeWidth={1}
//       visible={showText}
//       />
//     <Shape
//       sceneFunc={(context, shape) => {
//         context.beginPath();
//         context.moveTo(daysToCloseLineX, filledRectStartingY);
//         context.lineTo(rectDems.StartingX - 1, filledRectStartingY);
//         context.lineTo(rectDems.StartingX - 1, rectDems.Height+rectDems.StartingY);
//         context.lineTo(rectDems.StartingX+rectDems.Width, rectDems.Height+rectDems.StartingY);
//         let sumVotes = 0;
//         sortedVotesByDate.forEach(date=>{
//           const formattedDate = new Date(date);
//           const x = voteXScale(formattedDate);
//           sumVotes += jsonVotes[date];
//           const y = yVoteScale(sumVotes);
//           context.lineTo(x,y);
//         });
//         // context.closePath();
//         context.fillStrokeShape(shape);
//       }}
//       fill="#00FFFF"
//       strokeWidth={4}
//       opacity={0.5}
//       />
//     <Rect
//       x={ 0 }
//       y={ 0 }
//       width={ 200 }
//       height={ 200 }
//       onMouseEnter={(e)=>{this.toggleTextShowing();}}
//       onMouseLeave={(e)=>{this.toggleTextShowing();}}
//       />
//   </Layer>
// </Stage>
