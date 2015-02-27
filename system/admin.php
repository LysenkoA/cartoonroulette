<?php

require ('db.php');

if (isset($_POST['getlist'])) {
	
	$query = "SELECT * FROM mult";

	$result = mysql_query ($query) or die (mysql_error());

    $outp = "[";
	while ($row = mysql_fetch_array($result)) {
		if ($row['gen'] == 'm') {
			$row['gen'] = 'boy';
		} else {
			$row['gen'] = 'girl';
		} 
        if ($row['country'] == 'rus') {
			$row['country'] = 'Russia (USSR)';
		} elseif ($row['country'] == 'usa') {
			$row['country'] = 'USA';
		} elseif ($row['country'] == 'jap') {
			$row['country'] = 'Japan';
		}
        if ($row['lang'] == 'ru') {
			$row['lang'] = 'Russian';
		} else {
			$row['lang'] = 'English';
		}
        
        if ($outp != "[") { $outp .= ","; }
        $outp .= '{"id":"'.$row["id"].'",';
        $outp .= '"name":"'.$row["name"].'",';
        $outp .= '"max_age":"'.$row["max_age"].'",';
        $outp .= '"gender":"'.$row["gen"].'",';
        $outp .= '"lang":"'.$row["lang"].'",';
        $outp .= '"country":"'.$row["country"].'"}';
	} 
    $outp .= "]";
    echo $outp;
}

if (isset($_POST['getusers']) && $_POST['getusers'] == true) {
	$res = mysql_query("SELECT * FROM users") or die (mysql_error());

    $outp = "[";
	while ($row = mysql_fetch_array($res)) {
        if ($outp != "[") { $outp .= ","; }
        $outp .= '{"id":"'.$row["user_id"].'",';
        $outp .= '"name":"'.$row["name"].'",';
        $outp .= '"email":"'.$row["email"].'",';
        $outp .= '"role":"'.$row["role"].'"}';
	} 
    $outp .= "]";
    echo $outp;
}

if ( isset($_POST['deluser']) ) {
    $user_id = $_POST['userid'];
    $query_del = "DELETE FROM users WHERE user_id = '".$user_id."'";
    $res_del = mysql_query ($query_del) or die (mysql_error());
    if ($res_del == 1) { echo $user_id; }
    else { echo $res_del; }
}

if ( isset($_POST['edituser']) ) {
    $cur_id = $_POST['curid'];
    $new_name = $_POST['newname'];
    $new_email = $_POST['newemail'];
    $new_role = $_POST['newrole'];
    
    if ($new_name != "") {
        mysql_query("UPDATE users SET name='".$new_name."' WHERE user_id = '".$cur_id."'") or die (mysql_error());
    }
    
    if ($new_email != "") {
        mysql_query("UPDATE users SET email='".$new_email."' WHERE user_id = '".$cur_id."'") or die (mysql_error());
    }
    
    if ($new_role != "default") {
        mysql_query("UPDATE users SET role='".$new_role."' WHERE user_id = '".$cur_id."'") or die (mysql_error());
    }
    
    echo "ok";
}


if (isset($_POST['addnewuser']) && $_POST['addnewuser'] == 'true') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = md5($_POST['pass']);
    $role = $_POST['role'];

    $query = "INSERT INTO users(name, email, pass, role) VALUES ('".$name."','".$email."','".$pass."','".$role."')";

    $res = mysql_query ($query) or die (mysql_error());

    if ($res == 1) {
        $result = mysql_query ("SELECT user_id FROM users WHERE name = '".$name."' LIMIT 1");
        if (!$result) {
            echo 'Error: ' . mysql_error();
            exit;
        }
        $row = mysql_fetch_row($result);
        echo $row[0];
    }
    else {
        echo $res;
    }    
}



if (isset($_POST['id'])) { // delete cartoon
    $id = $_POST['id'];
    $query = "DELETE FROM mult WHERE id = '".$id."'";
    $res = mysql_query ($query) or die (mysql_error());
    if ($res == 1) {
        echo $id;
    }
    else {
        echo $res;
    }
}


if (isset($_POST['title']) &&  // add cartoon
    isset($_POST['age']) && 
    isset($_POST['gender']) && 
    isset($_POST['country']) && 
    isset($_POST['language']) && 
    isset($_POST['link']) ) {
    
        $title = $_POST['title'];
        $age = $_POST['age'];
        $gender = $_POST['gender'];
        $country = $_POST['country'];
        $language = $_POST['language'];
        $link = $_POST['link'];
    
        $query = "INSERT INTO mult(name, max_age, gen, country, lang, link) VALUES ('".$title."','".$age."','".$gender."','".$country."','".$language. "','".$link."')";
    
        $res = mysql_query ($query) or die (mysql_error());
        
        if ($res == 1) {
            $result = mysql_query ("SELECT id FROM mult WHERE name = '".$_POST['title']."' LIMIT 1");
            if (!$result) {
                echo 'Error: ' . mysql_error();
                exit;
            }
            $row = mysql_fetch_row($result);
            echo $row[0];
        }
        else {
            echo $res;
        }
}
