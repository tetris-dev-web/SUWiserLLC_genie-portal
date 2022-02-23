import Geocode from "react-geocode";

const countryToContinent = {
  AD: "Europe",
  AE: "Asia",
  AF: "Asia",
  AG: "North America",
  AI: "North America",
  AL: "Europe",
  AM: "Asia",
  AN: "North America",
  AO: "Africa",
  AQ: "Antarctica",
  AR: "South America",
  AS: "Australia",
  AT: "Europe",
  AU: "Australia",
  AW: "North America",
  AZ: "Asia",
  BA: "Europe",
  BB: "North America",
  BD: "Asia",
  BE: "Europe",
  BF: "Africa",
  BG: "Europe",
  BH: "Asia",
  BI: "Africa",
  BJ: "Africa",
  BM: "North America",
  BN: "Asia",
  BO: "South America",
  BR: "South America",
  BS: "North America",
  BT: "Asia",
  BW: "Africa",
  BY: "Europe",
  BZ: "North America",
  CA: "North America",
  CC: "Asia",
  CD: "Africa",
  CF: "Africa",
  CG: "Africa",
  CH: "Europe",
  CI: "Africa",
  CK: "Australia",
  CL: "South America",
  CM: "Africa",
  CN: "Asia",
  CO: "South America",
  CR: "North America",
  CU: "North America",
  CV: "Africa",
  CX: "Asia",
  CY: "Asia",
  CZ: "Europe",
  DE: "Europe",
  DJ: "Africa",
  DK: "Europe",
  DM: "North America",
  DO: "North America",
  DZ: "Africa",
  EC: "South America",
  EE: "Europe",
  EG: "Africa",
  EH: "Africa",
  ER: "Africa",
  ES: "Europe",
  ET: "Africa",
  FI: "Europe",
  FJ: "Australia",
  FK: "South America",
  FM: "Australia",
  FO: "Europe",
  FR: "Europe",
  GA: "Africa",
  GB: "Europe",
  GD: "North America",
  GE: "Asia",
  GF: "South America",
  GG: "Europe",
  GH: "Africa",
  GI: "Europe",
  GL: "North America",
  GM: "Africa",
  GN: "Africa",
  GP: "North America",
  GQ: "Africa",
  GR: "Europe",
  GS: "Antarctica",
  GT: "North America",
  GU: "Australia",
  GW: "Africa",
  GY: "South America",
  HK: "Asia",
  HN: "North America",
  HR: "Europe",
  HT: "North America",
  HU: "Europe",
  ID: "Asia",
  IE: "Europe",
  IL: "Asia",
  IM: "Europe",
  IN: "Asia",
  IO: "Asia",
  IQ: "Asia",
  IR: "Asia",
  IS: "Europe",
  IT: "Europe",
  JE: "Europe",
  JM: "North America",
  JO: "Asia",
  JP: "Asia",
  KE: "Africa",
  KG: "Asia",
  KH: "Asia",
  KI: "Australia",
  KM: "Africa",
  KN: "North America",
  KP: "Asia",
  KR: "Asia",
  KW: "Asia",
  KY: "North America",
  KZ: "Asia",
  LA: "Asia",
  LB: "Asia",
  LC: "North America",
  LI: "Europe",
  LK: "Asia",
  LR: "Africa",
  LS: "Africa",
  LT: "Europe",
  LU: "Europe",
  LV: "Europe",
  LY: "Africa",
  MA: "Africa",
  MC: "Europe",
  MD: "Europe",
  ME: "Europe",
  MG: "Africa",
  MH: "Australia",
  MK: "Europe",
  ML: "Africa",
  MM: "Asia",
  MN: "Asia",
  MO: "Asia",
  MP: "Australia",
  MQ: "North America",
  MR: "Africa",
  MS: "North America",
  MT: "Europe",
  MU: "Africa",
  MV: "Asia",
  MW: "Africa",
  MX: "North America",
  MY: "Asia",
  MZ: "Africa",
  NA: "Africa",
  NC: "Australia",
  NE: "Africa",
  NF: "Australia",
  NG: "Africa",
  NI: "North America",
  NL: "Europe",
  NO: "Europe",
  NP: "Asia",
  NR: "Australia",
  NU: "Australia",
  NZ: "Australia",
  OM: "Asia",
  PA: "North America",
  PE: "South America",
  PF: "Australia",
  PG: "Australia",
  PH: "Asia",
  PK: "Asia",
  PL: "Europe",
  PM: "North America",
  PN: "Australia",
  PR: "North America",
  PS: "Asia",
  PT: "Europe",
  PW: "Australia",
  PY: "South America",
  QA: "Asia",
  RE: "Africa",
  RO: "Europe",
  RS: "Europe",
  RU: "Europe",
  RW: "Africa",
  SA: "Asia",
  SB: "Australia",
  SC: "Africa",
  SD: "Africa",
  SE: "Europe",
  SG: "Asia",
  SH: "Africa",
  SI: "Europe",
  SJ: "Europe",
  SK: "Europe",
  SL: "Africa",
  SM: "Europe",
  SN: "Africa",
  SO: "Africa",
  SR: "South America",
  ST: "Africa",
  SV: "North America",
  SY: "Asia",
  SZ: "Africa",
  TC: "North America",
  TD: "Africa",
  TF: "Antarctica",
  TG: "Africa",
  TH: "Asia",
  TJ: "Asia",
  TK: "Australia",
  TM: "Asia",
  TN: "Africa",
  TO: "Australia",
  TR: "Asia",
  TT: "North America",
  TV: "Australia",
  TW: "Asia",
  TZ: "Africa",
  UA: "Europe",
  UG: "Africa",
  US: "North America",
  UY: "South America",
  UZ: "Asia",
  VC: "North America",
  VE: "South America",
  VG: "North America",
  VI: "North America",
  VN: "Asia",
  VU: "Australia",
  WF: "Australia",
  WS: "Australia",
  YE: "Asia",
  YT: "Africa",
  ZA: "Africa",
  ZM: "Africa",
  ZW: "Africa",
};

