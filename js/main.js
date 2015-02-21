var map,t1;
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.HYBRID,	
    draggable: false,
    zoom: 7,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,	
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
  /*google.maps.event.addListener(map, 'dragend', function() {
                if (strictBounds.contains(map.getCenter())) return;

                // We're out of bounds - Move the map back within the bounds
                var c = map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = 89.637451171875,
                maxY = 31.784216884487382,
                minX = 77.93701171875,
                minY =  25.383735254706867;

                if (x < minX) x = minX;
                if (x > maxX) x = maxX;
                if (y < minY) y = minY;
                if (y > maxY) y = maxY;

                map.setCenter(new google.maps.LatLng(y, x));
            });*/		
}

google.maps.event.addDomListener(window, 'load', initialize);
function column(dName){
$(function () {
    $('#container').highcharts({
         chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Land Use Pattern of '+dName,
		
            },
	    subtitle:{
		text: 'Source:data.opennepal.net'
		},
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
			format: '<b>{point.name} :</b>{point.y}',//: {point.percentage:.1f} %',
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    {
                        name: 'a',
                        y: 12.8,
                       /* sliced: true,
                        selected: true*/
                    },
                    {
                        name: 'b',
                        y: 12.8,
                          },
                    {
                        name: 'c',
                        y: 2.8,
                       },
                    {
                        name: 'd',
                        y: 32.8,
                     },
                    {
                        name: 'Chrome',
                        y: 22.8,
                        },
                    ['Others',   0.7]
                ]
            }]
    });
});
} 
