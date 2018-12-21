import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

class CapitalHistory extends React.Component {
  constructor(props) {
    super(props);
    this.initSVG = this.initSVG.bind(this);
    this.calculateWidth = this.calculateWidth.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount () {
    this.calculateWidth();
    this.initSVG();
    this.draw();
  }

  calculateWidth() {
    this.width = document.getElementById("cap-history").clientWidth;
  }

  initSVG () {
    this.svg = d3.select("#cap-history")
    .append('svg')
    .attr("width", this.width)
    .attr("height", this.props.capital / 24000)
    .style("background-color", "pink");
  }

  draw () {
    const xScale = d3.scaleLinear()
                            .domain([0, this.props.endTime])
                            .range([0, this.width]);

    const yScale = d3.scaleLinear()
                            .domain([0, this.props.capital])
                            .range([this.props.capital / 24000, 0]);

    const lineScale = d3.line()
                            .x(function(d) { return xScale(d.date); })
                            .y(function(d) { return yScale(d.capital); });

    const toolTip = d3.select("body")
                       .append("div")
                       .attr("class", "tooltip")
                       .style("opacity", 0);

     this.svg.append("path")
        .attr("d", lineScale(this.props.lineData));

     this.svg.selectAll("circle")
             .data(this.props.activationHistory)
             .enter()
             .append("circle")
             .attr('cx', (d) => xScale(d.time))
             .attr('cy', (d) => yScale(d.capital))
             .attr('r', 5)
             .on("mouseover", (d) => {
               toolTip.transition()
                      .duration(200)
                      .style("opacity", .9)
               toolTip.html(d.title)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
             })
             .on("mouseout", (d) => {
                toolTip.transition()
                       .duration(500)
                       .style("opacity", 0);
             });

      this.svg.selectAll("line")
              .data(this.props.activationHistory)
              .enter()
              .append("line")
              .attr("x1", () => 0)
              .attr("x2", (d) => xScale(d.time))
              .attr("y1", (d) => yScale(d.capital))
              .attr("y2", (d) => yScale(d.capital))
              .style("stroke", "black");
  }

  render() {
    return (
      <div id='cap-history' className="cap-history-container"></div>
    );
  }
}

const mapStateToProps = () => {
  return {
    capital: 74369613,
    startTime: 86400,
    endTime: 13305600,
    lineData: [
    {date: 0, capital: 0},
    {date: 86400,  capital: 501479},
    {date: 172800,  capital: 1375876},
    {date: 259200,  capital: 1499460},
    {date: 345600,  capital: 1559440},
    {date: 432000,  capital: 2485582},
    {date: 518400,  capital: 3194069},
    {date: 604800,  capital: 3876013},
    {date: 691200,  capital: 4444190},
    {date: 777600,  capital: 4448633},
    {date: 864000,  capital: 4547845},
    {date: 950400,  capital: 5007385},
    {date: 1036800,  capital: 5334688},
    {date: 1123200,  capital: 6311284},
    {date: 1209600,  capital: 6674661},
    {date: 1296000,  capital: 7317270},
    {date: 1382400,  capital: 7966441},
    {date: 1468800,  capital: 8563693},
    {date: 1555200,  capital: 9074561},
    {date: 1641600,  capital: 9831451},
    {date: 1728000,  capital: 10358922},
    {date: 1814400,  capital: 10547308},
    {date: 1900800,  capital: 10738853},
    {date: 1987200,  capital: 11618641},
    {date: 2073600,  capital: 12498354},
    {date: 2160000,  capital: 13014381},
    {date: 2246400,  capital: 13871651},
    {date: 2332800,  capital: 14097678},
    {date: 2419200,  capital: 14489576},
    {date: 2505600,  capital: 14992117},
    {date: 2592000,  capital: 15080612},
    {date: 2678400,  capital: 16034296},
    {date: 2764800,  capital: 16754687},
    {date: 2851200,  capital: 17477850},
    {date: 2937600,  capital: 18247462},
    {date: 3024000,  capital: 18645062},
    {date: 3110400,  capital: 19044219},
    {date: 3196800,  capital: 19939991},
    {date: 3283200,  capital: 19978081},
    {date: 3369600,  capital: 20256983},
    {date: 3456000,  capital: 20784523},
    {date: 3542400,  capital: 21301176},
    {date: 3628800,  capital: 21410608},
    {date: 3715200,  capital: 21733456},
    {date: 3801600,  capital: 22011008},
    {date: 3888000,  capital: 22692812},
    {date: 3974400,  capital: 23029329},
    {date: 4060800,  capital: 23206451},
    {date: 4147200,  capital: 24014781},
    {date: 4233600,  capital: 24260889},
    {date: 4320000,  capital: 24940430},
    {date: 4406400,  capital: 25626946},
    {date: 4492800,  capital: 26239750},
    {date: 4579200,  capital: 26511840},
    {date: 4665600,  capital: 27004144},
    {date: 4752000,  capital: 27200831},
    {date: 4838400,  capital: 27926583},
    {date: 4924800,  capital: 28658329},
    {date: 5011200,  capital: 29069600},
    {date: 5097600,  capital: 29919443},
    {date: 5184000,  capital: 29983398},
    {date: 5270400,  capital: 30233874},
    {date: 5356800,  capital: 30452257},
    {date: 5443200,  capital: 31191111},
    {date: 5529600,  capital: 31869181},
    {date: 5616000,  capital: 32579816},
    {date: 5702400,  capital: 33214617},
    {date: 5788800,  capital: 33752120},
    {date: 5875200,  capital: 34201920},
    {date: 5961600,  capital: 35023005},
    {date: 6048000,  capital: 35194210},
    {date: 6134400,  capital: 35716996},
    {date: 6220800,  capital: 35915187},
    {date: 6307200,  capital: 35915820},
    {date: 6393600,  capital: 36256983},
    {date: 6480000,  capital: 36644120},
    {date: 6566400,  capital: 37000101},
    {date: 6652800,  capital: 37587565},
    {date: 6739200,  capital: 37617695},
    {date: 6825600,  capital: 38501702},
    {date: 6912000,  capital: 38929815},
    {date: 6998400,  capital: 38992039},
    {date: 7084800,  capital: 39841019},
    {date: 7171200,  capital: 40185797},
    {date: 7257600,  capital: 40572778},
    {date: 7344000,  capital: 41002756},
    {date: 7430400,  capital: 41863317},
    {date: 7516800,  capital: 42657642},
    {date: 7603200,  capital: 43404327},
    {date: 7689600,  capital: 43446446},
    {date: 7776000,  capital: 43910159},
    {date: 7862400,  capital: 44715488},
    {date: 7948800,  capital: 44943717},
    {date: 8035200,  capital: 44984291},
    {date: 8121600,  capital: 45949103},
    {date: 8208000,  capital: 46575341},
    {date: 8294400,  capital: 46700685},
    {date: 8380800,  capital: 47460007},
    {date: 8467200,  capital: 47936708},
    {date: 8553600,  capital: 48740713},
    {date: 8640000,  capital: 48937718},
     {date: 8726400,  capital: 48982485},
     {date: 8812800,  capital: 49023179},
     {date: 8899200,  capital: 49556850},
     {date: 8985600,  capital: 49577916},
     {date: 9072000,  capital: 50174088},
     {date: 9158400,  capital: 50455300},
     {date: 9244800,  capital: 50505468},
     {date: 9331200,  capital: 51361540},
     {date: 9417600,  capital: 52112956},
     {date: 9504000,  capital: 52934570},
     {date: 9590400,  capital: 53406751},
     {date: 9676800,  capital: 54007741},
     {date: 9763200,  capital: 54594775},
     {date: 9849600,  capital: 55026799},
     {date: 9936000,  capital: 55434626},
     {date: 10022400,  capital: 56271966},
     {date: 10108800,  capital: 56425367},
     {date: 10195200,  capital: 56454762},
     {date: 10281600,  capital: 56465615},
     {date: 10368000,  capital: 57003879},
     {date: 10454400,  capital: 57297160},
     {date: 10540800,  capital: 57922467},
     {date: 10627200,  capital: 58591843},
     {date: 10713600,  capital: 58724591},
     {date: 10800000,  capital: 58958221},
     {date: 10886400,  capital: 59090325},
     {date: 10972800,  capital: 59917192},
     {date: 11059200,  capital: 60896382},
     {date: 11145600,  capital: 61312517},
     {date: 11232000,  capital: 61799725},
     {date: 11318400,  capital: 61912252},
     {date: 11404800,  capital: 62542001},
     {date: 11491200,  capital: 63279692},
     {date: 11577600,  capital: 64081831},
     {date: 11664000,  capital: 64691413},
     {date: 11750400,  capital: 65230316},
     {date: 11836800,  capital: 65354815},
     {date: 11923200,  capital: 66076491},
     {date: 12009600,  capital: 67044046},
     {date: 12096000,  capital: 67348216},
     {date: 12182400,  capital: 68073251},
     {date: 12268800,  capital: 68384545},
     {date: 12355200,  capital: 68701056},
     {date: 12441600,  capital: 69514593},
     {date: 12528000,  capital: 70334023},
     {date: 12614400,  capital: 70914657},
     {date: 12700800,  capital: 70919045},
     {date: 12787200,  capital: 71034597},
     {date: 12873600,  capital: 71923834},
     {date: 12960000,  capital: 72173121},
     {date: 13046400,  capital: 73007522},
     {date: 13132800,  capital: 74005270},
     {date: 13219200,  capital: 74162397},
     {date: 13305600,  capital: 74369613}
   ],
   activationHistory: [
      {
        title: 'proj1',
        time: 3369600,
        capital: 19000000
      },
      {
        title: 'proj2',
        time: 6825600,
        capital: 34000000
      },
      {
        title: 'proj3',
        time: 13305600,
        capital: 69000000
      }
    ],
    width: 800
 };
};

export default connect(mapStateToProps)(CapitalHistory);

// initScales() {
//   this.xScale = d3.scaleLinear()
//                         .domain([0, this.props.endTime])
//                         .range([0, this.width]);
//
//   this.yScale = d3.scaleLinear()
//                         .domain([0, this.props.capital])
//                         .range([this.props.capital / 24000, 0]);
//
//   const xScale = this.xScale;
//   const yScale = this.yScale;
//
//   this.lineScale = d3.line()
//                         .x(function(d) { return xScale(d.date); })
//                         .y(function(d) { return yScale(d.capital); });
// }
//
// drawLine() {
//   this.svg.append("path")
//      .attr("d", this.lineScale(this.props.lineData));
// }
//
// drawProjects() {
//   this.svg.selectAll("circle")
//           .data(this.props.activationHistory)
//           .enter()
//           .append("circle")
//           .attr('cx', (d) => this.xScale(d.time))
//           .attr('cy', (d) => this.yScale(d.capital))
//           .attr('r', 5);
//
//    this.svg.selectAll("line")
//            .data(this.props.activationHistory)
//            .enter()
//            .append("line")
//            .attr("x1", () => 0)
//            .attr("x2", (d) => this.xScale(d.time))
//            .attr("y1", (d) => this.yScale(d.capital))
//            .attr("y2", (d) => this.yScale(d.capital))
//            .style("stroke", "black");
// }
