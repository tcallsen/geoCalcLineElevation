
// load dependencies 
const gpxCalcElevationGain = require('./gpxCalcElevationGain.js')
const fs = require('fs')

// open sample file
const sampleFile = fs.readFileSync('./sample_data/Sample_Joaquin_Miller.gpx', 'utf8')

// calculate elevation (in same units as source data)
const elevation = gpxCalcElevationGain( sampleFile )

console.log('Calculated elvation gain: ' + elevation + ' (m)')
