<?php
session_start();
header("Content-Type: application/json");
require_once 'project.php';
$output = array('flag'=>0);
if(isset($_POST['Name']) && isset($_POST['Social_ID'])&& isset($_POST['Photo'])){
    $query = "select * from user_iden where Name = '".$_POST['Name']."' and Social_ID = '".$_POST['Social_ID']."'and Photo = '".$_POST['Photo']."'";
    $res = $conn->query($query);
    if($res->num_rows == 1){
        $_SESSION['Name'] = $_POST['Name'];
        $output['flag'] = 1;


    }


  

}
echo json_encode($output);

?>