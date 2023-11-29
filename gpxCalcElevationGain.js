'use strict';

const toGeoJSON = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

/**
 * Returns elevation gain in supplied GPX file. A distinct elevation gain is calculated for
 * each trkseg in the GPX file (most GPX files will have a single trkseg).
 *
 * @param {file} inputFile gpx file
 * @return {number[]} elevation gained in gpx file; distinct elevation is returned for each 
 *  trkseg in the gpx (most gpx files will have a single trkseg); an empty array is returned
 *  in the case of an error
 */
function calculateGpxElevation(inputFile) {

  // parse GPX to GeoJSON and extract coords
  let coords
  try {
    var doc = new DOMParser().parseFromString(inputFile)
    const geoJSON = toGeoJSON.gpx(doc)

    // NOTE: only first feature is read
    const feature = geoJSON.features[0];

    // special handling for GPX files with multiple trkseg (e.g. Gaia creates these if pausing track
    //  recording) which will have their coords and coordTimes concatenated together
    if (feature.geometry.type === 'MultiLineString') {
      return geoJSON.features[0].geometry.coordinates.map((coords) => calculateCoordsElevation(coords))
    }

    // handle normal gpx file with single trkseg
    coords = geoJSON.features[0].geometry.coordinates
    if (coords[0].length < 3) throw 'error - elevation data not supplied - geoCalcLineElevation exiting early'
    return [calculateCoordsElevation(coords)]

  } catch (e) {
    console.error(e);
  }

  return []
}

/**
 * Returns elevation for supplied coordinates. 
 *
 *  Calculation outlined here: https://www.gpsvisualizer.com/tutorials/elevation_gain.html
 * 
 * @param {array} coords array of gps coordinates (array of arrays)
 * @return {number} elevation gained for suplied coordates
 */
function calculateCoordsElevation(coords) {
  // loop through coords and tally elevation gain
  let elevationGain = 0
  coords.forEach( (coord, index) => {
    if (index == coords.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference = coords[index+1][2] - coords[index][2]
    if (elevationDifference > 0) elevationGain += elevationDifference
  })

  return elevationGain
}

module.exports = {
  calculateGpxElevation,
  calculateCoordsElevation
}