<?php
function setJson($coinValue) {
	$jsonValue = "https://data.bter.com/api/1/trade/";
	$jsonValue .= $coinValue;
	$json = file_get_contents($jsonValue);
	$data = json_decode($json,true);
	$data["externalServer"] = $jsonValue;


	header('Content-type: application/json; charset: utf-8');
	print(json_encode($data));
}

setJson($_GET["coinValue"]);
