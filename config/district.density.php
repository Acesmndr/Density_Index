<?php

include 'database.class.php';

class district_density
{
	public $db;
	public $conn;
	public $connected = FALSE;

	public $main_array = array();		// [ ["District1","pop_density"], ["District2","pop_density"]]
	public $temp_array = array();		// ["District1","pop_density"]

	public function __construct(){
		$this->db = new database_class();
		$this->conn = $this->db->db_conn;
		if( isset($this->conn)){
			$this->connected = TRUE;
		}else{
			die("ERROR :".mysql_error());
		}
		
		$this->fetch_density();
	}
		
	public function fetch_density(){
		$sql = "SELECT * FROM District_Population WHERE Category ='Population Density (';";
		$retval = mysql_query($sql,$this->conn);
		if( !$retval ){
			die("ERROR :".mysql_error());
		}
		
		while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
			$this->construct_temp_array($row['District'],$row['Value']);
		}
			
		echo json_encode($this->main_array);
	}		
		
	public function construct_temp_array($district,$density){
		array_push($this->temp_array,$district);
		array_push($this->temp_array,$density);	
	
		
		array_push($this->main_array,$this->temp_array);
			
		$this->temp_array = array();
	}		
		
	
}

$a = new district_density();
	
