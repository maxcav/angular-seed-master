<?php

$json = file_get_contents("http://data.bter.com/api/1/trade/btc_cny");
$data = json_decode($json,true);


header('Content-type: application/json; charset: utf-8');

 print(json_encode($data));