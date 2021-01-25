$("#firstRowSubmit").click(postalcodes);
$("#secondRowSubmit").click(findNearbyWeather);
$("#thirdRowSubmit").click(timezone);


function postalcodes() {
    $('#result').html(`<tr><td colspan=3 class="text-center">Searching for Postcode...</td></tr>`);
    console.log("Attempting postalcodes API call...");
    $postCodeRegex = (/[\s\W]/g);

    $.ajax({
        url: "libs/php/postalcodes.php",
        type: 'POST',
        dataType: 'json',
        data: {
            postalcode: $('#postcodeEntry').val().replaceAll($postCodeRegex, ""),
            countrycode: $('#countryCodeEntry').val().replaceAll($postCodeRegex, "")
        },
        success: function (result) {
            if (result.status.name == 'ok') {
                console.log("Postcode API call successful");
                console.log(result);
                try {
                    if (result['data'].length == 0) {
                        $('#result').html(`<tr><td colspan=3 class="text-danger text-center">Postcode not found</td></tr>`);
                        throw "Postcode not found";
                    } else {
                        $('#weatherLng').val(result['data'][0]['lng']);
                        $('#weatherLat').val(result['data'][0]['lat']);

                        $('#timezoneLng').val(result['data'][0]['lng']);
                        $('#timezoneLat').val(result['data'][0]['lat']);

                        $('#result').html(`
                        <tr>
                            <th>Country Code:</th>
                            <td>${result['data'][0]['countryCode']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Postcode:</th>
                            <td>${result['data'][0]['postalcode']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>County:</th>
                            <td>${result['data'][0]['adminName2']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Place Name:</th>
                            <td>${result['data'][0]['placeName']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Longitude:</th>
                            <td>${result['data'][0]['lng']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Latitude:</th>
                            <td>${result['data'][0]['lat']}</td>
                            <td></td>
                        </tr>
                        `);
                    }
                } catch (err) {
                    console.log(`ERROR: ${err}`);
                }
            } else {
                console.log('ERROR: Name check failed')
            }
        },
        error: function () {
            console.log("ERROR: API call failed");
        }
    });
};


function findNearbyWeather() {
    $('#result').html(`<tr><td colspan=3 class="text-center">Searching for Weather...</td></tr>`);
    console.log("Attempting weather API call...");
    $postCodeRegex = (/[\s\W]/g);

    $.ajax({
        url: "libs/php/findNearbyWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lng: $('#weatherLng').val(),
            lat: $('#weatherLat').val()
        },
        success: function (result) {
            if (result.status.name == 'ok') {
                console.log("Weather API call successful");
                console.log(result);
                console.log(`data variable is ${result['data']}`);
                try {
                    if (result['data'] === null) {
                        console.log("Null Data Confirmed");
                        $('#result').html(`<tr><td colspan=3 class="text-center text-danger">Weather coordinates not recognised</td></tr>`);
                        throw "Weather coordinates not recognised"
                    };
                    $('#result').html(`
                        <tr>
                            <th>Temperature:</th>
                            <td>${result['data']['temperature']}°C</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Clouds:</th>
                            <td class="text-capitalize">${result['data']['clouds']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Weather:</th>
                            <td class="text-capitalize">${result['data']['weatherCondition']}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Humidity:</th>
                            <td>${result['data']['humidity']}%</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Wind Speed:</th>
                            <td>${result['data']['windSpeed']}mph</td>
                            <td></td>
                        </tr>
                        `);
                } catch (err) {
                    console.log(`ERROR: ${err}`);
                }
            } else {
                console.log('ERROR: Name check failed')
            }
        },
        error: function () {
            console.log("ERROR: API call failed");
        }
    });
};

function timezone() {
    $('#result').html('Timezone working');
    $('#result').html(`<tr><td colspan=3 class="text-center">Searching for Timezone...</td></tr>`);
    console.log("Attempting timezone API call...");

    $.ajax({
        url: "libs/php/timezone.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lng: $('#timezoneLng').val(),
            lat: $('#timezoneLat').val()
        },
        success: function (result) {
            if (result.status.name === "ok") {
                console.log("Timezone API Call Successful");
                console.log(result);
                try {
                    if (typeof result['data']['status'] !== "undefined") {
                        $('#result').html(`
                    <tr><td colspan=3 class="text-danger text-center text-capitalize">
                    ${result['data']['status']['message']} in Timezone
                    </td></tr>`);
                        throw `${result['data']['status']['message']} in Timezone`;
                    } else {
                        $('#result').html(`
                    <tr>
                        <th>Timezone:</th>
                        <td>${result['data']['timezoneId']}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>CurrentTime:</th>
                        <td>${result['data']['time']}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Sunrise:</th>
                        <td>${result['data']['sunrise']}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Sunset:</th>
                        <td>${result['data']['sunset']}</td>
                        <td></td>
                    </tr>
                    `);
                    };
                } catch (err) {
                    console.log(`ERROR: ${err}`);
                }
            }
        },
        error: function () {
            console.log("ERROR: API call failed");
        }
    });
};