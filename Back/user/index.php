<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
require_once __DIR__ . '/../conn.php';
$method = $_SERVER["REQUEST_METHOD"];
function getUsers($conn)
{
    $query = "select * from user_iden";
    $stmt = $conn->query($query);
    $stmt->execute();
    header("Content-type: application/json; charset=utf-8");
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $stmt->fetchAll();
    foreach ($result as &$emp) {
        $emp["Photo"] = base64_encode($emp["Photo"]);
    }
    echo json_encode($result);
}

function postUser($conn)
{
    $query = "insert into user_iden(name, Social_ID, Photo) values(:name, :social, :photo)";
    if (!empty($_FILES["image"]["name"])) {
        // Get file info 
        $fileName = basename($_FILES["image"]["name"]);
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

        // Allow certain file formats 
        $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
        if (in_array($fileType, $allowTypes)) {
            $image = $_FILES['image']['tmp_name'];
            $imgContent = file_get_contents($image);
        }
    } else {
        http_response_code(400);
        exit(0);
    }
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":name", $_POST["name"]);
    $stmt->bindParam(":social", $_POST["social_id"]);
    $stmt->bindParam(":photo", $imgContent);
    if (!$stmt) {
        echo "state is bad";
    }
    echo "before execute";
    $stmt->execute();
    echo "ok";
}

function delete_user($conn)
{
    $id = basename($_SERVER['REQUEST_URI']);
    $query = "delete from user_iden where Social_ID = $id";
    $stmt = $conn->query($query);
    $stmt->execute();
}

switch ($method) {
    case "GET":
        getUsers($conn);
        break;
    case "POST":
        if (isset($_POST["_method"]) && $_POST["_method"] = "delete")
            delete_user($conn);
        else
            postUser($conn);
        break;
    default:
        break;
}
