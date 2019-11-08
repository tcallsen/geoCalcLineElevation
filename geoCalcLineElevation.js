'use strict';

const toGeoJSON = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

// Node module creation tutorial:
//  https://codeburst.io/how-to-create-and-publish-your-first-node-js-module-444e7585b738

/**
 * Adds commas to a number
 * @param {file} inputFile
 * @return {number} calculated elevation gain
 */
module.exports = function(inputFile) {
  console.log('geoCalcLineElevation executed')  

  // parse GPX to GeoJSON
  var doc = new DOMParser().parseFromString(inputFile)
  const geoJSON = toGeoJSON.gpx(doc)

  console.log(geoJSON)

   //return geoJson

}
