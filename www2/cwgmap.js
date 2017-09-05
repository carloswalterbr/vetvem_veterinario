// javascript para uso da api google maps
/*
    1. inclua a chamada à função loadMapsApi()em:
        1.1 function onDeviceReady()    - derivada de   document.addEventListener("deviceready", onDeviceReady, false);
        1.2 function onOnline()         - derivada de   document.addEventListener("online", onOnline, false);
        1.3 function onResume()         - derivada de document.addEventListener("resume", onResume, false);
    2. Inclua no AndroidManifest.xml
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
    3. Inclua no index.html ou CSS a definição abaixo, onde 'map' é o nome da <div> onde o mapa será renderizado. Sem esta definição não ocorrerá a renderização. height: não pode ser 'auto'
        <style>
              #map {
                width: 100vmin;
                height: 100vmin;
              }
        </style>    
    4. Para efetuar testes no browser desktop, inclua a chamada à api no index.html como em:
        <script src="https://maps.googleapis.com/maps/api/js?key= sua key &libraries=places"></script>
*/
// para realizar chamadas no cel phone 
/*
    1. Inclua no config.xml na raiz do www:
        <access origin="tel:*" launch-external="yes" />
    2. Inclua no AndroidManifest.xml
        <uses-permission android:autoLink="phone" />
    3. Chame via href, como em:
        <a href="tel:32326482">32326482</a>
*/
	

    function onOnline() { // conexão retornou
        loadMapsApi(); 
    } 

    function onResume() { // retornou de underground
        loadMapsApi(); 
    } 

    function onOffline() { // perdeu a conexão
        alert("offline"); 
    } 

/*
alert(device.cordova); // 4.1.1
alert(device.model);  // XT1032
alert(device.platform);  // Android
alert(device.uuid);  // c3fa8e4ea6cf6eef
alert(device.version); // 5.1
alert(device.manufacturer);  //motorola
alert(device.serial); // undefined
*/	
	

    var Target_coord = "";
    var cw = "";

    function loadMapsApi() {
        if (navigator.connection.type === Connection.NONE) { // sem conexão
            alert("sem conexão");
            return; 
            } 
        if (typeof google === 'object' && typeof google.maps === 'object') {} // carrega maps uma única vez
        else {
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0&libraries=places&sensor=true&callback=onMapsApiLoaded');
        }
    }
	
    var onMapsApiLoaded = function () {
        // Maps API loaded and ready to be used. - callback
        alert("Maps API loaded and ready to be used");
    };

    function MinhaPosicao() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });       
    }
     
    //
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
              
    };
    
    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }        
        
// google maps

    // onde estou?

        function OndeEstou() {        
            getMapLocation();
        }
        
    // google map
        var Latitude = undefined;
        var Longitude = undefined;
        var Map;
        var Infowindow;        
        var placeType;
        
        // Get geo coordinates
        function getMapLocation() {
            navigator.geolocation.getCurrentPosition
            (onMapSuccess, onMapError, { enableHighAccuracy: true });
        }
        // Success callback for get geo coordinates
        var onMapSuccess = function (position) {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            /*
			if ($("#target-origin").val().length > 0) // é teste?
            {
                var coords = $("#target-origin").val().split(",");
                Latitude = coords[0];
                Longitude = coords[1];
            }            
			*/
            //
            getMap(Latitude, Longitude);
        }
        
        // Get map by using coordinates
        function getMap(latitude, longitude) {
            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                zoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            //        
            map = new google.maps.Map
            (document.getElementById("map"), mapOptions);
            //
            var latLong = new google.maps.LatLng(latitude, longitude);
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            var marker = new google.maps.Marker({
                position: latLong,
                map: map,
                animation: google.maps.Animation.DROP
            });
            // Marker
            marker.setMap(map);
            map.setZoom(15);
            map.setCenter(marker.getPosition());
        }
        
        // Success callback for watching your changing position
        var onMapWatchSuccess = function (position) {
            var updatedLatitude = position.coords.latitude;
            var updatedLongitude = position.coords.longitude;
            if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
                Latitude = updatedLatitude;
                Longitude = updatedLongitude;
                //
                getMap(updatedLatitude, updatedLongitude);
            }
        }
        
        // Error callback
        function onMapError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }
        
        // Watch your changing position
        function watchMapPosition() {
            return navigator.geolocation.watchPosition
            (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });  
        }
    
