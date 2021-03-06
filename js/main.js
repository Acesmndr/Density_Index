var flag=0,a;
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
	$.ajax({
        	url: "assets/nepal-district.geojson.packed",
		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
			var minifyr=new GeojsonMinifier({precision:6});
			t1=minifyr.unpack(data);
			t1=$.parseJSON(t1);
			for(i=0;i<75;i++){
			t1.features[i].geometry.coordinates[0][0][0]=Math.floor(t1.features[i].geometry.coordinates[0][0][0] * 1000000) / 1000000;
			t1.features[i].geometry.coordinates[0][0][1]=Math.floor(t1.features[i].geometry.coordinates[0][0][1] * 1000000) / 1000000;
			}
        		map.data.addGeoJson(t1);
			districtPercentage();
  		}
       		});	
  //});

  // Set mouseover event for each feature.
  map.data.addListener('mouseover', function(event) {
	if(flag==1){
		return;
	}
	map.data.overrideStyle(event.feature, {fillOpacity: 0});
	//map.data.overrideStyle(event.feature, {fillColor: 'Green'});
	districtLandInfo(event.feature.getProperty('DISTRICT'));
	//}	
    /*document.getElementById('info-box').textContent =event.feature.getProperty('DISTRICT');*/
       });
  map.data.addListener('mouseout', function(event) {
	if(flag==1){
		return;
	}
	map.data.overrideStyle(event.feature, {fillOpacity: 0.3});	
	//map.data.overrideStyle(event.feature, {fillColor: 'Red'});
    });	
  map.data.addListener('click', function(event) {
    districtItem(event.feature.getProperty('DISTRICT'));	
    map.setCenter(event.latLng);
    map.setZoom(9);
    flag=1;
    map.data.setStyle({fillColor:"rgba(0,0,0,0)"});
    		
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
 
