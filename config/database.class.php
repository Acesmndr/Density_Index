<?php

include 'db.config.php';

class database_class
{
	public $DB_HOST = DB_HOST;
	public $DB_PASSWORD = DB_PASSWORD;
	public $DB_USER = DB_USER;
	public $DB_NAME = DB_NAME;
	
	public $db_connected = false;
	
	public $db_conn;	

	public function __construct(){
	//	echo "database_class constructor";
		$this->connect();
	}
	
	public function connect(){
		if(! $this->db_connected ){
			$this->db_conn = mysql_connect($this->DB_HOST,$this->DB_USER,$this->DB_PASSWORD);
			if(! $this->db_conn ){
				die("ERROR: ". mysql_error());
			}else{
				$select_DB = mysql_select_db($this->DB_NAME,$this->db_conn);
					if( !$select_DB){
						die("ERROR: ".mysql_error());
					}
				$this->db_connected = true;
			}
			
		}else{					//connection already established
		 	return true;
		}
	}
}

	

