<?php
	
include 'database.class.php';
include 'ratio.class.php';


if( isset($_GET['district'])){
$a = new ratio($_GET['district']);
}else{
	echo "no district selected";
}

		

