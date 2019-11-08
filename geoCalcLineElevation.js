'use strict';

const toGeoJSON = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

/**
 * Returns elevation gain in supplied GPX file. 
 *  Calculation outlined here: https://www.gpsvisualizer.com/tutorials/elevation_gain.html
 * 
 * @param {file} inputFile
 * @return {number} elevationGain, in same unit as source data
 *
 */
module.exports = function(inputFile) {

  // parse GPX to GeoJSON and extract coords
  let coords
  try {
    var doc = new DOMParser().parseFromString(inputFile)
    const geoJSON = toGeoJSON.gpx(doc)
    coords = geoJSON.features[0].geometry.coordinates
    if (coords[0].length < 3) throw 'error - elevation data not supplied - geoCalcLineElevation exiting early'
  } catch (e) {
    console.error(e);
    return -1 // exit if error parsing inputFile
  }
  
  // loop through coords and tally elevation gain
  let elevationGain = 0
  coords.forEach( (coord, index) => {
    if (index == coords.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference = coords[index+1][2] - coords[index][2]
    if (elevationDifference > 0) elevationGain += elevationDifference
  })

  return elevationGain

}