export const getLocationGraphData = async (projects) => {
  console.log("P", projects);
  const { projectCities, cities, continents } = await fetchCitiesAndContinents(projects);

  console.log("results, yo", projectCities, cities, continents);
  const linksData = [];
  const center = { fixed: true };

  projectCities.forEach((city, idx) => {
    for (let i = 0; i < cities.length; i++) {
      if (city.name == cities[i].name) {
        linksData.push({
          source: cities[i],
          target: projects[idx],
        });
      }
    }
  });

  cities.forEach((city) => {
    for (let i = 0; i < continents.length; i++) {
      if (city.continent === continents[i].name) {
        linksData.push({
          source: continents[i],
          target: city,
        });
      }
    }
  });

  continents.forEach((continent) => {
    linksData.push({
      source: center,
      target: continent,
    });
  });

  // console.log('ld', linksData)
  return {
    data: linksData,
    continents,
    cities,
    center,
    projects,
  };
  // console.log(linksData)
};

export const fetchCitiesAndContinents = async (projects) => {
  const locationsData = [];
  console.log("projects", projects);
  projects.forEach((project) => {
    let locationData = latLngToCityContinent(project.lat, project.lng);
    locationsData.push(locationData);
  });

  return await formatCitiesAndContinents(locationsData);
};

const formatCitiesAndContinents = async (locationsData) => {
  return Promise.all(locationsData).then((resolvedData, projectIdx) => {
    console.log("locationsData", locationsData);
    console.log("rd", resolvedData, "projectIdx", projectIdx);

    const seenCities = {};
    const seenContinents = {};

    const projectCities = [];
    const cities = [];
    const continents = [];

    resolvedData.forEach((city) => {
      if (city !== undefined) {
        projectCities.push(city);

        if (!seenCities[city.name]) {
          seenCities[city.name] = true;
          cities.push(city);
        }
        if (!seenContinents[city.continent]) {
          seenContinents[city.continent] = true;
          continents.push({ name: city.continent });
        }
      }
    });

    return {
      projectCities,
      cities,
      continents,
    };
  });
};

export const latLngToCityContinent = async (lat, lng) => {
  Geocode.setApiKey("AIzaSyBEKs3aCzKqgrhaZgnNU4ac-SL-IN431uA");
  // if (lat === "31.2304" && lng === '121.4737') {
  //   return {
  //     continent: "Asia",
  //     city: "Shanghai"
  //   }
  // }
  console.log("latLngToCityContinent", "lat=", lat, "lng=", lng);

  try {
    console.log("I will try...");
    const { results } = await Geocode.fromLatLng(lat, lng);
    console.log("results=", results);
    // console.log(results)
    return results.reduce((location, el) => {
      if (
        el.types.includes("postal_code") ||
        (el.types.includes("locality") && el.types.includes("political"))
      ) {
        location.name = el.address_components[1].long_name;
      }
      if (el.types.includes("country")) {
        const countryCode = el.address_components[0].short_name;
        location.continent = countryToContinent[countryCode];
      }

      return location;
    }, {});
  } catch (err) {
    console.log("err", err);
  }
  // console.log(results)
};
