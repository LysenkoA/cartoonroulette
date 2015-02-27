<?php

require ('db.php');

function generateRandString($length){
    $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
    $numChars = strlen($chars);
    $string = '';
    for ($i = 0; $i < $length; $i++) {
        $string .= substr($chars, rand(1, $numChars) - 1, 1);
    }
    return $string;
}

if ($_POST['action'] == "registration") {

    $name = $_POST['name'];
    $pass = md5($_POST['pass']);
    $email = $_POST['email'];
    $uniq_id = generateRandString(20);
    
    $result = mysql_query("SELECT * FROM users WHERE name = '".$name."'");
    
    if (mysql_num_rows($result) > 0) {
        echo "false";
    } else {
        mysql_query("INSERT INTO users (name, pass, email, uniq_id) VALUES ('".$name."', '".$pass."', '".$email."', '".$uniq_id."')");
        echo '{"name": "'.$name.'", "id": "'.$uniq_id.'"}';
    }    
}

if ($_POST['action'] == "login") {

    $name = $_POST['login'];
    $pass = md5($_POST['pass']);
    
    $res = mysql_query("SELECT * FROM users WHERE name = '".$name."' AND pass='".$pass."'");
    
    if (mysql_num_rows($res) > 0) {
        $uniq_id = generateRandString(20);
        mysql_query("UPDATE users SET uniq_id='".$uniq_id."' WHERE name = '".$name."'");
        
        $user_role = mysql_fetch_assoc($res);
        $role = $user_role['role'];
        echo '{"name": "'.$name.'", "id": "'.$uniq_id.'", "role": "'.$role.'"}';
    } else {
        echo "false";
    }    
}


?>