var d={
	'KATHMANDU':123,
	'DOLAKHA':231,
	'JHAPA':345
}
function districtLandInfo(dName){
		$.ajax({
			 url: "config/data.district.php/?district="+dName,
			 dataType: 'json',
        		 type: 'GET',
        		success: function (data) {
					a=data;					
				//});
			}
		});
	}
function districtPercentage(dName){
		
}
