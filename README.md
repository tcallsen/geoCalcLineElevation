# Elevation Gain in GPX files 
Calculates the total elevation gain for GPX routes. Elevation data must be supplied in the GPX file (no external Elevation APIs are used in this calculation).

The final result is in the same units as the original source data.. likely meters if sourced from Strava.

For more information on the calculation used, see [this article](https://www.gpsvisualizer.com/tutorials/elevation_gain.html "this article").

## Installing with NPM

```
npm i --save gpx-calc-elevation-gain
```

## Example
```
// load dependencies 
const gpxCalcElevationGain = require('gpx-calc-elevation-gain')
const fs = require('fs')

// open sample file
const sampleFile = fs.readFileSync('./sample_data/Sample_Joaquin_Miller.gpx', 'utf8')

// calculate elevation (in same units as source data)
const elevation = gpxCalcElevationGain( sampleFile )

console.log('Calculated elvation gain: ' + elevation + ' (m)')
```