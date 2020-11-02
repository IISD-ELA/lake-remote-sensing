// Goal - Get landsat histograms for all dates within custom ROI.
/* Steps
*/
//need a var geometry = ...

var date_0 = '2011-01-01';
var date_1 = '2020-11-02';

var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterDate(ee.Date(date_0),ee.Date(date_1))
  .select('B[1-3]');
//var collection = ee.ImageCollection('LANDSAT/LC8_SR').filterDate(ee.Date('2015-01-01'),ee.Date('2015-12-31'));

var L227 = geometry;

    
var landsat8QA = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate(ee.Date(date_0),ee.Date(date_1))
    .select('pixel_qa');
    
//deal with this.

var LakeTimeSeries = ui.Chart.image.series(collection, geometry, ee.Reducer.mean(), 30);
print(LakeTimeSeries);
var LakeTimeQA = ui.Chart.image.series(landsat8QA, geometry, ee.Reducer.mode(), 30);
print(LakeTimeQA);



// Export Section, not operational right now.
/*
var feature = ee.Feature(null, means);

// Wrap the Feature in a FeatureCollection for export.
var featureCollection = ee.FeatureCollection([feature]);

// Export the FeatureCollection.
Export.table.toDrive({
  collection: featureCollection,
  description: 'exportTableExample',
  fileFormat: 'CSV'
});
*/

Map.setCenter(-93.722934, 49.66210, 15);

var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// This will sort from least to most cloudy.
var spatialFiltered = l8.filterBounds(point);
var temporalFiltered = spatialFiltered.filterDate('2015-01-01', '2015-12-31');
var sorted = temporalFiltered.sort('CLOUD_COVER', 'SNOW');
// Get the first (least cloudy) image.
var scene = sorted.first();

print('spatialFiltered', spatialFiltered);


print('temporalFiltered', temporalFiltered);

var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(scene, visParams, 'true-color composite');