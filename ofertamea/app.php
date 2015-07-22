<?php
    include 'app/app.html';
    require_once("HttpClient.class.php");
    $markets = HttpClient::quickGet("http://marklog.alphaappers.com/markets/list");
    $catalogs = HttpClient::quickGet("http://marklog.alphaappers.com/catalogs/list/active");
?>

<script type="text/javascript">
    var markets = <?echo $markets?>,
        catalogs = <?echo $catalogs?>;
</script>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-57912805-1', 'auto');
    ga('send', 'pageview');

</script>
