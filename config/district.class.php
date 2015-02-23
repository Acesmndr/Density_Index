<?php


class district
{
        public $db;
        public $conn;   //database connection
        public $connected = FALSE;

        public $district_name;
        public $district_exists;        //TRUE OR FALSE

        public function __construct($d_name){
                $this->db = new database_class();
                        $this->conn = $this->db->db_conn;
                        if( isset($this->conn)){
                                $this->connected = TRUE;
                        }else{
                                die("ERROR :".mysql_error());
                        }

                $this->set_district($d_name);
                $this->check_district();
        }

        public function check_district(){
                $sql = "SELECT COUNT(District) as district_exists FROM District_Population WHERE District='{$this->district_name}';";
                $retval = mysql_query($sql,$this->conn);

                if( !$retval){
                        die("ERROR :".mysql_error());
                }

                while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
                        if($row['district_exists'] > 1){
                                $this->district_exists = TRUE;
                        }else{
                                $this->district_exists = FALSE;
                        }
                }
        }

        public function set_district($x){
                $this->district_name = $x;
        }
}

