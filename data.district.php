<?php
	
include 'config/database.class.php';
include 'config/district.class.php';
include 'config/data.district.class.php';



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


