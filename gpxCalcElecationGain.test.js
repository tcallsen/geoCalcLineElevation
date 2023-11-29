'use strict';

const assert = require('assert')

// load dependencies 
const { calculateGpxElevation, calculateCoordsElevation } = require('./gpxCalcElevationGain.js')
const fs = require('fs')

test('elevation from gpx file', () => {
  const sampleFile = fs.readFileSync('./sample_data/Sample_Joaquin_Miller.gpx', 'utf8')
  const elevation = calculateGpxElevation( sampleFile )
  assert.deepEqual(elevation, [172.90000000000026])
});

test('elevation from gpx file with multiple trkseg', () => {
  const sampleFile = fs.readFileSync('./sample_data/sierra-nf-day-2-full.gpx', 'utf8')
  const elevation = calculateGpxElevation( sampleFile )
  assert.deepEqual(elevation, [597.2168945312503, 3361.8394775390625])
});

test('elevation from coords array', () => {
  const coords = JSON.parse(fs.readFileSync('./sample_data/Sample_Joaquin_Miller_coords.json', 'utf8'))
  const elevation = calculateCoordsElevation( coords )
  assert.deepEqual(elevation, 172.90000000000026)
});