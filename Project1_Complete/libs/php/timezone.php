<?php

$executionStartTime = microtime(true) / 1000;

//$url = "http://api.geonames.org/postalCodeLookupJSON?postalcode=bs31hf&country=GB&username=flightltd";

//$url = 'http://api.geonames.org/postalCodeLookupJSON?postalcode='.$_REQUEST['postalcode'].'&country=GB&username=flightltd';

//$url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=GB&username=flightltd&style=full';

$url = 'http://api.geonames.org/timezoneJSON?formatted=true&lat='.$_REQUEST['lat'].'&lng='.$_REQUEST['lng'].'&username=flightltd&style=full';

$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL,$url);

$result=curl_exec($curl);

curl_close($curl);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "Timezone Check";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>