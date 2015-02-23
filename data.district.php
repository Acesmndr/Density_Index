<?php
	
include 'database.class.php';
include 'district.class.php';
include 'data.district.class.php';



if( isset($_GET['district'])){
	$district = new district($_GET['district']);

	if( $district->district_exists){
		$data = new data_district($district->district_name);
	}else{
		echo "no district ";
	}
		
}else{
	echo "NO INPUT";
}



