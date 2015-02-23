<?php


class data_district
{
        public $db;

        public $district_name;

        public $tfa;
        public $shrub;
        public $ag_land;
        public $water_bodies;
        public $barren_land;
        public $snow;
        public $others;


        public function __construct($d_name){
                $this->district_name = $d_name;
                $this->fetch_data();
                $this->create_json();
        }


        public function fetch_data(){
                $count = 0;
                $db = new database_class();

                $sql = "SELECT * FROM Land_Pattern WHERE District='{$this->district_name}';";
                $retval = mysql_query($sql,$db->db_conn);

                while($row = mysql_fetch_array($retval,MYSQL_ASSOC)){
                        switch($count){
                                case 0: $this->tfa = $row['Area'];
                                        ++$count;
                                        break;
                                case 1: $this->shrub= $row['Area'];
                                        ++$count;
                                        break;
                                case 2: $this->ag_land = $row['Area'];
                                        ++$count;
                                        break;
                                case 3: $this->water_bodies = $row['Area'];
                                        ++$count;
                                        break;
                                case 4: $this->barren_land = $row['Area'];
                                        ++$count;
                                        break;
                                case 5: $this->snow = $row['Area'];
                                        ++$count;
                                        break;
                                case 6: $this->others= $row['Area'];
                                        ++$count;
                                        break;
                        }
                }
        }


        public function create_json(){
                $outputarray = array();

                $r1 = array();
                array_push($r1,"total forest area");
                array_push($r1,$this->tfa);

                $r2 = array();
                array_push($r2,"shurb");
                array_push($r2,$this->shrub);

                $r3 = array();
                array_push($r3,"agricultural land");
                array_push($r3,$this->ag_land);

                $r4 = array();
                array_push($r4,"Water Bodies");
                array_push($r4,$this->water_bodies);

                $r5 = array();
                array_push($r5,"Barren Land");
                array_push($r5,$this->barren_land);

                $r6 = array();
                array_push($r6,"Snow");
                array_push($r6,$this->snow);

                $r7 = array();
                array_push($r7,"Others");
                array_push($r7,$this->others);



                array_push($outputarray,$r1);
                array_push($outputarray,$r2);
                array_push($outputarray,$r3);
		array_push($outputarray,$r4);
                array_push($outputarray,$r5);
                array_push($outputarray,$r6);
                array_push($outputarray,$r7);
                echo json_encode($outputarray);
        }

}


                                                    
