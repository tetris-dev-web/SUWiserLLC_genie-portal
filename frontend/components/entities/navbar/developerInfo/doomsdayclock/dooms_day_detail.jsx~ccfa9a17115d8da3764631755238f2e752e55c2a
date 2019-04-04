import React from 'react';
import * as d3 from 'd3';
import './dooms_day_detail.scss';

const width = 700;
const height = 350;



class DoomsDayDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {lineChartData: [], lines:[], dataPassedIn: []};
    this.startGraph = this.startGraph.bind(this);
    this.formatData = this.formatData.bind(this);
    this.failDate = this.failDate.bind(this);
  }


  startGraph(){
    const graphBase = d3.select("#doomsday-graph").append('svg')
      .attr("width", width)
      .attr("height", height);

    return graphBase;
  }


  failDate(date){
    let sleepDate = new Date(date.getTime() + (9*30) * 86400000);
    return sleepDate;
  }
  formatData(data){
    return data.map(d => {
      let sleepDate = new Date(d.end_date.getTime() + (d.tokens * 6) * 86400000);
      return (
        [
          { 'project': d.project, 'date': new Date(d.date.getTime()), 'type': 'project', tokens: d.tokens},
          { 'project': d.project, 'date': new Date(sleepDate), 'type': 'project', tokens: d.tokens}
        ]
      );
    });
  }
  //not necessary if no interactions with the doomsday clock - will have hover effects
  componentDidMount(){
    const graph = this.startGraph();

  const dataPassedIn =
  {
    //assumptions : data is passed in order of data created?
      projects:
      [
        {'project': 'hammIn', 'date': new Date('06-15-2018'), 'end_date': new Date('3-12-2019'),  'tokens': 3},
        {'project': 'Genus',  'date': new Date('06-20-2018'), 'end_date': new Date('3-17-2019'), 'tokens': 8},
        {'project': 'coolGym', 'date': new Date('07-01-2018'), 'end_date': new Date('3-28-2019'), 'tokens': 5},
        {'project': 'dunkey', 'date': new Date('07-20-2018'), 'end_date': new Date('4-16-2019'), 'tokens': 3}
      ]
  }

  const currentDate = new Date();
  const data = this.formatData(dataPassedIn.projects);

  //determine time range min, do this before sorting projects since it sorts by when
  // projects FINISH
  let timeRangeMin = new Date(data[0][0].date.getTime());

  // sort data to have project with longest time be last
  let tempData = data.slice(0);
  tempData.sort((a,b) =>  a[1].date - b[1].date);
  // debugger;

  //determine portal sleep date
  let sleepDate = new Date(tempData[tempData.length - 1][1].date.getTime());

  //then sort data back to sort projects by start date... refactor this
  // data.sort((a, b) => a[1].date - b[1].date);

  let todayDate = new Date();

  //determine last project's sleepDate - timeAdded (will determine start of token line)
  // let finalProjectDiff = (() => {
  //   let addedTime = (9 * 30);
  //   return new Date(data[data.length-1][0].date.getTime() + addedTime * 86400000);
  // })();

  // no choice but to sort the data so we know which project will die last, and then take
  // away that projects time - added time, to allow the yellow bar from tokens to connect with it
  // ###data[data.length-1][1].date = new Date(finalProjectDiff);


  // create scales
  // let scaleSleepTime = new Date(sleepDate.getTime() + (6*6) * 86400000)

  // at the very top of the y axis to allow connection between xaxis and that to create today's date
  data.unshift(
    [
      {'project': 'top',   'date': new Date(timeRangeMin), 'type': 'top'},
      {'project': 'top',   'date': new Date(sleepDate), 'type': 'top'}
    ]
  );


  data.push(

    [
      {'project': 'x-axis',   'date': new Date(timeRangeMin), 'type': 'x-axis'},
      {'project': 'x-axis',   'date': new Date(sleepDate), 'type': 'x-axis'}
    ]
  );

  //pass this to line generator to create a horizontal line
  data.push(
    [
      {'project': 'top', 'date': new Date(), 'type': 'today-date'},
      {'project': 'x-axis', 'date': new Date(), 'type': 'today-date'}
    ]
  );

  const xScale = d3.scaleTime()
                  .domain([timeRangeMin, sleepDate])
                  .range([75,width-100]);

  const yScale = d3.scaleBand()
  .domain((() => {
    // ['top','hammIn', 'Genus', 'coolGym', 'tokens', 'x-axis']
    return data.slice(0,-1).map(d => d[0].project);
  })())
  .range([20, height]);



  // brown line extending determining extra time because of each token
  // take end date of current project and map to same time to another project's name
  const updatedData = data.concat((() => {
    let arr = [];
    for(let i = 0; i < dataPassedIn.projects.length; i++){
      let currProject = dataPassedIn.projects[i];
      let tokenDate = new Date(currProject.end_date.getTime() + (6 * currProject.tokens) * 86400000);
      arr.push(
        [
          { 'project': currProject.project, 'date': new Date(currProject.end_date), 'type': 'token'},
          { 'project': currProject.project, 'date': new Date(tokenDate), 'type': 'token'}
        ]
      );
    }
    return arr;
  })());
  // console.log('updatedData', updatedData)

  //range for hover rectangle will change depending on the number of projects passed in
  let rangeForHover = yScale(data[1]) - yScale(data[0])
  const dataPassToRect = updatedData.filter(d => d[0].type === 'project');
  //use y scale and x scale
  //xscale with Data object,
  // filter data by type === project!!!
  const rectData = dataPassToRect.map(d => {
    let x1 = xScale(d[0].date);
    let x2 = xScale(d[1].date);
    let y1 = yScale(d[0].project);
    let width = x2 - x1;
    let height = rangeForHover;
    let project = d[0].project;
    let tokens = d[0].tokens;
    return (
      {x1, x2, y1, width, height, project, tokens}
    );
  });


  // create transparent bars that will show text when hovered over
  var bar = graph.selectAll("g")
      .data(rectData)
    .enter().append("g")
    .on('mouseover', function(d,i){
          d3.select(this).append("text")
            .text(d => `${d.project} - ${d.tokens} tokens`)
              .attr('x', d => d.x2 + 15)
              .attr('y', d => d.y1)
              .style("z-index", "10")
              .style('font-size', '14px')
              .style('fill', '#1F6D6C')
              .attr("dy", ".35em")
             })
   .on('mouseout', function(d){
     d3.select(this).select('text').remove()
    });



  bar.append("rect")
     .attr('width', d => d.width)
     .attr('height', 30)
     .attr('x', (d, i) => d.x1)
     .attr('y', d => d.y1)
     // .attr('project', d => d.project)
     // .attr('fill', 'blue')
     .attr('stroke', 'none')
     // .classed('hidden', true)



  const lineGenerator = d3.line()
      .x(d => xScale(d.date));

  const lineChartData = (( () =>
    updatedData.slice(1).map(data => {
      let fillColor;
      if (data[0].type === 'token') fillColor = '#1F6D6C' ;
      else if (data[0].type === 'x-axis') fillColor = '#DEDBCF';
      else if (data[0].type === 'today-date') fillColor = '#DEDBCF';
      else if (data[0].type === 'project') fillColor = '#AB7A5E';
      else {fillColor = 'red';}
      return (
        {
          fill: fillColor,
          path: lineGenerator.y(d => yScale(d.project))(data)
        }
      );
    }
    )
  )());

  this.setState({lineChartData});


  const lines = graph.selectAll('path')
   .data(lineChartData).enter().append('path')
   .attr('d', d => d.path)
   .attr('fill', 'none')
   .attr('stroke-width', 2)
   .attr('stroke', d => d.fill)


  this.setState({lines});

  let updatedSleepDate = (() => {
    var x = new Date(sleepDate.getTime());
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    return y.toString().slice(2) + ' - ' + m.toString() + ' - ' + d.toString();
  })();

  let todayDateText = (() => {
    let days = Math.floor((sleepDate.getTime() - todayDate.getTime()) / (1000*60*60*24));
    return `${days} days`;
  })();

  graph.selectAll('text')
    .data([
      {x: 0, y: yScale(updatedData[1][0].project) - 10, text: 'projects', fill: '#1F6D6C', font_size: '15px'},
      {x: xScale(todayDate) - 17, y: height - 25, text: todayDateText, fill: '#DEDBCF', font_size: '12px'},
      {x: xScale(todayDate) - 17, y: height - 5, text: 'til close', fill: '#DEDBCF', font_size: '12px'},
      {x: xScale(sleepDate) - 30, y: height - 25, text: 'portal sleep date', fill: '#DEDBCF', font_size: '12px'},
      {x: xScale(sleepDate) - 18, y: height - 5, text: updatedSleepDate, fill: '#DEDBCF', font_size: '12px'},
      { x: xScale(sleepDate) + 30, y: yScale(updatedData[1][0].project) - 30, text: '50k dedicated', fill: '#1F6D6C', font_size: '15px'}
      ])
    .enter().append('text')
    .text(d => d.text)
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    // .style("z-index", "10")
    .style('font-size', d => d.font_size)
    .style('fill', d => d.fill)
    .attr('font-weight', 'bold');


}

  render(){

    return (
      <div id='doomsday-container'>
        <div id='doomsday-graph'>
        </div>
      </div>
    );
  }
}

export default DoomsDayDetail;
