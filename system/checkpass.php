<?php

if (isset ($_COOKIE['userId']) && isset($_COOKIE['userName'])) {

    require ('./system/db.php');
    
    $admin_name = $_COOKIE['userName'];
    $admin_u_id = $_COOKIE['userId'];
    
    $res = mysql_query("SELECT role, uniq_id FROM users WHERE name = '".$admin_name."'") or die (mysql_error());
    $admin_data = mysql_fetch_assoc($res);
    
    if ($admin_data['role'] = 'admin' && $admin_data['uniq_id'] == $admin_u_id) {
        return true;
    }
    else {
        header("Location:registration.php");
        echo "data";
    }
}

else {
    header("Location:registration.php");
    //exit();
}

?>