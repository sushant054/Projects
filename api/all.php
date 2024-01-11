login.php
<?php
    session_start();
    include("connection.php");

    $mobile = $_POST['mob'];
    $pass = $_POST['pass'];
    $role = $_POST['role'];

    $check = pg_query($connect, "select * from user where mobile='$mobile' and password='$pass' and role='$role' ");

    if(pg_num_rows($check)>0){
        $getGroups = pg_query($connect, "select name, photo, votes, id from user where role=2 ");
        if(pg_num_rows($getGroups)>0){
            $groups = pg_fetch_all($getGroups, PGSQL_ASSOC);
            $_SESSION['groups'] = $groups;
        }
        $data = pg_fetch_array($check);
        $_SESSION['id'] = $data['id'];
        $_SESSION['status'] = $data['status'];
        $_SESSION['data'] = $data;
        echo '<script>
                window.location = "../routes/dashboard.php";
            </script>';
    }
    else{
        echo '<script>
                alert("Invalid credentials!");
                window.location = "../";
            </script>';
    }
?>
connection.php 
<?php
$host = "localhost";
$port = "5432";
$dbname = "voting";
$user = "your_username";
$password = "your_password";

$connect = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password") or die("Connection failed!");

echo "hi";
?>
register.php 
<?php
    include("connection.php");

    $name = $_POST['name'];
    $mobile = $_POST['mob'];
    $pass = $_POST['pass'];
    $cpass = $_POST['cpass'];
    $add = $_POST['add'];
    $image = $_FILES['image']['name'];
    $tmp_name = $_FILES['image']['tmp_name'];
    $role = $_POST['role'];

    if($cpass!=$pass){
        echo '<script>
                alert("Passwords do not match!");
                window.location = "../routes/register.php";
            </script>';
    }
    else{
        move_uploaded_file($tmp_name,"../uploads/$image");
        $insert = pg_query($connect, "insert into user (name, mobile, password, address, photo, status, votes, role) values('$name', '$mobile', '$pass', '$add', '$image', 0, 0, '$role') ");
        if($insert){
            echo '<script>
                    alert("Registration successfull!");
                    window.location = "../index.php";
                </script>';
        }
    }
?>
vote.php 
<?php
    session_start();
    include("connection.php");

    $votes = $_POST['gvotes'];
    $total_votes= $votes+1;
    $gid = $_POST['gid'];
    $uid = $_SESSION['id'];

    $update_votes = pg_query($connect, "update user set votes='$total_votes' where id='$gid'");
    $update_status = pg_query($connect, "update user set status=1 where id='$uid'");

    if($update_status and $update_votes){
        $getGroups = pg_query($connect, "select name, photo, votes, id from user where role=2 ");
        $groups = pg_fetch_all($getGroups, PGSQL_ASSOC);
        $_SESSION['groups'] = $groups;
        $_SESSION['status'] = 1;
        echo '<script>
                    alert("Voting successfull!");
                    window.location = "../routes/dashboard.php";
                </script>';
    }
    else{
        echo '<script>
                    alert("Voting failed!.. Try again.");
                    window.location = "../routes/dashboard.php";
                </script>';
    }
?>
