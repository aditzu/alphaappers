<?php
    include 'app/app_test.html';
    require_once("HttpClient.class.php");
    $markets = HttpClient::quickGet("http://marklog.alphaappers.com/markets/list");
    $catalogs = HttpClient::quickGet("http://marklog.alphaappers.com/catalogs/list/active");
?>

<script type="text/javascript">
    var markets = <?echo $markets?>,
        catalogs = <?echo $catalogs?>;
</script>