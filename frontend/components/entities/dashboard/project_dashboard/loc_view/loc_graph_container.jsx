import { connect } from 'react-redux';
import { merge } from 'lodash';
import LocGraph from './loc_graph';

const getArrayOfObjectsMinMax = (arrayOfObjects, key) => {
  const arrayOfValues = arrayOfObjects.map(object => object[key]);
  return [Math.min(...arrayOfValues), Math.max(...arrayOfValues)];
};

const mapStateToProps = ({ entities }) => {
  const projects = Object.values(entities.projects).map(project => merge({}, project));

  // export cities from projects
  const cities = [
    { name: "New York", continent: "North America" },
    { name: "New York", continent: "North America" },
    { name: "New York", continent: "North America" },
    { name: "Rome", continent: "Europe" },
    { name: "Shanghai", continent: "Asia" },
    { name: "Shanghai", continent: "Asia" }
  ];
  const continents = [{ name: "North America" }, { name: "Asia" }, {name: "Europe"}];
  const center = {fixed: true};

  const linksData = projects.map((project, idx) => {
    const link = {};
    link.source = cities[idx];
    link.target = project;

    return link;
  });
  cities.forEach(city => {
    for (let i = 0; i < continents.length; i++) {
      if (city.continent === continents[i].name) {
        linksData.push(
          {
            source: continents[i],
            target: city
          }
        );
      }
    }
  });
  continents.forEach(continent => {
    linksData.push(
      {
        source: center,
        target: continent
      }
    );
  });

  return {
    projects,
    cities,
    continents,
    linksData,
    center,
    allProjectsValuationMinMax: getArrayOfObjectsMinMax(projects, "valuation")
  };
};

export default connect(mapStateToProps)(LocGraph);