import React, { useEffect } from "react";
import * as d3 from "d3";

const ProjectThermo = (props) => {
  const { project, capitalBeingRaised, width, height } = props;
  const [showText, setShowText] = useState(false);

  const toggleTextShowing = () => {
    setShowText(!showText);
  };

  const defineScales = () => {
    const { capitalRequired, openingTime, closingTime } = project;
    const percentCompleted = (capitalBeingRaised * 100) / capitalRequired;
    const timeNow = new Date();
    const formattedCloseDate = new Date(openingTime);
    const formattedStartDate = new Date(closingTime);
    const oneDay = 24 * 60 * 60 * 1000;
    const daysToClose = Math.round(
      Math.abs((formattedCloseDate.getTime() - timeNow.getTime()) / oneDay),
    );
    console.log("days", daysToClose);

    const jsonVotes = this.sortVotesByDate();
    console.log("days", jsonVotes);

    const xTimeScale = d3
      .scaleTime()
      .domain([formattedStartDate, formattedCloseDate])
      .range([rectDems.StartingX + rectDems.Width + 60, rectDems.StartingX + 130])
      .clamp(true);
    const yVoteScale = d3
      .scaleLinear()
      .domain([1, d3.max(Object.values(jsonVotes))])
      .range([rectDems.Height + rectDems.StartingY, filledRectStartingY])
      .clamp(true);

    const daysToCloseLineX = xTimeScale(timeNow);

    const voteXScale = d3
      .scaleTime()
      .domain([formattedStartDate, formattedCloseDate])
      .range([rectDems.StartingX + rectDems.Width, daysToCloseLineX])
      .clamp(true);

    return { xTimeScale, yVoteScale, daysToCloseLineX, voteXScale };
  };

  const sortVotesByDate = () => {
    const { votes } = project;
    let jsonVotes;
    if (votes) {
      jsonVotes = JSON.parse(votes);
    } else {
      jsonVotes = {};
    }

    const sortedVotesByDate = Object.keys(jsonVotes).sort((a, b) => {
      const date1 = new Date(a);
      const date2 = new Date(b);
      if (date1 < date2) return -1;
      else if (date1 > date2) return 1;
      else return 0;
    });
    return jsonVotes;
  };

  const startGraph = () => {
    const graphBase = d3
      .select(".projectProgress-graph")
      .append("svg")
      .classed("project-svg", true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", width)
      .attr("height", height);
    graphBase.append("rect").attr("width", "95%").attr("height", "100%").attr("fill", "black");
    return graphBase;
  };

  const populateData = () => {
    const { xTimeScale, yVoteScale, daysToCloseLineX, voteXScale } = defineScales();

    const graph = startGraph();
    const text = graph
      .append("text")
      .attr("x", 17)
      .attr("y", 18)
      .style("font-size", "15px")
      .style("color", "white")
      .style("fill", "white")
      .style("visibility", "hidden")
      .text("Valuation: $" + `${capitalBeingRaised}`);

    // Reveal hidden text
    d3.select(".projectProgress-graph")
      .on("mouseover", function () {
        return text.style("visibility", "visible");
      })
      .on("mouseout", function () {
        return text.style("visibility", "hidden");
      });
  };

  useEffect(() => {
    populateData();
  }, []);

  const CapRaisedLine = () => (
    <Line
      points={[lineStartX, filledRectStartingY, 190, filledRectStartingY]}
      stroke={"#00FFFF"}
      strokeWidth={1.5}
    />
  );

  const CapReqLine = () => <Line points={[15, 55, 190, 55]} stroke={"white"} strokeWidth={0.5} />;

  const CurrentDayLine = () => (
    <Line
      points={[daysToCloseLineX, 55, daysToCloseLineX, 160]}
      stroke={"#00FFFF"}
      strokeWidth={1.5}
    />
  );

  return (
    <div className="projectProgress-graph">
      <h3 className="text-hidden">funding progress</h3>
    </div>
  );
};
export default ProjectThermo;
