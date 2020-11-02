// Goal - Get landsat histograms for all dates within custom ROI.
/* Steps
*  1. Get lake offshore geometry (in this case a 3.5 m isobat from MBGov)
*  2. Get dates of interest (ice free season)
*/

var date_0 = '2011-01-01';
var date_1 = '2020-11-02';

var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterDate(ee.Date(date_0),ee.Date(date_1))
  .select('B[1-3]');
//var collection = ee.ImageCollection('LANDSAT/LC8_SR').filterDate(ee.Date('2015-01-01'),ee.Date('2015-12-31'));

var L227 = geometry;
//var PellyNonHarvested = geometry2;

// var ELAsubwatersheds = ee.FeatureCollection('ft:16RfV0Igg4HyPZoIVYKWvbyL1tZ7GVdQvNNY2vZLN');

// selection of ImageCollection is key.  Some collections that I thought were processed to SR
// Aren't actually, so I need to ensure the numbers are coming out as reflectances.  
// Potential Collections 'LANDSAT/LC8_L1T_TOA' , 'LANDSAT/LC8_SR'
//var landsat8_B5 = ee.ImageCollection('LANDSAT/LC8_SR')
//    .filterDate('2013-05-10', '2013-08-30')
//    .select('B[5]');

//var landsat8_B4 =ee.ImageCollection('LANDSAT/LC8_SR')
//filterDate('2015-05-10', '2015-08-30')
//    .select('B[4]');
    
var landsat8QA = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate(ee.Date(date_0),ee.Date(date_1))
    .select('pixel_qa');
    
//deal with this.

var LakeTimeSeries = ui.Chart.image.series(collection, geometry, ee.Reducer.mean(), 30);
print(LakeTimeSeries);
var LakeTimeQA = ui.Chart.image.series(landsat8QA, geometry, ee.Reducer.mode(), 30);
print(LakeTimeQA);
//print("ELA_subwatersheds");
//print(Chart.image.series(collection, ELAsubwatersheds, ee.Reducer.median(), 30));
//print(Chart.image.histogram(
//print(Chart.image.series(landsat8QA, ELAsubwatersheds, ee.Reducer.mode(), 30));

// insert QA test here to remove clouds (and cloud shadows) and sun glint, and ...
//var landsat8SRstat = landsat8SR.mean();

// Make a feature without geometry and set the properties to the dictionary of means.


// Export Section
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
//Map.addLayer(ELAsubwatersheds);

//Map.setCenter(-93.722934, 49.66210, 15);

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