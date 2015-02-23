<?php
	
include 'config/database.class.php';
include 'config/ratio.class.php';


if( isset($_GET['district'])){
$a = new ratio($_GET['district']);
}else{
	echo "no district selected";
}

		

