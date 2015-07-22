<?php
    require_once('HttpClient.class.php');
    $catalog_id = $_GET['id'];
    header("Content-Type: application/json");
    echo HttpClient::quickGet('http://marklog.alphaappers.com/pages/'.$catalog_id);
?>
