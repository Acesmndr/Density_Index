var map,t1;
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.HYBRID,	
    zoom: 7,
    center: {lat: 28.05259082333986, lng: 84.1552734375}
  });

  // Load GeoJSON.
  map.data.loadGeoJson('assets/nepal-district.geojson');

  // Add some style.
  map.data.setStyle(function(feature) {
	var clr="Red";
	//console.log(feature.getProperty("DISTRICT"));
	if(feature.getProperty("DISTRICT")=="KATHMANDU")
		clr="White";
	if(feature.getProperty("DISTRICT")=="KAPILBASTU")
		clr="Pink";
    return /** @type {google.maps.Data.StyleOptions} */({
      fillColor:clr,// feature.getProperty('color'),
      strokeWeight: 1.2,
      strokeOpacity: 1	
    });
  });

  // Set mouseover event for each feature.
  map.data.addListener('mouseover', function(event) {
	console.log(event);
	map.data.overrideStyle(event.feature, {fillColor: 'Green'});
	column(event.feature.getProperty('DISTRICT'));	
    /*document.getElementById('info-box').textContent =event.feature.getProperty('DISTRICT');*/
       });
  map.data.addListener('mouseout', function(event) {
	map.data.overrideStyle(event.feature, {fillColor: 'Red'});
    });	
  map.data.addListener('click', function(event) {
    console.log(event.latLng);
    map.setCenter(event.latLng);
    map.setZoom(10);
  });	
}

google.maps.event.addDomListener(window, 'load', initialize);
function column(dName){
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: dName
        },
        subtitle: {
            text: 'Source: data.openNepal.net'
        },
        xAxis: {
            categories: [
                'Shrub',
                'Agricultural',
                'Water-Bodies',
                'Barren Land',
                'Snow'
                ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Districtwise Land Use Pattern'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Water',
            data: [49.9, 71.5, 106.4, 129.2, 144.0]

        }, {
            name: 'Bla',
            data: [83.6, 78.8, 98.5, 93.4, 106.0]

        }, {
            name: 'Blab',
            data: [48.9, 38.8, 39.3, 41.4, 47.0]

        }, {
            name: 'Ras',
            data: [42.4, 33.2, 34.5, 39.7, 52.6]

        }]
    });
});
} 
