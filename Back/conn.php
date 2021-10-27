<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$hostname="127.0.0.1";
$username="root";
$password= "";
$database = "reg_user";
$conn;
try{
  $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
}
   
   
   
   
      
?>

<?php
?>