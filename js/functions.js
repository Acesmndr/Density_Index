var d={
	'KATHMANDU':123,
	'DOLAKHA':231,
	'JHAPA':345
};
var sss;
function districtLandInfo(dName){
		$.ajax({
			 url: "config/data.district.php/?district="+dName,
			 dataType: 'json',
        		 type: 'GET',
        		success: function (data) {
					a=data;	
					console.log(dName," ",a);
					for(var i=0;i<a.length;i++){
						a[i][1]=parseInt(a[i][1]);
					}
					console.log(a);
					if((a[0][1]==undefined)||(a[1][1]==undefined)){
						$('#container').text("No Data Available");
						return;
					}
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
                				pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
            					},
            				plotOptions: {
                				pie: {
                    					allowPointSelect: true,
                 					cursor: 'pointer',
                    					dataLabels: {
                        				enabled: true,
							format: '<b>{point.y}</b>',//: {point.percentage:.1f} %',
                    					},
                    				showInLegend: true
                				}
            				},
            				series: [{
                				type: 'pie',
                				name: 'Browser share',
                				data: a
            					}]
					    });
					});				
				//});
			}
		});
	}
function districtPercentage(){
		$.ajax({
			 url: "config/district.density.php",
			 dataType: 'json',
        		 type: 'GET',
			 success: function (data) {
					var popn=new Array();
					var dist={};
					a=data;
					for(i=0;i<a.length;i++){
							a[i][1]=parseInt(a[i][1]);
							a[i][0]=a[i][0].toUpperCase().slice(0,a[i][0].length-1);
							popn.push(a[i][1]);
							
							//dist.push(parseInt(a[i][1]));	
						}
					var maxm=Math.max.apply(Array,popn);
					for(i=0;i<a.length;i++){
							dist[a[i][0]]=popn[i]/maxm*1000;
							console.log(dist[a[i][0]]);
					}
					sss=dist;
					map.data.setStyle(function(feature) {
							var temp=feature.getProperty("DISTRICT");
							console.log(temp, dist[temp]);
							if(dist[temp]>90){
								clr="Red";
							}else{
								if(dist[temp]>50){
								clr="#e65100";
								}else{
								if(dist[temp]>30){
									clr="Pink"
								}else{
								if(dist[temp]>20){
									clr="#76ff03"
								}else{	
									clr="Green"
									}
								}
								}
							}
						    return /** @type {google.maps.Data.StyleOptions} */({
						      fillColor:clr,// feature.getProperty('color'),
						      strokeWeight: 1.2,
						      strokeOpacity: 1	
						    });	
			});
		}
		});
}
