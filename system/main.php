<?php 

require ("db.php");

if (isset($_POST['age_post']) && isset($_POST['gen_post']) && isset($_POST['count_post']) && isset($_POST['lan_post']) ) {

    $age = $_POST['age_post'];
        if ($_POST['age_post'] == 'no')
            $age = '!= \'null\'';
        else
            $age = '<= '.$age.'';

    $gen = $_POST['gen_post'];
        if ($_POST['gen_post'] == 'no')
            $gen = '!= \'null\'';
        else
            $gen = '= \''.$gen.'\'';

    $count = $_POST['count_post'];
        if ($_POST['count_post'] == 'no')
            $count = '!= \'null\'';
        else
            $count = '= \''.$count.'\'';

    $lan = $_POST['lan_post'];
        if ($_POST['lan_post'] == 'no')
            $lan = '!= \'null\'';
        else
            $lan = '= \''.$lan.'\'';
    
    $start = $_POST['start_post'];

    $query = "SELECT * FROM mult WHERE max_age ".$age." AND gen ".$gen." AND lang ".$lan." AND country ".$count." LIMIT ".$start.",10";

}    
    
else if ($_POST['getfavorite'] == true) {
    
    $ids = $_POST['idsfavorite'];
    $ids = substr($ids, 1, -1);
    
    $query = "SELECT * FROM mult WHERE id IN (".$ids.")";
}

$result = mysql_query ($query) or die (mysql_error());

$outp = "[";
while ($row = mysql_fetch_array($result)) {
    if ($outp != "[") { $outp .= ","; }
    $outp .= '{"id":"'.$row["id"].'",';
    $outp .= '"name":"'.$row["name"].'",';
    $outp .= '"max_age":"'.$row["max_age"].'",';
    $outp .= '"gender":"'.$row["gen"].'",';
    $outp .= '"lang":"'.$row["lang"].'",';
    $outp .= '"country":"'.$row["country"].'",';
    $outp .= '"link":"'.$row["link"].'"}';
}
$outp .= "]";
echo $outp;

?>