// places - tipo nearbySearch

    function getPlacesLocation(tipo) {
        placeType = tipo;
        navigator.geolocation.getCurrentPosition
        (onPlacesSuccess, onPlacesError, { enableHighAccuracy: true });
    }
    
    // Success callback for get geo coordinates
    var onPlacesSuccess = function (position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
        if ($("#target-origin").val().length > 0) // é teste?
        {
            var coords = $("#target-origin").val().split(",");
            Latitude = coords[0];
            Longitude = coords[1];
        }
        //
        getPlaces(Latitude, Longitude, placeType);
    }
    
    // Get places by using coordinates - adcionado parametro tipo de estabelcimento
    function getPlaces(latitude, longitude, tipo) {
        var latLong = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //        
        Map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        Infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(Map);
        service.nearbySearch({
            location: latLong,
            radius: 500,
            type: [tipo]
        }, foundStoresCallback);
    }
    
    // Success callback for watching your changing position
    var onPlacesWatchSuccess = function (position) {
        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;
        if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
            Latitude = updatedLatitude;
            Longitude = updatedLongitude;
            getPlaces(updatedLatitude, updatedLongitude);
        }
    }
    
    // Success callback for locating stores in the area - criar os markers
    function foundStoresCallback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //document.getElementById("cw").value = results.length;  // places retorna apenas 20 resultados, assim não adianta usar nearbySearch.radius muito grande 
            // veja https://developers.google.com/places/web-service/search#PlaceSearchRequests
            // Para mais resultados use diretamente a places api - retorna máximo 60 paginadas de 20 em 20 - veja https://developers.google.com/places/web-service/search#PlaceSearchResponses
            // exemplo:   https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.2195612,-44.7258322&radius=500&type=restaurant&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0
            // next page  https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.2195612,-44.7258322&radius=500&type=restaurant&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0&pagetoken=CoQC_wAAALXJ2Y0Yr8ChNeXa-CZxLUv0AghEr-QqsxxPHd7SYlX_iT42f3R-ZIy0349GzI9Dgl03dUtFheIFREPHkjpR1hGoa7wQex86LLARp0rN-o6ewTAA3f80K1c24EmbVNLygi6ewN-g-boVQCR1hZPjTr-Bc8Z7S9Oz2PdSfZNfzwriTWnGxefjOo5LPX6kJ0nujogQoB0H_5D1VziAiUSI_9VsCkD4jVAfryLbpfTId_P6qfexI9pWpIFV6GG7NpiTcqbC0l88QHP1rd9AKAarJpmU1NeC1MYnpPmxv0AdhTNkoaeghxBCCF2ytxddUEoeA48hlQPmqGptZyWExgVOUfsSECk7_Yx6xpH676sgs4y_N60aFE8BuJ4A-a0NPQOhnOYkj8VRhD94
            // last page  -- se não houver mais resultados google não retorna o próximo next_page_token
            // ATENÇÂO: na chamada à próxima use &pagetoken= (embora o token venha no campo 'next_page_token')
            // outro exemplo com raius = 1500 m
            // 1a.) https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.2195612,-44.7258322&radius=1500&type=restaurant&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0
            // 2a.) https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.2195612,-44.7258322&radius=1500&type=restaurant&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0&pagetoken=CoQC_wAAAMQcGesjUBCW8FXyYtLg5WgeLjW3kTKGtefDGfAtpexPdT-TZvxWkFBoVcGZdQpp_6Ns9n-y3Qd2_9yFdlin1JqApDcQ0BP80WxjEWAOpHdM0RF_Mj-S7Tr1OTi_VkqofUiXEBcL1j-3O9f6IsKD0WMxDp1rpEnyGx72ylttqhmLBC_2cM3Fyd3dKeS3CftsbvZ7LqnAV9glioIZATHMS2leBaNGGgtVUXFHw5IzkTtifPfIMkFiIXi6t-Lg5HTYRaNSe3eBXeSml9CHYqg4WW3WDn2Bxsi_cNI7XLiBObFQG_oE2fXyXwlwtXyxuTsxPCfhtvfdWDXAkkZAg-1Hm-8SEIHOBgp9rmfIZKIugoib8y8aFLL5F9WFwk_0vIB2MjXEJLJhrm_c
            // 3a.) https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.2195612,-44.7258322&radius=1500&type=restaurant&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0&pagetoken=CqQDnwEAAA_fbSCDn6QmPISGmVbWCeU7y_Px6hFBg1Z0ZX9RLLQ6fL2plASXzNQ59b_uXIRjytWMHRIg9hqaI-loTXm48GKa90c0wbBlXRbAMv8_W75VrotjfiX8w37c8nX0TNWn3cTH1909nJ-1Qfk-bAS6uViqurK9CXrsUPMVW_IRffTFW90jgTGWX0J9SHJuVijSvNu9lOgCFeOnhyCyjcvV2f5uMjpuVoUg8kkaYM-0h5OYp2LyT218c_ogQcY_3opKwj8s1L7X3d2XIV7gTtpVjBWdWJeqTDnp32EK5mAIID55LfDt6qYSXAU2Oc5Lj00LQtN0sYfowKRM2rGpVSaaPneja5AzZ5Gg3GuviQTvGU1vsHCBynv547HBn-oSTfeuhR-nBp2nPOyr0UCtoTIlrHfWvdtAor6tHI1S--AtJWFcNSMJ6e5CmV41cogSQhpDKMdaNzf59Jap4e2BB8VBDCUZVhzY9eQugcuOcyabPixrGr7xFr5BGy2Ekynb5cT_7wrZtzM4O09mmcvSGl_TVRgkAWaVgoEAQwl5mJEjIw7YEhBh33O4zs5CHvWJU0IYuZZJGhQBSKM-F2MzNAkpe6Itiis-mjlvqA
            // Para exibir a foto através da photo_reference, use este link (com &photoreference= , maxheight , maxwidth , key)
            //   subway paraty   https://maps.googleapis.com/maps/api/place/photo?photoreference=CoQBcwAAAHSWijIQsiEAnpr-izocKbcE28zlHCSH5nbN6RSYbo-vcxdAyoMY3eUs2ZHUYo0I5_qH8SMhICzaZ8PY_rBnyATL7Tl7XoJXycwaCOqn4B1wysmxJNjrfGrVUF6K1VA5x8911lpQD9RQV-0L6GJ9V1JgCbD4YwThVGltNhEsYHcaEhCJvaNwrIujOOC18_5sEVRoGhTezxsA7yW2bCZj2q0rYzVbEk1qZg&sensor=false&maxheight=1024&maxwidth=1024&key=AIzaSyAunZQG3K5ZVZ58efLqIpSW5PETHCXcUj0
            //      google direcionará para outro link mas fica de boa (https://lh4.googleusercontent.com/-HV9alvhaYtw/VnhEluwZI8I/AAAAAAAAGSU/IfQFPBqHqIYWf4DBTZT21MIRcekG5lCNA/s1600-w1024-h1024/)
            //
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
        //
    }
    
    // Place a pin for each store on the map
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: Map,
            position: place.geometry.location
        });
        // copia todos os dados dos markers obtidos, útil para preencher a nossa database e para ressaltar pagantes com marker.icon
        /*
        if (place.name) { cw += place.name+" "; }
        if (place.id) { cw += place.id+"  "; }
        if (place.geometry.location) { cw += +place.geometry.location+" "; }
        if (place.vicinity) { cw += +place.vicinity+" "; }
        if (place.types[0]) { cw += +place.types[0]+" ";}
        if (place.photos) { cw += place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});}
        document.getElementById("cw").value = cw;
        */
        // ação ao clicar no marker - obtém dados - veja https://developers.google.com/maps/documentation/javascript/places#place_details_responses 
        // https://developers.google.com/maps/documentation/javascript/places#places_photos
        google.maps.event.addListener(marker, 'click', function () {
            //Infowindow.setContent(place.name+" "+place.id+"  "+place.geometry.location+" "+place.vicinity+" "+place.types[0]+" "+place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})); // para levar à página do cliente -- vela tbem place.photos[]
            Infowindow.setContent(place.name);
            Infowindow.open(Map, this);
            //document.getElementById("cw").value = place.geometry.location; // obtém a coord aproximada do ponto
        });
    }
    
    // Error callback
    function onPlacesError(error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
    
    // Watch your changing position
    function watchPlacesPosition() {
        return navigator.geolocation.watchPosition
        (onPlacesWatchSuccess, onPlacesError, { enableHighAccuracy: true });
    }


//////////////////////////////////////////////////////////////////////

        var map,
            currentPosition,
            directionsDisplay,
            directionsService;

        function Dir() {
            navigator.geolocation.getCurrentPosition(locSuccess, locError);
        }

        function initialize(lat, lon) {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsService = new google.maps.DirectionsService();

            currentPosition = new google.maps.LatLng(lat, lon);

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: currentPosition,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            directionsDisplay.setMap(map);

            var currentPositionMarker = new google.maps.Marker({
                position: currentPosition,
                map: map,
                title: "Current position"
            });

            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(currentPositionMarker, 'click', function () {
                infowindow.setContent("Current position: latitude: " + lat + " longitude: " + lon);
                infowindow.open(map, currentPositionMarker);
            });
        }

        function locError(error) {
            // initialize map with a static predefined latitude, longitude
            initialize(59.3426606750, 18.0736160278);
        }

        function locSuccess(position) {
            //alert($("#target-origin").val().length);
            if ($("#target-origin").val().length > 0)
            {
                var coords = $("#target-origin").val().split(",");
                //alert(coords[0]);
                //alert(coords[1]);
                initialize(coords[0], coords[1]);
            }
            else
            {
                initialize(position.coords.latitude, position.coords.longitude);
            }
            calculateRoute();
        }

        function calculateRoute() {
            var targetDestination = $("#target-dest").val();
            // destination = new google.maps.LatLng(lat, lon);
            if (currentPosition && currentPosition != '' && targetDestination && targetDestination != '') {
                var request = {
                    origin: currentPosition,
                    destination: targetDestination,
                    travelMode: google.maps.DirectionsTravelMode["DRIVING"],
                    unitSystem: google.maps.UnitSystem.METRIC
                };
                // DRIVING, WALKING, BICYCLING (not in Brazil), TRANSIT
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setPanel(document.getElementById("directions"));
                        directionsDisplay.setDirections(response);

                        /*
                        var myRoute = response.routes[0].legs[0];
                        for (var i = 0; i < myRoute.steps.length; i++) {
                            alert(myRoute.steps[i].instructions);
                        }
                    */
                        $("#results").show();
                    } else {
                        $("#results").hide();
                    }
                });
            } else {
                $("#results").hide();
            }
        }


