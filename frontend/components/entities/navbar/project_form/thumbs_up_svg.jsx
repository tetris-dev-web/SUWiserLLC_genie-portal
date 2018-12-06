import React from 'react';

const thumbLineStyles = {
  stroke:          'black',
  strokeWidth:    762,
  strokeLinecap:  'round',
  strokeLinejoin: 'round',
  fill:            'none'
};

const thumbStyles = {
  shapeRendering: 'geometricPrecision',
  imageRendering: 'optimzedQuality'
};

const ThumbsUp = () => {
  return(
    <svg style={thumbStyles}
         viewBox="0 0 50800 63500"
         x="0px"
         y="0px"
         fillRule="evenodd"
         clipRule="evenodd">
      <g>
        <path style={thumbLineStyles} d="M12279 21966c0,6327 0,12653 0,18980"/>
        <path style={thumbLineStyles} d="M12279 21966c680,-346 1359,-693 2283,-1385 924,-694 2093,-1733 3486,-3293 1393,-1559 3010,-3638 3934,-5486 924,-1849 1155,-3466 1387,-4794 230,-1328 461,-2368 923,-3061 462,-693 1156,-1039 2138,-1097 981,-58 2252,173 3234,635 981,462 1675,1155 2137,1964 461,808 693,1732 808,2771 115,1040 115,2195 0,3235 -115,1040 -347,1963 -693,2830 -347,866 -809,1675 -1039,2137 -232,462 -232,578 57,693 289,116 867,231 2195,289 1328,57 3408,57 4794,173 1386,116 2079,346 2714,751 635,404 1213,982 1617,1617 404,635 636,1328 751,2021 115,693 115,1387 0,2022 -115,635 -347,1213 -520,1617 -173,404 -289,635 -289,924 0,289 116,635 231,982 116,347 232,693 232,1040 0,346 -116,693 -232,1039 -115,347 -231,693 -404,1155 -173,462 -404,1040 -520,1560 -115,519 -115,982 -115,1501 0,520 0,1098 -58,1560 -58,462 -173,808 -347,1212 -173,405 -404,867 -577,1213 -173,347 -289,578 -404,924 -116,347 -231,809 -289,1271 -58,462 -58,924 -231,1501 -173,578 -520,1271 -1039,1906 -520,636 -1213,1214 -2022,1618 -809,404 -1733,635 -3234,693 -1502,58 -3581,-58 -5545,-289 -1963,-231 -3812,-578 -5717,-1097 -1906,-520 -3870,-1213 -5603,-1849 -1467,-538 -2767,-1034 -4043,-1523"/>
      </g>
    </svg>

  );
};
export default ThumbsUp;