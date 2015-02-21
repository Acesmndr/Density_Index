<?php
	
include 'database.class.php';

class ratio
{
	public $db;
	public $conn;
	public $connected = FALSE;

	public $district;	
	
	public $geo_area;
	public $agri_land;
	public $pop_density;

	public function __construct($district){
	
		$this->district = $district;
		
		$this->db = new database_class();
		$this->conn = $this->db->db_conn;
	
		if( isset($this->conn )){
			$this->connected = TRUE;
		}else{
			die("ERROR :".mysql_error());
		}
		
		$this->fetch_geoarea();
		$this->fetch_agri_land();
		$this->fetch_popdensity();
	
		$this->send_json();

	}
	
	public function fetch_geoarea(){
		$sql = "SELECT * FROM District_Population where District='{$this->district}' AND Category='Geographical Area (s'";
		$retval = mysql_query($sql,$this->conn);
		
		while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
			$this->geo_area = $row['Value'];
		}
	}
		
	public function fetch_agri_land(){
		$sql = "SELECT * FROM Land_Pattern where District='{$this->district}' AND Types='Shrub'";
		$retval = mysql_query($sql,$this->conn);
		
		while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
			$this->agri_land = $row['Area'];
			
			$this->agri_land = $this->agri_land * 0.01;
		}
	}
	
	public function fetch_popdensity(){
		$sql = "SELECT * FROM District_Population where District='{$this->district}' AND Category='Population Density (';";
		$retval = mysql_query($sql,$this->conn);
		if( !$retval){
			die("ERROR:".mysql_error());
		}
		
		while( $row= mysql_fetch_array($retval,MYSQL_ASSOC)){
			$this->pop_density = $row['Value'];
		}
	}
	public function send_json(){
		$output = array();
		array_push($output,$this->geo_area);
		array_push($output,$this->agri_land);
		array_push($output,$this->pop_density);
		echo json_encode($output);
	}
	
}

if( isset($_GET['district'])){
$a = new ratio($_GET['district']);
}else{
	echo "no district selected";
}

		

