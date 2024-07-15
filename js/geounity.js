// ==UserScript==
// @name          Disunity Script
// @description   remove features from Geoguessr Unity until it's stabl0e
// @version       0.1
// @author        arborelia
// @match         https://www.geoguessr.com/*
// @run-at        document-start
// @license       MIT
// @namespace     https://greasyfork.org/users/838374
// @grant         none
// ==/UserScript==

/**
 * Custom your minimap here!
 */

/**
 * 1: replace "roadmap" in the customMode field with any of the options below:
 * "roadmap" displays the default road map view. This is the default map type.
 * "satellite" displays Google Earth satellite images.
 * "hybrid" displays a mixture of normal and satellite views.
 * "terrain" displays a physical map based on terrain information.
 */

let customMode = "roadmap";

/**
 * 2: Go to https://mapstyle.withgoogle.com/ first click "No thanks, take me to the old style wizard"
 * then click "MORE OPTIONS" to hide or reveal certain features.
 * When you are done, click "FINISH", then "COPY JSON", and replace my settings in custom with your settings below.
 */

let custom =

    [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

/**
 * End of Minimap customization instruction section
 */

/**
 * Overlay anything on the minimap here!
 * 1. overlay an GeoJSON object
 * 2. overlay a custom image
 */

/**
 * Overlay an GeoJSON object:
 */

// change the GeoJson display style.
// strokeOpacity, strokeWeight, fillOpacity takes a value between 0 and 1.
// strokeColor and fillColor supports Hexadecimal color (#00FF00 is green)
// If clickable is set to true, you would not be able to make a guess within the shape

let GEOJSON_STYLE =
{
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: 0.2,
    fillColor: "#00FF00",
    fillOpacity: 0,
    clickable: false,
}

// replace the URL with your desired link
// For example, search "Germany GeoJson" on Github, find this link (https://github.com/isellsoap/deutschlandGeoJSON/blob/main/4_kreise/4_niedrig.geo.json)
// Then click "Download" to get the raw.githubusercontent.com link (https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/4_niedrig.geo.json)
// and replace the URL below with that URL.
// State zipcode: see this site https://github.com/OpenDataDE/State-zip-code-GeoJSON

let YOUR_URL = "https://raw.githubusercontent.com/severinlandolt/map-switzerland/main/02%20GeoJSON/CH_Kantonsgrenzen_100_geo.json"

// set it to true to add your custom GeoJSON by copy it to the code below (this is for

let GeoJsonCustomUser = false

// replace with your custom GeoJson, go to https://geojson.io/ to customize it then copy the Json to here

let CUSTOM_GEOJSON =

{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        2.493896484375,
                        52.7163309360463
                    ],
                    [
                        2.4609375,
                        53.15994678846807
                    ],
                    [
                        3.2025146484375,
                        53.179703893605385
                    ],
                    [
                        3.2080078125,
                        52.96518371955126
                    ],
                    [
                        2.48291015625,
                        52.948637884883205
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        3.218994140625,
                        52.05586831074774
                    ],
                    [
                        3.218994140625,
                        52.13685974852633
                    ],
                    [
                        2.515869140625,
                        52.1267438596429
                    ],
                    [
                        2.515869140625,
                        51.77803705914517
                    ],
                    [
                        3.2354736328125,
                        51.78993084774129
                    ],
                    [
                        3.228607177734375,
                        51.96119237712624
                    ],
                    [
                        2.8571319580078125,
                        51.95230623740452
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        2.5048828125,
                        52.619725272670266
                    ],
                    [
                        2.5103759765625,
                        52.274880130680536
                    ],
                    [
                        2.867431640625,
                        52.284962354465726
                    ],
                    [
                        3.2299804687499996,
                        52.29504228453735
                    ],
                    [
                        3.2135009765625,
                        52.63973017532399
                    ],
                    [
                        2.5096893310546875,
                        52.621392697207625
                    ]
                ]
            }
        }
    ]
}

/**
 * Overlay a custom image:
 */

// set it to true to add your image overlay

let OverlayCustom = false

// replace the URL with your desired link

let OVERLAY_URL = "https://www.battleface.com/blog/wp-content/uploads/2020/10/patreon-profile-tom-geowizard.jpg"

// set the bounds for the image - latitude (North and South), longitude (North and South)

let OVERLAY_BOUNDS =
{
    north: 53,
    west: -3,
    south: 51,
    east: 1,
};

// change the image overlay display style.

let OVERLAY_STYLE =
{
    fillOpacity: 0.2,
    clickable: false,
}

/**
 * End of Minimap Overlay instruction section
 */

// API Keys

var MS_API_KEY = "Ap2DwDDitzY7jJuYeIJF6YyfqDkYt-QxIBjeQ6SDEJelSfb6ghAVb-V4I-G3om-s";
var YANDEX_API_KEY = "b704b5a9-3d67-4d19-b702-ec7807cecfc6";
var KAKAO_API_KEY = "cbacbe41e3a223d794f321de4f3e247b";
var MAPBOX_API_KEY = "pk.eyJ1IjoianVwYW9xcSIsImEiOiJjbDB2dTBnbngweWIzM2NtdWR5NXZ1dncyIn0.bJixk3kN5Mmedw_C3vQmmw";
const MAPS_API_URL = "https://maps.googleapis.com/maps/api/js"; // removed "?" from the link
var MAPILLARY_API_KEY_LIST =
    ["MLY|6723031704435203|5afd537469b114cf814881137ad74b7c",
        "MLY|6691659414239148|b45e7e82cde126044cbc2cf5d4a7c9b1",
        "MLY|5074369465929308|f7ad2802cbaf26c63f88046a292df68b",
        "MLY|7451643761528219|6477f2db0e3928b51e45ec9311983936",
        "MLY|4855256237866198|6d0464771831c8a4bf2be095e1e1aabc",
        "MLY|4772941976102161|8458d4f08d2e1970cdfe0a4e242c04ff",
        "MLY|4492067214235489|94c44703942362ad6f6b70b5d32c3a45",
        "MLY|4618251611628426|0cef71d6ec8b997a5ec06ecdeabf11ec",
        "MLY|4096846270415982|fa2ce29641503e6ef665f17459633570",
        "MLY|4231415756962414|fe353880fd246e8a4a6ae32152f7dbb0",]

var MAPILLARY_API_KEY = MAPILLARY_API_KEY_LIST[Math.floor(Math.random() * MAPILLARY_API_KEY_LIST.length)];
var MAPY_API_KEY = "placeholder";

console.log("Geoguessr Unity Script v7.0.1 by Jupaoqq");


// Store each player instance

let YandexPlayer, KakaoPlayer, GooglePlayer, MapillaryPlayer, MSStreetPlayer, MapboxPlayer, MapboxMarker, MapyPlayer;
let YANDEX_INJECTED = false;
let BAIDU_INJECTED = false;
let KAKAO_INJECTED = false;
let MAPILLARY_INJECTED = false;
let MS_INJECTED = false;
let MAPBOX_INJECTED = false;
let MAPY_INJECTED = false;
let rainLayer;

// Game mode detection

let isBattleRoyale = false;
let isDuel = false;
let isBullseye = false;
let isLiveChallenge = false;

// Player detection and coordinate conversion

let nextPlayer = "Google";
let nextPlayer_save = "Google";
let global_lat = 0;
let global_lng = 0;
let global_cc = null;
let global_panoID = null;
let global_BDID, global_BDAh, global_BDBh;
let yId, yTime, yEnd, iId;
let global_heading = null;
let global_pitch = null;

let krCoordinates = [38.75292321084364, 124.2804539232574, 33.18509676203202, 129.597381999198]
let global_radi = 100

// Callback variables

let eventListenerAttached = false;
let povListenerAttached = false;
let playerLoaded = false;
let teleportLoaded = false;
let syncLoaded = false;

// Minimize Yandex API use

let yandex_map = false;
let Kakao_map = false;
let Wikipedia_map = false;
let Minecraft_map = false;
let bing_map = false;
let Mapy_map = false;

// Mapillary Image Key

let mmKey = 0;

// Handle Yandex compass

let COMPASS = null;

// Handle undo

let locHistory = [];
let defaultPanoIdChange = true;

// Round check

let ROUND = 0;
let CURRENT_ROUND_DATA = null;

let switch_call = true;
let one_reset = false;
// let cnt = 0;

var isFirefox = typeof InstallTrigger !== 'undefined';

let fire1 = true;
let allowDetect = false;
let planetType = "None";

// Satellite Map Radius (in Meters)
let ms_radius = 15000;
let sat_choice = false;

// Create the Maps, but not reload API
let partialCreateYandex = false;
let partialCreateKakao = false;
let partialCreateMapillary = false;
let partialCreateMS = false;
let partialCreateMapbox = false;
let partialCreateMapy = false;

// let NEW_ROUND_LOADED = false;

// Geoguessr Canvas String Names

let GENERAL_LAYOUT = ".game-layout__canvas";
let GENERAL_CANVAS = ".game-layout__panorama-canvas";
let BR_CANVAS = ".br-game-layout__panorama-canvas";
let BR_WRAPPER = ".br-game-layout__panorama-wrapper";
let BR_LAYOUT = ".br-game-layout";
let FAIL_TO_LOAD_CANVAS = ".game-layout__panorama-message";
let DUEL_LAYOUT = ".game_layout__TO_jf";
let DUELS_CANVAS = ".game-panorama_panorama__rdhFg";
let DUELS_CANVAS2 = ".game-panorama_panoramaCanvas__PNKve";
let BULLSEYE_CANVAS = ".game-panorama_panorama__ncMwh";
let BULLSEYE_CANVAS2 = ".game-panorama_panoramaCanvas__r_5ea";
let LIVE_CANVAS = ".game-panorama_panorama__IuPsO";
let LIVE_CANVAS2 = ".game-panorama_panoramaCanvas__HbDig";
let DUELS_POPUP = ".overlay_overlay__AR02x";
let BR_POPUP = ".popup__content";

let BR_LOAD_KAKAO = false;
let BR_LOAD_YANDEX = false;
let BR_LOAD_MS = false;
let BR_LOAD_MP = false;
let BR_LOAD_MAPILLARY = false;
let BR_LOAD_MAPY = false;

let ms_sat_map = false;
let rtded = false;
let NM = false;
let NP = false;
let NZ = false;

let initBing = false;

let menuLocCounter = 0;
let wikiUrl = "";
let bullseyeMapillary = false;
let randomPlanets = false;

let corsString = "https://nameless-bastion-28139.herokuapp.com/"
// Additional: https://cors.eu.org/
let carteCity = ""

let GAME_CANVAS = "";
let DUEL_CANVAS = "";

let skySpecial = false;
let soilSpecial = false;
let skewedSpecial = false;
let zoomSpecial = false;
let randomSpecial = false;
let nmpzSpecial = false;

let mosaicPre = false;
let restrictMovement = false;

var Weather = true;
var Dimension = true;
var mapSty = true;
var Building = false;

window.toggleSatellite = (e) => {
    if (e.checked) {
        sat_choice = true;
        document.getElementById('tgs').style.display = "";

    }
    else {
        sat_choice = false;
        document.getElementById('tgs').style.display = "none";
    }
}

window.toggleWeather = (e) => {
    Weather = e.checked ? true : false;
}

window.toggleBuildings = (e) => {
    Building = e.checked ? true : false;
}

window.toggle3D = (e) => {
    Dimension = e.checked ? true : false;
}

window.toggleSky = (e) => {
    skySpecial = e.checked ? true : false;
}

window.toggleSoil = (e) => {
    soilSpecial = e.checked ? true : false;
}

window.toggleSkewed = (e) => {
    skewedSpecial = e.checked ? true : false;
}

window.toggleMaxZoom = (e) => {
    zoomSpecial = e.checked ? true : false;
}

window.toggleRdn = (e) => {
    randomSpecial = e.checked ? true : false;
}

window.toggleNMPZSpecial = (e) => {
    nmpzSpecial = e.checked ? true : false;
}

window.toggleMosaic = (e) => {
    mosaicPre = e.checked ? true : false;
}

window.toggleRestrictMovement = (e) => {
    restrictMovement = e.checked ? true : false;
}

let guiEnabled = true;

const guiHTML = `
<div id="Unity Start Menu" style="margin-top: 20px;margin-bottom: 20px;">
<div class="section_sectionHeader__WQ7Xz section_sizeMedium__yPqLK"><div class="bars_root___G89E bars_center__vAqnw"><div class="bars_before__xAA7R bars_lengthLong__XyWLx"></div><span class="bars_content__UVGlL"><h3>Satellite Mode (Unity Script)</h3></span><div class="bars_after__Z1Rxt bars_lengthLong__XyWLx"></div></div></div>
<div class="start-standard-game_settings__x94PU">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Enabled</span>
      <input type="checkbox" id="toggleSatellite" onclick="toggleSatellite(this)" class="toggle_toggle__hwnyw">
    </div>
  </div>
  <p class="body-text_sizeXSmall__rwJFf" style="margin-top: 20px;margin-bottom: 20px;">Radius (2D): Default - depending on map bounds. NZ - 5km. NM - 2km. NMPZ - 1km. <br> Radius (3D): 50% of the radius for 2D under the same setting.</p>
</div>
<div class="start-standard-game_settings__x94PU" id="tgs" style="display:none">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Live Weather</span>
      <input type="checkbox" id="toggleWeather" onclick="toggleWeather(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Buildings</span>
      <input type="checkbox" id="toggleBuildings" onclick="toggleBuildings(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">3D</span>
      <input type="checkbox" id="toggle3D" onclick="toggle3D(this)" class="toggle_toggle__hwnyw">
    </div>
  </div>
  <p class="body-text_sizeXSmall__rwJFf" style="margin-top: 20px;margin-bottom: 20px;">If "3D" is toggled, right click and drag for 3D View.</p>
</div>
<div class="section_sectionHeader__WQ7Xz section_sizeMedium__yPqLK"><div class="bars_root___G89E bars_center__vAqnw"><div class="bars_before__xAA7R bars_lengthLong__XyWLx"></div><span class="bars_content__UVGlL"><h3>Mosaic & Peek Mode (Unity Script)</h3></span><div class="bars_after__Z1Rxt bars_lengthLong__XyWLx"></div></div></div>
<div class="start-standard-game_settings__x94PU">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Enabled</span>
      <input type="checkbox" id="toggleMosaic" onclick="toggleMosaic(this)" class="toggle_toggle__hwnyw">
    </div>
  </div>
  <p class="body-text_sizeXSmall__rwJFf" style="margin-top: 20px;margin-bottom: 20px;">Default mosaic grid: 5x5.</p>
</div>
<div class="section_sectionHeader__WQ7Xz section_sizeMedium__yPqLK"><div class="bars_root___G89E bars_center__vAqnw"><div class="bars_before__xAA7R bars_lengthLong__XyWLx"></div><span class="bars_content__UVGlL"><h3>No Escape Mode (Unity Script)</h3></span><div class="bars_after__Z1Rxt bars_lengthLong__XyWLx"></div></div></div>
<div class="start-standard-game_settings__x94PU">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Enabled</span>
      <input type="checkbox" id="toggleRestrictMovement" onclick="toggleRestrictMovement(this)" class="toggle_toggle__hwnyw">
    </div>
  </div>
  <p class="body-text_sizeXSmall__rwJFf" style="margin-top: 20px;margin-bottom: 20px;">Please make sure the "Move" option in Game Settings is allowed. Default radius: 250m.</p>
</div>
<div class="section_sectionHeader__WQ7Xz section_sizeMedium__yPqLK"><div class="bars_root___G89E bars_center__vAqnw"><div class="bars_before__xAA7R bars_lengthLong__XyWLx"></div><span class="bars_content__UVGlL"><h3>Circus Mode (Unity Script)</h3></span><div class="bars_after__Z1Rxt bars_lengthLong__XyWLx"></div></div></div>
<div class="start-standard-game_settings__x94PU">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Sky</span>
      <input type="checkbox" id="toggleSky" onclick="toggleSky(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Soiled</span>
      <input type="checkbox" id="toggleSoil" onclick="toggleSoil(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Skewed</span>
      <input type="checkbox" id="toggleSkewed" onclick="toggleSkewed(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Max Zoom</span>
      <input type="checkbox" id="toggleMaxZoom" onclick="toggleMaxZoom(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Random</span>
      <input type="checkbox" id="toggleRdn" onclick="toggleRdn(this)" class="toggle_toggle__hwnyw">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">NMPZ</span>
      <input type="checkbox" id="toggleNMPZSpecial" onclick="toggleNMPZSpecial(this)" class="toggle_toggle__hwnyw">
    </div>
  </div>
  <p class="body-text_sizeXSmall__rwJFf" style="margin-top: 20px;margin-bottom: 20px;">Please make sure the "Pan" option in Game Settings is allowed. To play in NMPZ, toggle "NMPZ".<br> More than one of the options above may be toggled at the same time.</p>
</div>
</div>
`

const checkInsertGui = () => {
    if ((document.querySelector('.copy-link_root__dBcXL') || document.querySelector('.radio-box_root__ka_9S')) && document.getElementById('toggleSky') === null && document.querySelector('.section_sectionMedium__yXgE6')) {
        document.querySelector('.section_sectionMedium__yXgE6').insertAdjacentHTML('beforeend', guiHTML);
        if (sat_choice) {
            document.getElementById('toggleSatellite').checked = true;
            document.getElementById('tgs').style.display = "";
        }
        if (Weather) {
            document.getElementById('toggleWeather').checked = true;
        }
        if (Building) {
            document.getElementById('toggleBuildings').checked = true;
        }
        if (Dimension) {
            document.getElementById('toggle3D').checked = true;
        }
        if (skySpecial) {
            document.getElementById('toggleSky').checked = true;
        }
        if (soilSpecial) {
            document.getElementById('toggleSoil').checked = true;
        }
        if (skewedSpecial) {
            document.getElementById('toggleSkewed').checked = true;
        }
        if (zoomSpecial) {
            document.getElementById('toggleMaxZoom').checked = true;
        }
        if (randomSpecial) {
            document.getElementById('toggleRdn').checked = true;
        }
        if (nmpzSpecial) {
            document.getElementById('toggleNMPZSpecial').checked = true;
        }
        if (mosaicPre) {
            document.getElementById('toggleMosaic').checked = true;
        }
        if (restrictMovement) {
            document.getElementById('toggleRestrictMovement').checked = true;
        }

    }
}

let observerNew = new MutationObserver((mutations) => {
    if (guiEnabled) {
        checkInsertGui();
    }
    if (document.getElementById('Unity Start Menu')) {
        if (document.querySelector('.rule-icons_icon__dcLov')) {
            document.getElementById('Unity Start Menu').style.display = "";
        }
        else {
            document.getElementById('Unity Start Menu').style.display = "none";
        }
    }
});

observerNew.observe(document.body, {
    characterDataOldValue: false,
    subtree: true,
    childList: true,
    characterData: false
});

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// window.addEventListener('popstate', function(event) {
//     var photo = document.getElementById("sat_map");
//     console.log(photo);
//     document.body.appendChild(photo);
// }, false);



/**
 * Helper Functions
 */

// Highlight API Load Message

function myHighlight(...args) {
    console.log(`%c${[...args]}`, "color: dodgerblue; font-size: 24px;");
}

// Hex to number conversion for Baidu coordinate conversion

function hex2a(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

// Coordinate computation given heading, distance and current coordinates for teleport

function FindPointAtDistanceFrom(lat, lng, initialBearingRadians, distanceKilometres) {
    const radiusEarthKilometres = 6371.01;
    var distRatio = distanceKilometres / radiusEarthKilometres;
    var distRatioSine = Math.sin(distRatio);
    var distRatioCosine = Math.cos(distRatio);

    var startLatRad = DegreesToRadians(lat);
    var startLonRad = DegreesToRadians(lng);

    var startLatCos = Math.cos(startLatRad);
    var startLatSin = Math.sin(startLatRad);

    var endLatRads = Math.asin((startLatSin * distRatioCosine) + (startLatCos * distRatioSine * Math.cos(initialBearingRadians)));

    var endLonRads = startLonRad
        + Math.atan2(
            Math.sin(initialBearingRadians) * distRatioSine * startLatCos,
            distRatioCosine - startLatSin * Math.sin(endLatRads));

    return { lat: RadiansToDegrees(endLatRads), lng: RadiansToDegrees(endLonRads) };
}

function DegreesToRadians(degrees) {
    const degToRadFactor = Math.PI / 180;
    return degrees * degToRadFactor;
}

function RadiansToDegrees(radians) {
    const radToDegFactor = 180 / Math.PI;
    return radians * radToDegFactor;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function bearing(start_latitude, start_longitude, stop_latitude, stop_longitude) {
    let y = Math.sin(stop_longitude - start_longitude) * Math.cos(stop_latitude);
    let x = Math.cos(start_latitude) * Math.sin(stop_latitude) -
        Math.sin(start_latitude) * Math.cos(stop_latitude) * Math.cos(stop_longitude - start_longitude);
    let brng = Math.atan2(y, x) * 180 / Math.PI;
    return brng
}

// Check if two floating point numbers are really really really really close to each other (to 10 decimal points)
function almostEqual(a, b) {
    return a.toFixed(10) === b.toFixed(10)
}

function almostEqual2(a, b) {
    return a.toFixed(3) === b.toFixed(3)
}

function moveFrom(coords, angle, distance) {
    const R_EARTH = 6378.137;
    const M = (1 / ((2 * Math.PI / 360) * R_EARTH)) / 1000;
    let radianAngle = -angle * Math.PI / 180;
    let x = 0 + (distance * Math.cos(radianAngle));
    let y = 0 + (distance * Math.sin(radianAngle));

    let newLat = coords.lat + (y * M);
    let newLng = coords.lng + (x * M) / Math.cos(coords.lat * (Math.PI / 180));
    return { lat: newLat, lng: newLng };
}

function getBBox(coordinates, meters) {
    let SW = moveFrom(coordinates, 135, meters);
    let NE = moveFrom(coordinates, 315, meters);
    return `${SW.lng},${SW.lat},${NE.lng},${NE.lat}`;
}

// function getBBox2(coordinates, meters){
//     let SW = moveFrom(coordinates, 135, meters * 1.44);
//     let NE = moveFrom(coordinates, 315, meters * 1.44);
//     return [NE.lat,SW.lng,SW.lat,NE.lng];
// }

function getBBox2(coordinates, meters) {
    let SW = moveFrom(coordinates, 135, meters * 1.44);
    let NE = moveFrom(coordinates, 315, meters * 1.44);
    if (NE.lat > 90) {
        SW.lat -= (NE.lat - 90);
        NE.lat = 90;
    }
    if (SW.lat < -90) {
        NE.lat += (-90 - SW.lat);
        SW.lat = -90;
    }
    if (SW.lng < -180) {
        NE.lng += (-180 - SW.lng);
        SW.lng = -180;
    }
    if (NE.lng > 180) {
        SW.lng -= (NE.lng - 180);
        NE.lng = 180;
    }
    return [NE.lat, SW.lng, SW.lat, NE.lng];
}

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 1000 * 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function convertMMSS(input) {
    var parts = input.split(':'),
        minutes = +parts[0],
        seconds = +parts[1];
    return (minutes * 60 + seconds).toFixed(3);
}

function handleBtwRoundsClear() {
    locHistory = [];
    wikiUrl = "";
    one_reset = false;
}

// Script injection, extracted from extenssr:
// https://gitlab.com/nonreviad/extenssr/-/blob/main/src/injected_scripts/maps_api_injecter.ts

function overrideOnLoad(googleScript, observer, overrider) {
    const oldOnload = googleScript.onload
    googleScript.onload = (event) => {
        const google = window.google
        if (google) {
            observer.disconnect()
            overrider(google)
        }
        if (oldOnload) {
            oldOnload.call(googleScript, event)
        }
    }
}

function grabGoogleScript(mutations) {
    for (const mutation of mutations) {
        for (const newNode of mutation.addedNodes) {
            const asScript = newNode
            if (asScript && asScript.src && asScript.src.startsWith('https://maps.googleapis.com/')) {
                //asScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDqRTXlnHXELLKn7645Q1L_5oc4CswKZK4&v=3&libraries=places,drawing&language=ja&region=JP"
                return asScript
            }
        }
    }
    return null
}

function injecter(overrider) {
    if (document.documentElement) {
        injecterCallback(overrider);
    }
    else {
        alert("Script didn't load, refresh to try loading the script");
    }
}


function injecterCallback(overrider) {
    new MutationObserver((mutations, observer) => {
        const googleScript = grabGoogleScript(mutations)
        if (googleScript) {
            overrideOnLoad(googleScript, observer, overrider)
        }
    }).observe(document.documentElement, { childList: true, subtree: true })
}

function magic_formula(boundary) {
    let area = Math.abs((boundary[0] - boundary[2]) * (boundary[1] - boundary[3]))
    //     console.log(boundary);
    //     console.log(area);
    let dist = Math.pow((area / 50000), 0.25) * 20000
    if (dist < 250) dist = 250
    return dist
}

function formatDist() {
    if (ms_radius > 999) {
        let d = ms_radius / 1000.0;
        return parseFloat(d.toPrecision(2)).toString() + "km";
    }
    else {
        let d = ms_radius;
        return parseFloat(d.toPrecision(3)).toString() + "m";
    }
}

// Getter function for the button elements

function setButtons() {
    // console.log("set")
    return [document.getElementById("Teleport Forward"), document.getElementById("Teleport Reverse"), document.getElementById("Teleport Button"), document.getElementById("plus"), document.getElementById("minus"),
    document.getElementById("reset"), document.getElementById("Show Buttons"),
    document.getElementById("Date Button"), document.getElementById("minus year"), document.getElementById("plus year"),
    document.getElementById("Teleport Options Button"), document.getElementById("Satellite Switch"),
    document.getElementById("Restrict Bounds Main"),
    document.getElementById("Restrict Distance"), document.getElementById("Increase Restrict Distance"),
    document.getElementById("Decrease Restrict Distance"), document.getElementById("Restrict Bounds Enable"),
    document.getElementById("Restrict Distance Reset")];
}

function setButtons2() {
    // console.log("set")
    return [document.getElementById("Show Buttons"),
    document.getElementById("Teleport Menu"),
    document.getElementById("Satellite Menu"),
    document.getElementById("Mosaic Menu"),
    document.getElementById("Minimap Menu Button"),
    document.getElementById("Time Machine Button"),
    ]
}

// Store default position for the button elements

function btnPosFinal(element) {
    if (element.id !== "Show Buttons") {
        if (element.classList.contains("menu-btn")) {
            element.style.right = "0.5em";
        }

        if (element.classList.contains("full") || element.classList.contains("extra-full")) {
            element.style.right = "4em";
        }
        else if (element.classList.contains("half")) {
            if (element.classList.contains("horizontal-1")) {
                element.style.right = "4em";
            }
            else if (element.classList.contains("horizontal-2")) {
                element.style.right = "11.75em";
            }
            else if (element.classList.contains("horizontal-3")) {
                element.style.right = "19.5em";
            }
        }
        else if (element.classList.contains("small")) {
            if (element.classList.contains("horizontal-1")) {
                element.style.right = "17em";
            }
            else if (element.classList.contains("horizontal-3")) {
                element.style.right = "4em";
            }
            else if (element.classList.contains("horizontal-sp")) {
                element.style.right = "14.5em";
            }
        }
        else if (element.classList.contains("large")) {
            element.style.right = "6.5em";
        }
        else if (element.classList.contains("lgMinus")) {
            element.style.right = "6.5em";
        }

        if (element.classList.contains("vertical-0")) {
            element.style.top = "6em";
        }
        else if (element.classList.contains("vertical-1")) {
            element.style.top = "9.5em";
        }
        else if (element.classList.contains("vertical-2")) {
            element.style.top = "12em";
        }
        else if (element.classList.contains("vertical-3")) {
            element.style.top = "14.5em";
        }
        else if (element.classList.contains("vertical-4")) {
            element.style.top = "17em";
        }
        else if (element.classList.contains("vertical-5")) {
            element.style.top = "19.5em";
        }
        else if (element.classList.contains("vertical-6")) {
            element.style.top = "22em";
        }
        else if (element.classList.contains("vertical-7")) {
            element.style.top = "24.5em";
        }
    }
}

function handleDropdown() {
    function dropdownHelper1(nm, val) {
        let hC = 0
        for (let mapDiv of document.getElementsByClassName(nm)) {
            mapDiv.style.top = (val + (hC * 1.65)).toString() + "em";
            hC++;
        }
    }

    // let classN = ["preset-minimap", "overlay-minimap", "space-mainmap", "space-minimap"]
    let classN = ["preset-minimap", "overlay-minimap", "space-minimap", "space-2minimap", "space-3minimap"]
    for (let x of classN) {
        dropdownHelper1(x, 11.85);
    }
    let classN2 = ["grid-size", "grid-opt", "satellite-style", "satellite-type"];
    for (let x of classN2) {
        dropdownHelper1(x, 14.1);
    }
    allowDetect = true;
}

function resetBtnPos() {
    let [
        mainMenuBtn,
        teleportMenu,
        satelliteMenu,
        mosaicMenu,
        MinimapMenuBtn,
        ClockMenuBtn,
    ] = setButtons2();

    // Manu Buttons

    mainMenuBtn.style.top = "6em";
    teleportMenu.style.top = "12.5em";
    MinimapMenuBtn.style.top = "15.5em";
    satelliteMenu.style.top = "18.5em";
    mosaicMenu.style.top = "24.5em";
    ClockMenuBtn.style.top = "27.5em";

    mainMenuBtn.style.right = "0.5em";
    mainMenuBtn.style.width = "3em";

    for (let element of document.getElementsByClassName("unity-btn")) {
        btnPosFinal(element);
    }
    handleDropdown();

}

// Adjust Buttons for different game modes

function AdjustBtnPos(top, right, arg) {
    if (arg) {
        resetBtnPos();
    }
    for (let element of document.getElementsByClassName("unity-btn")) {
        let eTop = element.style.top;
        let eRight = element.style.right;
        element.style.top = "calc(" + top.toString() + " + " + eTop + ")";
        element.style.right = "calc(" + right.toString() + " + " + eRight + ")";
        // console.log(element.style.top)
    }
}

function handleStyles() {
    let unityCSS =
        `visibility:hidden;
        border-radius: 25px;
        opacity: 0.8;
    height:2em;
    position:fixed;
    z-index:99999;
    background-color: #ba55d3;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: none;
    color: white;
    padding: none;
    text-align: center;
    vertical-align: text-top;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;`;

    for (let element of document.getElementsByClassName("unity-btn")) {
        if (element.id !== "Show Buttons") {
            element.style = unityCSS;
            const classNames = ["preset-minimap", "overlay-minimap", "satellite-style", "satellite-type", "space-minimap", "space-2minimap", "space-3minimap", "grid-size", "grid-opt"]
            if (classNames.some(className => element.classList.contains(className))) {
                element.style.height = "1.5em";
                element.style.background = "#ff69b4";
                if (["Clear", "Default", "Earth", "Grid 0"].includes(element.id)) {
                    if (element.id == "Clear") {
                        element.loaded = true;
                    }
                    element.style.background = "#ff1493";
                }
            }

            if (element.classList.contains("menu-btn")) {
                element.style.width = "3em";
                element.style.height = "2.5em";
                //                 element.style.borderStyle = "solid";
                //                 element.style.borderWidth = "0.1px"
                //                 element.style.borderColor = "black";

            }

            if (element.classList.contains("special-map-btn") && !element.classList.contains("full")) {
                element.style.background = "#ff69b4";
            }

            if (element.classList.contains("extra-height")) {
                element.style.height = "4.5em";
            }

            if (element.classList.contains("extra-full")) {
                element.style.width = "22.75em";
            }
            else if (element.classList.contains("full")) {
                element.style.width = "15em";
            }
            else if (element.classList.contains("half")) {
                element.style.width = "7.25em";
            }
            else if (element.classList.contains("small")) {
                element.style.width = "2em";
            }
            else if (element.classList.contains("large")) {
                element.style.width = "10em";
            }
            else if (element.classList.contains("lgMinus")) {
                element.style.width = "7.5em";
            }
            btnPosFinal(element);
        }
    }

    let dict = {
        'Info Menu': ["url(https://www.svgrepo.com/show/299161/big-data.svg)", "#ff9999"],
        'Teleport Menu': ["url(https://www.svgrepo.com/show/12767/car.svg)", "#ffcba4"],
        "Time Machine Button": ["url(https://www.svgrepo.com/show/38630/clock.svg)", "#D8BFD8"],
        'Minimap Menu Button': ["url(https://www.svgrepo.com/show/116365/map.svg)", "#faf0be"],
        'Mosaic Menu': ["url(https://www.svgrepo.com/show/77240/map.svg)", "#E6E6FA"],
        'Satellite Menu': ["url(https://www.svgrepo.com/show/29288/satellite.svg)", "#e8f48c"],
    };

    for (let element of document.getElementsByClassName("menu-btn")) {
        element.style.backgroundImage = dict[element.id][0];
        element.style.backgroundColor = dict[element.id][1];
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundOrigin = "content-box";
        element.style.visibility = "";
    }

    handleDropdown();
}

/**
 * Creates Unity buttons
 *
 * @returns Promise
 */

function hideOtherBtn() {
    for (let element of document.getElementsByClassName("unity-btn")) {
        if (element.id !== "Show Buttons") {
            element.style.visibility = "hidden";
        }
        if (nextPlayer == "Wikipedia" && element.id == "local language") {
            element.style.visibility = "";
        }
    }
}

function switchBtn(arg) {
    for (let element of document.getElementsByClassName("unity-btn")) {
        if (element.id !== "Show Buttons" && !element.classList.contains("menu-btn") && !element.classList.contains(arg)) {
            element.style.visibility = "hidden";
        }
        if (nextPlayer == "Wikipedia" && element.id == "local language") {
            element.style.visibility = "";
        }
    }
}

function getVar(argm) {
    if (argm == "Weather") {
        return Weather;
    }
    else if (argm == "Building") {
        return Building;
    }
    else if (argm == "Dimension") {
        return Dimension;
    }
    else if (argm == "mapSty") {
        return mapSty;
    }
    else {
        return false;
    }
}

function setVar(argm) {
    if (argm == "Weather") {
        Weather = !Weather;
    }
    else if (argm == "Building") {
        Building = !Building;
    }
    else if (argm == "Dimension") {
        Dimension = !Dimension;
    }
    else if (argm == "mapSty") {
        mapSty = !mapSty;
    }
}

function handleSatColor(cond1, cond2) {
    let sC = document.getElementById("Satellite Type Button");
    if (cond1) {
        for (let element of satType) {
            let ele0 = document.getElementById(element[0]);
            let strNmHere;
            if (ele0.id !== "SunPos") {
                strNmHere = getVar(ele0.id);
            }
            else {
                strNmHere = ele0.id;
            }
            if (strNmHere) {
                ele0.innerHTML = element[1];
                ele0.style.background = "#ff1493";
            }
            else {
                ele0.innerHTML = element[2];
                ele0.style.background = "#ff69b4";
            }
        }
    }
    if (cond2) {
        for (let element of document.getElementsByClassName("satellite-style")) {
            if (element.id == sC.currentTime) {
                element.style.background = "#ff1493";
            }
            else {
                element.style.background = "#ff69b4";
            }
        }
    }
}

function enterChaosMode(heading) {
    if (heading === -999) {
        try {
            heading = GooglePlayer.getPhotographerPov().heading;
        }
        catch (e) {
            heading = 0;
        }
    }
    setTimeout(
        function () {
            let hdn = heading;
            let pch = GooglePlayer.getPhotographerPov().pitch;
            if (randomSpecial) {
                hdn = Math.random() * 360;
            }
            else if (skewedSpecial) {
                hdn = (GooglePlayer.getPhotographerPov().heading + 90) % 360;
            }

            if (randomSpecial) {
                pch = Math.random() * 180 - 90;
            }
            else if (soilSpecial) {
                pch = -60;
            }
            else if (skySpecial) {
                pch = 90;
            }
            GooglePlayer.setPov({ heading: hdn, pitch: pch });
        }
        , 300);
    setTimeout(function () {
        let zmn = 0;
        if (randomSpecial) {
            zmn = Math.random() * 3;
        }
        else if (zoomSpecial) {
            zmn = 4;
        }
        GooglePlayer.setZoom(zmn);
    }, 300);
}



function UnityInitiate() {
    const google = window.google;
    let curPosition;

    ZoomControls();

    // used for the "Teleport" feature
    function svCheck(data, status) {
        if (status === 'OK') {
            // console.log("STATUS OK");
            let l = data.location.latLng.toString().split(',');
            let lat = l[0].replaceAll('(', '');
            let lng = l[1].replaceAll(')', '');
            if (lat == curPosition.lat && lng == curPosition.lng && !switch_call) {
                console.log("Trying more distance");
                teleportMain.distance += 100;
                teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
            }
            else {
                // console.log("Teleport Success");
                let hd = 0;
                GooglePlayer.setPosition(data.location.latLng);
                if (hd !== 0) {
                    GooglePlayer.setPov({
                        heading: hd,
                        pitch: 0,
                    })
                }
                else {
                    GooglePlayer.setPov({
                        heading: 0,  // TODO: this sucks but it used to be stored on the switch coverage button??
                        pitch: 0,
                    })
                }
                if (teleportMain.distance > 150) {
                    teleportMain.distance = 100;
                    teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
                }
            }
            switch_call = false;
        }
        else {
            console.log("STATUS NOT OK");
            teleportMain.distance += 100;
            teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
        }
    }

    // override the map constructor
    google.maps.Map = class extends google.maps.Map {
        constructor(...args) {
            super(...args);
            if (GeoJsonCustomUser) {
                if (GeoJsonCustomUser) {
                    this.data.addGeoJson(CUSTOM_GEOJSON);
                }
                this.data.setStyle(function (feature) {
                    return GEOJSON_STYLE
                });
            }
            if (OverlayCustom) {
                let customOverlay = new google.maps.GroundOverlay(OVERLAY_URL, OVERLAY_BOUNDS, OVERLAY_STYLE);
                customOverlay.setMap(this);
            }

            for (let mapDiv of document.getElementsByClassName("preset-minimap")) {
                google.maps.event.addDomListener(mapDiv, "click", () => {

                    MinimapBtn.current = mapDiv.id;
                    if (mapDiv.id == "Hybrid") {
                        this.setMapTypeId('hybrid');
                    }
                    else if (mapDiv.id == "Terrain") {
                        this.setMapTypeId('terrain');
                    }
                    else if (mapDiv.id == "Satellite") {
                        this.setMapTypeId('satellite');
                    }
                    else if (mapDiv.id == "Custom") {
                        this.setMapTypeId(customMode);
                    }
                    else {
                        this.setMapTypeId('roadmap');
                    }
                    for (let ar of presetMinimap) {
                        if (ar[1] == mapDiv.id) {
                            this.set('styles', ar[0]);
                        }
                    }
                    for (let element of document.getElementsByClassName("preset-minimap")) {
                        if (element.id == MinimapBtn.current) {
                            element.style.background = "#ff1493";
                        }
                        else {
                            element.style.background = "#ff69b4";
                        }
                    }
                });
            }

            for (let mapDiv of document.getElementsByClassName("overlay-minimap")) {
                google.maps.event.addDomListener(mapDiv, "click", () => {
                    OverlayBtn.current = mapDiv.id;
                    if (!mapDiv.loaded) {
                        this.data.loadGeoJson(mapDiv.url, {
                            id: mapDiv.id
                        });
                        mapDiv.loaded = true;
                    }
                    if (mapDiv.id == "Clear") {
                        this.overlayMapTypes.clear();
                        this.data.setStyle(function (feature) {
                            return GEOJSON_INVISIBLE
                        });
                        for (let element of document.getElementsByClassName("overlay-minimap")) {
                            if (element.id === "Clear") {
                                element.style.background = "#ff1493";
                            }
                            else {
                                element.style.background = "#ff69b4";
                                if (["Coverage", "Official", "City Lights", "OSM", "Watercolor", "Toner", "Fire"].includes(element.id)) {
                                    element.loaded = false;
                                }
                            }
                        }
                    }
                    else {
                        if (["Coverage", "Official", "City Lights", "OSM", "Watercolor", "Toner", "Fire"].includes(mapDiv.id)) {
                            this.overlayMapTypes.clear();
                            const coverageLayer = new google.maps.ImageMapType({
                                getTileUrl({ x, y }, z) {

                                    // Omits photospheres
                                    // return `https://mts1.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=5,8&x=${x}&y=${y}&z=${z}`

                                    // Omits unofficial and trekker, but also half of mongolia

                                    if (mapDiv.id == "Official") {
                                        return `https://mts1.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:app&style=5,8&x=${x}&y=${y}&z=${z}`
                                    }
                                    else if (mapDiv.id == "OSM") {
                                        return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
                                    }
                                    else if (mapDiv.id == "City Lights") {
                                        return `https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/GoogleMapsCompatible_Level8/${z}/${y}/${x}.jpg`
                                    }
                                    else if (mapDiv.id == "Watercolor") {
                                        return `https://stamen-tiles.a.ssl.fastly.net/watercolor/${z}/${x}/${y}.jpg`
                                    }
                                    else if (mapDiv.id == "Toner") {
                                        return `https://stamen-tiles.a.ssl.fastly.net/toner/${z}/${x}/${y}.png`
                                    }
                                    else if (mapDiv.id == "Fire") {
                                        return `https://tile.thunderforest.com/spinal-map/${z}/${x}/${y}.png?apikey=1360c6d2440c4202bf725238d1b9c761`
                                    }
                                    // return `https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m8!1e2!2ssvv!4m2!1scb_client!2sapp!4m2!1scc!2s*211m3*211e3*212b1*213e2*211m3*211e2*212b1*213e2!3m3!3sUS!12m1!1e68!4e0`

                                    // Includes everything
                                    else if (mapDiv.id == "Coverage") {
                                        return `https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m8!1e2!2ssvv!4m2!1scb_client!2sapiv3!4m2!1scc!2s*211m3*211e3*212b1*213e2*211m3*211e2*212b1*213e2!3m3!3sUS!12m1!1e68!4e0`
                                    }
                                },
                                maxZoom: 20,
                                tileSize: new google.maps.Size(256, 256),
                            })
                            this.overlayMapTypes.push(coverageLayer);

                            for (let element of document.getElementsByClassName("overlay-minimap")) {
                                if (["Clear", "City Lights", "Watercolor", "Toner", "Fire"].includes(element.id)) {
                                    element.style.background = "#ff69b4";
                                    element.loaded = false;
                                }
                                if (["Coverage", "Official", "OSM"].includes(element.id)) {
                                    if (!rtded) {
                                        element.style.background = "#ff69b4";
                                        element.loaded = false;
                                    }
                                }
                            }
                            mapDiv.style.background = "#ff1493";
                            mapDiv.loaded = true;
                        }
                        else {
                            this.data.setStyle(function (feature) {
                                return GEOJSON_STYLE
                            });
                            for (let element of document.getElementsByClassName("overlay-minimap")) {
                                if (element.id !== "Clear" && element.loaded) {
                                    element.style.background = "#ff1493";
                                }
                                else {
                                    element.style.background = "#ff69b4";
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    const svService = new google.maps.StreetViewService();
    google.maps.StreetViewPanorama = class extends google.maps.StreetViewPanorama {
        constructor(...args) {
            super(...args);
            GooglePlayer = this;

            const isGamePage = () => location.pathname.startsWith("/challenge/") || location.pathname.startsWith("/results/") ||
                location.pathname.startsWith("/game/") || location.pathname.startsWith("/battle-royale/") ||
                location.pathname.startsWith("/duels/") || location.pathname.startsWith("/team-duels/") || location.pathname.startsWith("/bullseye/")
                || location.pathname.startsWith("/live-challenge/");

            this.addListener('position_changed', () => {
                // Maybe this could be used to update the position in the other players
                // so that they are always in sync
                try {
                    if (!isGamePage()) return;
                    // timeMachineBtn.panoId = GooglePlayer.pano;
                    // timeMachineBtn.index = -1;
                    const lat = this.getPosition().lat();
                    const lng = this.getPosition().lng();
                    const { heading, pitch } = this.getPov();

                    if (skySpecial || soilSpecial || skewedSpecial || zoomSpecial || randomSpecial) {
                        enterChaosMode(heading);
                    }

                    curPosition = { lat, lng, heading };

                    if (!timeMachineBtn.list.some(row => row.includes(GooglePlayer.pano))) {
                        timeMachineBtn.innerHTML = "Time Machine";
                        timeMachineBtn.panoId = GooglePlayer.pano;
                        timeMachineBtn.index = -1;
                        timeMachineBtn.plusminusLock = true;
                        timeMachineNewerBtn.style.backgroundColor = "red";
                        timeMachineNewerBtn.disabled = true;
                        timeMachineOlderBtn.style.backgroundColor = "red";
                        timeMachineOlderBtn.disabled = true;
                    }
                    teleportMain.google = true;


                    if (restrictMovement) {
                        let dist = distance(lat, lng, global_lat, global_lng);
                        if (dist > RestrictBoundsBtn.maxDist) {
                            let prevD = distance(RestrictBoundsBtn.lat, RestrictBoundsBtn.lng, global_lat, global_lng);
                            if (prevD > RestrictBoundsBtn.maxDist) {
                                svService.getPanorama({ location: { lat: global_lat, lng: global_lng }, radius: 1000 }, svCheck);
                                RestrictBoundsBtn.lng = global_lng;
                                RestrictBoundsBtn.lat = global_lat;
                            }
                            else {
                                svService.getPanorama({ location: { lat: RestrictBoundsBtn.lat, lng: RestrictBoundsBtn.lng }, radius: 1000 }, svCheck);
                            }
                        }
                        else {
                            RestrictBoundsBtn.lng = lng;
                            RestrictBoundsBtn.lat = lat;
                        }
                        let d = Math.round(distance(RestrictBoundsBtn.lat, RestrictBoundsBtn.lng, global_lat, global_lng));
                        let pct = Math.round((d / RestrictBoundsBtn.maxDist * 100));
                        RestrictBoundsBtn.innerHTML = "<font size=2>Straight Line Distance: " + d + "m (" + pct + "%)</font>";
                    }
                }
                catch (e) {
                    console.error("Error:", e);
                }
            });
        }
    };

    var mainMenuBtn = document.createElement("Button");
    mainMenuBtn.classList.add("unity-btn", "main-btn");
    mainMenuBtn.id = "Show Buttons";
    mainMenuBtn.hide = true;
    mainMenuBtn.menuBtnCache = true;
    mainMenuBtn.innerHTML = "<font size=2>Unity<br><font size=1>v7.0.1</font>";
    mainMenuBtn.style =
        "border-radius: 10px;visibility:hidden;height:2.5em;position:absolute;z-index:99999;background-repeat:no-repeat;background-image:linear-gradient(180deg, #0066cc 50%, #ffcc00 50%);border: none;color: white;padding: none;text-align: center;vertical-align: text-top;text-decoration: none;display: inline-block;font-size: 16px;line-height: 15px;";
    // document.querySelector(".game-layout__status").appendChild(mainMenuBtn)
    document.body.appendChild(mainMenuBtn);
    mainMenuBtn.addEventListener("click", () => {
        if (mainMenuBtn.hide) {
            for (let element of document.getElementsByClassName("unity-btn")) {
                if (element.classList.contains("menu-btn")) {
                    element.style.visibility = "";
                }
            }
            mainMenuBtn.menuBtnCache = true;
            mainMenuBtn.hide = false;
        }
        else {
            hideOtherBtn();
            mainMenuBtn.menuBtnCache = false;
            mainMenuBtn.hide = true;
        }
    });


    var infoBtn = document.createElement("Button");
    infoBtn.classList.add("unity-btn", "info-btn", "full", "vertical-1", "extra-height");
    infoBtn.id = "Info Button";
    infoBtn.innerHTML = "Geoguessr Unity Script<font size=1><br>&#169; Jupaoqq | v7.0.1</font>";
    document.body.appendChild(infoBtn);
    //     infoBtn.addEventListener("click", () => {
    //         window.open('https://docs.google.com/document/d/18nLXSQQLOzl4WpUgZkM-mxhhQLY6P3FKonQGp-H0fqI/edit?usp=sharing');
    //     });

    var HelpBtn = document.createElement("Button");
    HelpBtn.classList.add("unity-btn", "info-btn", "half", "horizontal-1", "vertical-3");
    HelpBtn.id = "Help Button";
    HelpBtn.innerHTML = "Help & Credits";

    document.body.appendChild(HelpBtn);
    HelpBtn.addEventListener("click", () => {
        window.open('https://docs.google.com/document/d/18nLXSQQLOzl4WpUgZkM-mxhhQLY6P3FKonQGp-H0fqI/edit?usp=sharing');
    });

    var UpdateBtn = document.createElement("Button");
    UpdateBtn.classList.add("unity-btn", "info-btn", "half", "horizontal-2", "vertical-3");
    UpdateBtn.id = "Update Button";
    UpdateBtn.innerHTML = "Check Update";

    document.body.appendChild(UpdateBtn);
    UpdateBtn.addEventListener("click", () => {
        window.open('https://greasyfork.org/en/scripts/436813-geoguessr-unity-script');
    });

    var menuResetBtn = document.createElement("Button");
    menuResetBtn.classList.add("unity-btn", "info-btn", "large", "vertical-4");
    menuResetBtn.id = "Menu Reset";
    menuResetBtn.innerHTML = "Menu Position";
    document.body.appendChild(menuResetBtn);
    menuResetBtn.addEventListener("click", () => {
        menuLocCounter = 0;
        btnAll();
    });

    var menuUpBtn = document.createElement("Button");
    menuUpBtn.classList.add("unity-btn", "info-btn", "small", "horizontal-1", "vertical-4");
    menuUpBtn.id = "Menu Up";
    menuUpBtn.innerHTML = "↑";
    document.body.appendChild(menuUpBtn);
    menuUpBtn.addEventListener("click", () => {
        AdjustBtnPos("-2em", "0em", false);
        menuLocCounter++;
    });

    var menuDownBtn = document.createElement("Button");
    menuDownBtn.classList.add("unity-btn", "info-btn", "small", "horizontal-3", "vertical-4");
    menuDownBtn.id = "Menu down";
    menuDownBtn.innerHTML = "↓";
    document.body.appendChild(menuDownBtn);
    menuDownBtn.addEventListener("click", () => {
        AdjustBtnPos("2em", "0em", false);
        menuLocCounter--;
    });

    var infoMenu = document.createElement("Button");
    infoMenu.classList.add("unity-btn", "menu-btn");
    infoMenu.classList.add();
    infoMenu.id = "Info Menu";
    //     infoMenu.innerHTML = "In";
    document.body.appendChild(infoMenu);
    infoMenu.addEventListener("click", () => {
        switchBtn("info-btn");
        if (menuDownBtn.style.visibility == "hidden") {
            for (let element of document.getElementsByClassName("info-btn")) {
                element.style.visibility = "";
            }
        }
        else {
            for (let element of document.getElementsByClassName("info-btn")) {
                element.style.visibility = "hidden";
            }
        }
    });

    function handleCountries(locStr) {
        let locStr2 = "";

        let hardCode = { "Finland": 3, "United Kingdom": 3, "France": 3, "Czech": 3, "Slovakia": 3 };
        if (["Finland", "United Kingdom", "France", "Czech", "Slovakia"].some(v => locStr.includes(v))) {
            let ll = locStr.split(",");
            for (let [key, value] of Object.entries(hardCode)) {
                if (locStr.includes(key)) {
                    for (let ct = 0; ct < value; ct++) {
                        if (ct < ll.length) {
                            locStr2 = locStr2 + ll[ct] + " ";
                        }
                    }
                }
            }
        }
        else if (["Poland", "Brazil", "Denmark"].some(v => locStr.includes(v))) {
            let ll = locStr.split(",");
            // console.log(ll);
            for (let ct = 0; ct < ll.length; ct++) {
                if (!["gmina", "Region"].some(v => ll[ct].includes(v))) {
                    locStr2 = locStr2 + ll[ct] + " ";
                }
            }
        }
        else if (["Russia"].some(v => locStr.includes(v))) {
            let ll = locStr.split(",");
            let index = 0;
            for (let ct1 = ll.length - 1; ct1 >= 0; ct1--) {
                if (["District", "district", "Oblast", "Krai", "Municipality", "Urban Okrug"].some(v => ll[ct1].includes(v)) && !["Federal District"].some(v => ll[ct1].includes(v))) {
                    index = ct1;
                }
            }
            if (locStr.includes("Amur")) {
                index = 0;
            }
            for (let ct = index; ct < ll.length; ct++) {
                if (!["Federal District"].some(v => ll[ct].includes(v))) {
                    locStr2 = locStr2 + ll[ct] + " ";
                }
            }
        }
        else {
            locStr2 = locStr;
        }

        const toStrip = ["Região Geográfica Intermediária de", "Região Geográfica Imediata de", "Região Imediata de", "Região Metropolitana de",
            "Voivodeship", "okres", "kraj", "Oblast", "Krai", "Urban Okrug", "Hromada", "Urban Hromada", "Raion", "Settlement",
            "Metropolitan Municipality", "Municipality", "Municipal", "Administrative", "District", "Subdistrict", "Province", "Regional", "Council", "Township", "Department", "Local",
            "Département de", "Arrondissement de", "Communauté rurale de",
            "Municipio de", "Municipio", "Departamento", "Provincia de", "Provincia", " of"];
        toStrip.forEach(x => {
            locStr2 = locStr2.replaceAll(x, '');
        });

        if (!locStr2.includes("United States")) {
            locStr2 = locStr2.replaceAll("County", '');
        }

        if (!locStr2.includes("Botswana")) {
            locStr2 = locStr2.replaceAll("Region", '');
        }

        return locStr2;
    }

    // Teleport Module Buttons
    // Class: teleport-btn
    // Button: teleportMenu
    // Buttons: teleportForward, teleportReverse, teleportMain, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, TeleportArisBtn

    function teleportModule(dir) {
        // console.log(teleportMenu.google)
        if (teleportMain.google && GooglePlayer != null) {
            let heading = GooglePlayer.getPov().heading;
            if (!dir) {
                heading = (heading + 180) % 360;
            }
            let place = FindPointAtDistanceFrom(curPosition.lat, curPosition.lng, DegreesToRadians(heading), teleportMain.distance * 0.001)
            svService.getPanorama({ location: place, radius: 1000, source: teleportMain.teleType }, svCheck);
        }
    }

    var teleportForward = document.createElement("Button");
    teleportForward.classList.add("unity-btn", "teleport-btn", "half", "horizontal-1", "vertical-1");
    teleportForward.id = "Teleport Forward";
    teleportForward.innerHTML = "↑ Forward";
    document.body.appendChild(teleportForward);

    teleportForward.addEventListener("click", () => {
        teleportModule(true);
    });

    var teleportReverse = document.createElement("Button");
    teleportReverse.classList.add("unity-btn", "teleport-btn", "half", "horizontal-2", "vertical-1");
    teleportReverse.id = "Teleport Reverse";
    teleportReverse.innerHTML = "↓ Reverse";
    document.body.appendChild(teleportReverse);

    teleportReverse.addEventListener("click", () => {
        teleportModule(false);
    });

    var teleportMain = document.createElement("Button");
    teleportMain.classList.add("unity-btn", "teleport-btn", "large", "vertical-2");
    teleportMain.teleType = "default";
    teleportMain.id = "Teleport Button";
    teleportMain.distance = 100;
    teleportMain.google = true;
    teleportMain.innerHTML = "Teleport: 100m";
    document.body.appendChild(teleportMain);

    var teleportMoreBtn = document.createElement("Button");
    teleportMoreBtn.classList.add("unity-btn", "teleport-btn", "small", "horizontal-3", "vertical-2");
    teleportMoreBtn.id = "plus"
    teleportMoreBtn.innerHTML = "+";
    document.body.appendChild(teleportMoreBtn);
    teleportMoreBtn.addEventListener("click", () => {
        if (teleportMain.distance > 21 && teleportMain.distance < 149) {
            teleportMain.distance = teleportMain.distance + 25;
        }
        teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
    });

    var teleportLessBtn = document.createElement("Button");
    teleportLessBtn.classList.add("unity-btn", "teleport-btn", "small", "horizontal-1", "vertical-2");
    teleportLessBtn.id = "minus"
    teleportLessBtn.innerHTML = "-";
    document.body.appendChild(teleportLessBtn);
    teleportLessBtn.addEventListener("click", () => {
        if (teleportMain.distance > 26) {
            teleportMain.distance = teleportMain.distance - 25;
        }
        teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
    });

    var teleportDistResetBtn = document.createElement("Button");
    teleportDistResetBtn.classList.add("unity-btn", "teleport-btn", "half", "horizontal-1", "vertical-3");
    teleportDistResetBtn.id = "reset"
    teleportDistResetBtn.innerHTML = "Reset Teleport";
    document.body.appendChild(teleportDistResetBtn);
    teleportDistResetBtn.addEventListener("click", () => {
        teleportMain.distance = 100;
        teleportMain.innerHTML = "Teleport: " + teleportMain.distance + " m";
    });

    var TeleportArisBtn = document.createElement("Button");
    TeleportArisBtn.classList.add("unity-btn", "teleport-btn", "half", "horizontal-2", "vertical-3");
    TeleportArisBtn.id = "Teleport Options Button";
    TeleportArisBtn.innerHTML = "+ Unofficial";
    document.body.appendChild(TeleportArisBtn);
    TeleportArisBtn.addEventListener("click", () => {
        if (teleportMain.teleType == "default") {
            teleportMain.teleType = "outdoor"
            TeleportArisBtn.innerHTML = "No Unofficial";
        }
        else {
            teleportMain.teleType = "default"
            TeleportArisBtn.innerHTML = "+ Unofficial";
        }
    });


    var RestrictBoundsBtn = document.createElement("Button");
    RestrictBoundsBtn.classList.add("unity-btn", "teleport-btn", "full", "horizontal-1", "vertical-4");
    RestrictBoundsBtn.id = "Restrict Bounds Main";
    RestrictBoundsBtn.innerHTML = "No Escape Mode Disabled";
    RestrictBoundsBtn.lat = 0;
    RestrictBoundsBtn.lng = 0;
    RestrictBoundsBtn.maxDist = 250;
    document.body.appendChild(RestrictBoundsBtn);


    var RestrictBoundsDistBtn = document.createElement("Button");
    RestrictBoundsDistBtn.classList.add("unity-btn", "teleport-btn", "large", "vertical-5");
    RestrictBoundsDistBtn.id = "Restrict Distance";
    RestrictBoundsDistBtn.innerHTML = "Limit: 250m";
    document.body.appendChild(RestrictBoundsDistBtn);

    var RestrictMoreBtn = document.createElement("Button");
    RestrictMoreBtn.classList.add("unity-btn", "teleport-btn", "small", "horizontal-3", "vertical-5");
    RestrictMoreBtn.id = "Increase Restrict Distance";
    RestrictMoreBtn.innerHTML = "+";
    document.body.appendChild(RestrictMoreBtn);
    RestrictMoreBtn.addEventListener("click", () => {
        if (RestrictBoundsBtn.maxDist > 49 && RestrictBoundsBtn.maxDist < 249) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist + 50;
        }
        else if (RestrictBoundsBtn.maxDist > 249 && RestrictBoundsBtn.maxDist < 999) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist + 250;
        }
        else if (RestrictBoundsBtn.maxDist > 999 && RestrictBoundsBtn.maxDist < 9999) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist + 1000;
        }
        else if (RestrictBoundsBtn.maxDist > 9999) {
            RestrictBoundsBtn.maxDist = 100000000;
        }
        if (RestrictBoundsBtn.maxDist < 10001) {
            RestrictBoundsDistBtn.innerHTML = "Limit: " + RestrictBoundsBtn.maxDist + "m";
        }
        else {
            RestrictBoundsDistBtn.innerHTML = "Limit: &#8734;";
        }
    });

    var RestrictLessBtn = document.createElement("Button");
    RestrictLessBtn.classList.add("unity-btn", "teleport-btn", "small", "horizontal-1", "vertical-5");
    RestrictLessBtn.id = "Decrease Restrict Distance";
    RestrictLessBtn.innerHTML = "-";
    document.body.appendChild(RestrictLessBtn);
    RestrictLessBtn.addEventListener("click", () => {
        if (RestrictBoundsBtn.maxDist > 51 && RestrictBoundsBtn.maxDist < 251) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist - 50;
        }
        else if (RestrictBoundsBtn.maxDist > 251 && RestrictBoundsBtn.maxDist < 1001) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist - 250;
        }
        else if (RestrictBoundsBtn.maxDist > 1001 && RestrictBoundsBtn.maxDist < 10001) {
            RestrictBoundsBtn.maxDist = RestrictBoundsBtn.maxDist - 1000;
        }
        else if (RestrictBoundsBtn.maxDist > 10001) {
            RestrictBoundsBtn.maxDist = 10000;
        }
        if (RestrictBoundsBtn.maxDist < 10001) {
            RestrictBoundsDistBtn.innerHTML = "Limit: " + RestrictBoundsBtn.maxDist + "m";
        }
        else {
            RestrictBoundsDistBtn.innerHTML = "Limit: &#8734;";
        }
    });

    var RestrictBoundsEnableBtn = document.createElement("Button");
    RestrictBoundsEnableBtn.classList.add("unity-btn", "teleport-btn", "half", "horizontal-2", "vertical-6");
    RestrictBoundsEnableBtn.id = "Restrict Bounds Enable";
    RestrictBoundsEnableBtn.innerHTML = "Enable Limit";
    document.body.appendChild(RestrictBoundsEnableBtn);
    RestrictBoundsEnableBtn.addEventListener("click", () => {
        if (restrictMovement) {
            restrictMovement = false;
            RestrictBoundsEnableBtn.innerHTML = "Enable Limit";
            RestrictBoundsBtn.innerHTML = "No Escape Mode Disabled";
        }
        else {
            restrictMovement = true;
            RestrictBoundsEnableBtn.innerHTML = "Disable Limit";
            RestrictBoundsBtn.innerHTML = "No Escape Mode Enabled";
        }
    });

    var RestrictResetBtn = document.createElement("Button");
    RestrictResetBtn.classList.add("unity-btn", "teleport-btn", "half", "horizontal-1", "vertical-6");
    RestrictResetBtn.id = "Restrict Distance Reset";
    RestrictResetBtn.innerHTML = "Reset Limit";
    document.body.appendChild(RestrictResetBtn);
    RestrictResetBtn.addEventListener("click", () => {
        RestrictBoundsBtn.maxDist = 250;
        RestrictBoundsDistBtn.innerHTML = "Limit: " + RestrictBoundsBtn.maxDist + "m";
    });


    var timeMachineNewerBtn = document.createElement("Button");
    timeMachineNewerBtn.classList.add("unity-btn", "timemachine-btn", "small", "horizontal-3", "vertical-2");
    timeMachineNewerBtn.id = "plus year"
    timeMachineNewerBtn.innerHTML = "+";
    document.body.appendChild(timeMachineNewerBtn);
    timeMachineNewerBtn.addEventListener("click", () => {
        if (timeMachineBtn.index < timeMachineBtn.list.length - 1 && !timeMachineBtn.plusminusLock) {
            timeMachineBtn.index = timeMachineBtn.index + 1;
            GooglePlayer.setPano(timeMachineBtn.list[timeMachineBtn.index][0]);
            timeMachineBtn.innerHTML = "<font size=2>[" + (timeMachineBtn.index + 1) + "] " + timeMachineBtn.list[timeMachineBtn.index][1] + "</font>";
            // console.log(timeMachineBtn.index)
        }
        GenBtnColor();

    });

    var timeMachineOlderBtn = document.createElement("Button");
    timeMachineOlderBtn.classList.add("unity-btn", "timemachine-btn", "small", "horizontal-1", "vertical-2");
    timeMachineOlderBtn.id = "minus year"
    timeMachineOlderBtn.innerHTML = "-";
    document.body.appendChild(timeMachineOlderBtn);
    timeMachineOlderBtn.addEventListener("click", () => {
        if (timeMachineBtn.index > 0 && !timeMachineBtn.plusminusLock) {
            timeMachineBtn.index = timeMachineBtn.index - 1;
            GooglePlayer.setPano(timeMachineBtn.list[timeMachineBtn.index][0]);
            timeMachineBtn.innerHTML = "<font size=2>[" + (timeMachineBtn.index + 1) + "] " + timeMachineBtn.list[timeMachineBtn.index][1] + "</font>";
            // console.log(timeMachineBtn.index)
        }
        GenBtnColor();
    });

    function svCheck2(data, status) {
        let l = []
        if (status === 'OK') {
            // console.log("OK for " + data.location.latLng + " at ID " + data.location.pano);
            // console.log(data.time)
            for (const alt of data.time) {
                let date = Object.values(alt).find((value) => value instanceof Date)

                l.push([alt.pano, date.toDateString()]);
            }
            // console.log(l);
            timeMachineBtn.list = l
            timeMachineBtn.index = l.length - 1;
            timeMachineBtn.innerHTML = "<font size=2>[" + (timeMachineBtn.index + 1) + "] " + timeMachineBtn.list[timeMachineBtn.index][1] + "</font>";
            GenBtnColor();
            timeMachineBtn.plusminusLock = false;
            // timeMachineOlderBtn.click()
            // timeMachineBtn.innerHTML = "Default Date";
        }
    }

    function waitPopulate() {
        // console.log(timeMachineBtn.list);
        if (timeMachineBtn.list.length !== 0) {
            timeMachineBtn.index = timeMachineBtn.list.length - 1;
            GooglePlayer.setPano(timeMachineBtn.list[timeMachineBtn.index][0]);
        }
        else {
            setTimeout(waitPopulate, 250);
        }
    }

    var timeMachineBtn = document.createElement("Button");
    timeMachineBtn.classList.add("unity-btn", "timemachine-btn", "large", "vertical-2");
    timeMachineBtn.id = "Date Button";
    timeMachineBtn.plusminusLock = true;
    timeMachineBtn.panoId = 0;
    timeMachineBtn.index = -1;
    timeMachineBtn.list = [];
    timeMachineBtn.innerHTML = "Time Machine";
    document.body.appendChild(timeMachineBtn);
    timeMachineBtn.addEventListener("click", () => {
        // console.log(timeMachineBtn.index)
        if (timeMachineBtn.panoId != 0) {
            if (timeMachineBtn.index == -1) {
                timeMachineBtn.list = [];
                svService.getPanorama({ pano: timeMachineBtn.panoId }, svCheck2);
                waitPopulate();
            }
            else {
                waitPopulate();
                timeMachineBtn.innerHTML = "<font size=2>[" + (timeMachineBtn.index + 1) + "] " + timeMachineBtn.list[timeMachineBtn.index][1] + "</font>";
                GenBtnColor();
            }
        }
        else {
            timeMachineBtn.panoId = GooglePlayer.pano;
            svService.getPanorama({ pano: timeMachineBtn.panoId }, svCheck2);
            waitPopulate();
        }
    });


    var timeMachineMenu = document.createElement("Button");
    timeMachineMenu.classList.add("unity-btn", "menu-btn");
    timeMachineMenu.id = "Time Machine Button";
    document.body.appendChild(timeMachineMenu);
    timeMachineMenu.addEventListener("click", () => {
        switchBtn("timemachine-btn");
        if (timeMachineBtn.style.visibility == "hidden") {
            for (let element of document.getElementsByClassName("timemachine-btn")) {
                element.style.visibility = "";
            }
        }
        else {
            for (let element of document.getElementsByClassName("timemachine-btn")) {
                element.style.visibility = "hidden";
            }
        }
    });


    var teleportMenu = document.createElement("Button");
    teleportMenu.classList.add("unity-btn", "menu-btn");
    teleportMenu.id = "Teleport Menu";
    document.body.appendChild(teleportMenu);
    teleportMenu.addEventListener("click", () => {
        switchBtn("teleport-btn");
        if (teleportForward.style.visibility == "hidden") {
            for (let element of document.getElementsByClassName("teleport-btn")) {
                element.style.visibility = "";
            }
        }
        else {
            for (let element of document.getElementsByClassName("teleport-btn")) {
                element.style.visibility = "hidden";
            }
        }
    });

    // Satellite Module Buttons
    // Class: satelliteSwitchButton, satellite-menu
    // subclass 1: satellite-btn-type
    // subclass 2: satellite-btn-style
    // Buttons: satelliteRadius, satelliteType, satelliteStyle
    // satelliteDefault, satelliteNight, satelliteClassic, roadDefault, roadClassic
    // skyDefault, skyCurrent, skyLocal

    var satelliteTypeBtn = document.createElement("Button");
    satelliteTypeBtn.classList.add("unity-btn", "satellite-btn", "half", "horizontal-1", "vertical-2");
    satelliteTypeBtn.id = "Satellite Type Button";
    satelliteTypeBtn.innerHTML = "Map Style";
    satelliteTypeBtn.currentTime = "solarNoon";
    document.body.appendChild(satelliteTypeBtn);


    var satelliteStyleBtn = document.createElement("Button");
    satelliteStyleBtn.classList.add("unity-btn", "satellite-btn", "half", "horizontal-2", "vertical-2");
    satelliteStyleBtn.id = "Satellite Style Button";
    satelliteStyleBtn.innerHTML = "Time";

    document.body.appendChild(satelliteStyleBtn);



    for (let satT of satType) {
        let satTButton = document.createElement("Button");
        satTButton.id = satT[0];
        satTButton.classList.add("unity-btn", "satellite-btn", "satellite-type", "half", "horizontal-1");
        satTButton.addEventListener("click", () => {
            // let sB = document.getElementById("Satellite Type Button");
            let strNm = satTButton.id;
            let val = getVar(strNm);
            styleMapboxAll(strNm, !val);
            setVar(strNm);
            handleSatColor(true, false);
        })
        document.body.appendChild(satTButton);
    }



    for (let satS of satStyle) {
        let satSButton = document.createElement("Button");
        satSButton.id = satS[0];
        satSButton.classList.add("unity-btn", "satellite-btn", "satellite-style", "half", "horizontal-2");
        satSButton.innerHTML = satS[1];
        satSButton.addEventListener("click", () => {
            styleMapboxAll("SunPos", satSButton.id);
            satelliteTypeBtn.currentTime = satSButton.id;
            handleSatColor(false, true);
        })
        document.body.appendChild(satSButton);
    }



    function handleSatMenu(cond) {
        let transition = true;
        if (cond) {
            transition = (satelliteSwitchButton.innerHTML == "Streetview mode");
        }
        else {
            transition = (satelliteSwitchButton.innerHTML !== "Streetview mode");
        }
        if (transition) {
            for (let element of document.getElementsByClassName("satellite-btn")) {
                if (element.id !== "Satellite Switch") {
                    element.style.visibility = "hidden";
                }
            }
        }
        else {
            for (let element of document.getElementsByClassName("satellite-btn")) {
                if (element.id !== "Satellite Switch") {
                    element.style.visibility = "";
                }
            }
        }
    }

    var satelliteSwitchButton = document.createElement("Button");
    satelliteSwitchButton.classList.add("unity-btn", "satellite-btn", "full", "vertical-1");
    satelliteSwitchButton.id = "Satellite Switch";
    satelliteSwitchButton.state = false;
    satelliteSwitchButton.innerHTML = "Streetview mode";
    document.body.appendChild(satelliteSwitchButton);
    satelliteSwitchButton.addEventListener("click", () => {
        handleSatMenu(false);
        if (!initBing) {
            let di = formatDist();
            //             satelliteRadius.innerHTML = `Satellite (${di})`;
            satelliteSwitchButton.innerHTML = `Satellite (${di})`;

            initBing = true;
            MAPBOX_INJECTED = false;
            BR_LOAD_MP = true;

            let canvas = document.getElementById("sat_map");
            if (!canvas) {
                injectMapboxPlayer();
            }
            else {
                changeInnerHTML(canvas, false);
                MAPBOX_INJECTED = true;
            }
            nextPlayer = "Mapbox Satellite";
            injectCanvas();
            satCallback();

            sat_choice = true;
            console.log("Load Mapbox Satellite API")
            //
        }
        else {
            if (!satelliteSwitchButton.innerHTML.includes("Satellite")) {
                // console.log("true!!")
                let di2 = formatDist();
                satelliteSwitchButton.innerHTML = `Satellite (${di2})`;

                nextPlayer = "Mapbox Satellite";
                injectCanvas();
                satCallback();
                nextPlayer = nextPlayer_save;

                sat_choice = true;
                // console.log("hello")
            }
            else {
                satelliteSwitchButton.innerHTML = "Streetview mode";
                if (nextPlayer_save == "Mapbox Satellite") {
                    nextPlayer = "Google";
                }
                else {
                    nextPlayer = nextPlayer_save;
                }

                injectCanvas();
                if (sat_choice) {
                    if (nextPlayer !== "Google") {
                        goToLocation(true);
                    }
                    handleButtons();
                }
                sat_choice = false;
            }
        }
    });

    var satelliteMenu = document.createElement("Button");
    satelliteMenu.classList.add("unity-btn", "menu-btn");
    satelliteMenu.id = "Satellite Menu";
    document.body.appendChild(satelliteMenu);
    satelliteMenu.addEventListener("click", () => {
        switchBtn("satellite-btn");
        if (satelliteSwitchButton.style.visibility == "hidden") {
            satelliteSwitchButton.style.visibility = "";
            handleSatMenu(true);
        }
        else {
            for (let element of document.getElementsByClassName("satellite-btn")) {
                element.style.visibility = "hidden";
            }
        }

    });


    // Mosaic Module Buttons

    var mosaicMain = document.createElement("Button");
    mosaicMain.classList.add("unity-btn", "mosaic-btn", "full", "vertical-1");
    mosaicMain.id = "Mosaic Enable";
    mosaicMain.grid = 0;
    // mosaicMain.random = false;
    mosaicMain.color = false;
    mosaicMain.label = true;
    // mosaicMain.blink = false;
    mosaicMain.innerHTML = "Mosaic Mode";
    document.body.appendChild(mosaicMain);

    var mosaicGridSize = document.createElement("Button");
    mosaicGridSize.classList.add("unity-btn", "mosaic-btn", "half", "horizontal-2", "vertical-2");
    mosaicGridSize.id = "Mosaic Grid";
    mosaicGridSize.innerHTML = "Grid Size";
    document.body.appendChild(mosaicGridSize);

    let gridWidth = [0, 3, 5, 7, 10, 20, 50, 100];
    for (let i = 0; i < gridWidth.length; i++) {
        let gridButton = document.createElement("Button");
        gridButton.id = `Grid ${gridWidth[i]}`;
        gridButton.classList.add("unity-btn", "mosaic-btn", "grid-size", "half", "horizontal-2");
        if (i !== 0) {
            gridButton.innerHTML = `${gridWidth[i]} x ${gridWidth[i]}`;
        }
        else {
            gridButton.innerHTML = `No Grid`;
        }
        document.body.appendChild(gridButton);
        gridButton.addEventListener("click", () => {
            mosaicMain.color = false;
            mosaicMain.label = true;
            loadGridBtn(gridWidth[i]);
        });
    }

    var mosaicGridOpt = document.createElement("Button");
    mosaicGridOpt.classList.add("unity-btn", "mosaic-btn", "half", "horizontal-1", "vertical-2");
    mosaicGridOpt.id = "Mosaic Options";
    mosaicGridOpt.innerHTML = "Options";
    document.body.appendChild(mosaicGridOpt);

    // ["Blink Mode"]
    let gridOpt = ["Add Color", "Remove Label", "Reveal 5%", "Reveal All", "Peek 0.01s", "Peek 0.1s", "Peek 0.25s", "Peek 0.5s", "Peek 1s", "Peek 3s"];
    for (let i = 0; i < gridOpt.length; i++) {
        let gridButton = document.createElement("Button");
        gridButton.id = `Grid ${gridOpt[i]}`;
        gridButton.classList.add("unity-btn", "mosaic-btn", "grid-opt", "half", "horizontal-1");
        gridButton.innerHTML = `${gridOpt[i]}`;
        document.body.appendChild(gridButton);
        if (gridOpt[i] == "Reveal All") {
            gridButton.addEventListener("click", () => {
                let gridCanvas = document.getElementById("grid");
                if (gridCanvas) {
                    gridCanvas.style.visibility = "hidden";
                }
            });
        }
        else if (gridOpt[i].includes("Peek")) {
            gridButton.addEventListener("click", () => {
                let gridCanvas = document.getElementById("grid");
                if (gridCanvas) {
                    gridCanvas.style.visibility = "hidden";
                    let time = 500;
                    if (gridOpt[i].includes("0.01s")) {
                        time = 10;
                    }
                    else if (gridOpt[i].includes("0.1s")) {
                        time = 100;
                    }
                    else if (gridOpt[i].includes("0.25s")) {
                        time = 250;
                    }
                    else if (gridOpt[i].includes("0.5s")) {
                        time = 500;
                    }
                    else if (gridOpt[i].includes("1s")) {
                        time = 1000;
                    }
                    else if (gridOpt[i].includes("3s")) {
                        time = 3000;
                    }
                    setTimeout(function () { gridCanvas.style.visibility = ""; }, time);
                }
            });
        }
        else if (gridOpt[i] == "Reveal 5%") {
            gridButton.addEventListener("click", () => {
                for (let grid of document.getElementsByClassName("grid-btn")) {
                    let num = Math.random();
                    if (num > 0.95) {
                        grid.style.visibility = "hidden";
                    }
                }
            });
        }
        else if (gridOpt[i] == "Add Color") {
            gridButton.addEventListener("click", () => {
                mosaicMain.color = true;
                for (let grid of document.getElementsByClassName("grid-btn")) {
                    grid.style.background = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                }
            });
        }
        else if (gridOpt[i] == "Remove Label") {
            gridButton.addEventListener("click", () => {
                mosaicMain.label = false;
                for (let grid of document.getElementsByClassName("grid-btn")) {
                    grid.innerHTML = "";
                }
            });
        }
    }

    var mosaicMenu = document.createElement("Button");
    mosaicMenu.classList.add("unity-btn", "menu-btn");
    mosaicMenu.id = "Mosaic Menu";
    document.body.appendChild(mosaicMenu);
    mosaicMenu.addEventListener("click", () => {
        switchBtn("mosaic-btn");
        if (mosaicMain.style.visibility == "hidden") {
            for (let element of document.getElementsByClassName("mosaic-btn")) {
                element.style.visibility = "";
            }
        }
        else {
            for (let element of document.getElementsByClassName("mosaic-btn")) {
                element.style.visibility = "hidden";
            }
        }
    });



    // Minimap Module

    var MinimapBtn = document.createElement("Button");
    MinimapBtn.classList.add("unity-btn", "minimap-btn", "half", "horizontal-2", "vertical-1");
    MinimapBtn.id = "Minimap Button";
    MinimapBtn.innerHTML = "Minimap Style";
    MinimapBtn.current = "Default";
    //     MinimapBtn.childVisible = false;
    document.body.appendChild(MinimapBtn);

    for (let a of presetMinimap) {
        let aButton = document.createElement("Button");
        aButton.id = a[1];
        aButton.classList.add("unity-btn", "minimap-btn", "preset-minimap", "half", "horizontal-2");
        aButton.innerHTML = a[1];
        document.body.appendChild(aButton);
    }

    var OverlayBtn = document.createElement("Button");
    OverlayBtn.classList.add("unity-btn", "minimap-btn", "half", "horizontal-1", "vertical-1");
    OverlayBtn.id = "Overlay Button";
    OverlayBtn.innerHTML = "Overlay";
    OverlayBtn.current = "Clear";
    //     OverlayBtn.childVisible = false;
    document.body.appendChild(OverlayBtn);

    for (let b of presetOverlay) {
        let bButton = document.createElement("Button");
        bButton.id = b[0];
        bButton.url = b[1];
        bButton.loaded = false;
        bButton.classList.add("unity-btn", "minimap-btn", "overlay-minimap", "half", "horizontal-1");
        bButton.innerHTML = b[0];
        document.body.appendChild(bButton);
    }

    var MinimapMenuBtn = document.createElement("Button");
    MinimapMenuBtn.classList.add("unity-btn", "menu-btn");
    MinimapMenuBtn.id = "Minimap Menu Button";
    document.body.appendChild(MinimapMenuBtn);
    MinimapMenuBtn.addEventListener("click", () => {
        switchBtn("minimap-btn");
        if (OverlayBtn.style.visibility !== "hidden") {
            for (let element of document.getElementsByClassName("minimap-btn")) {
                element.style.visibility = "hidden";
            }
        }
        else {
            for (let element of document.getElementsByClassName("minimap-btn")) {
                element.style.visibility = "";
            }
        }
    });


    handleStyles();



    console.log("Script buttons Loaded");
}

function loadNMPZ() {
    let gridBtn = document.createElement("div");
    gridBtn.id = "specialNMPZ";
    //                 visibility: hidden;
    gridBtn.style =
        `
                display: grid;
                gap: 0px;
                top: 0px;
                left: 0px;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                `;
    GAME_CANVAS.appendChild(gridBtn);
}

// Handle Grid Mode

function loadGridBtn(num) {
    let gridCanvas = document.getElementById("grid");
    let reload = false;
    if (!gridCanvas && num !== 0) {
        let gridBtn = document.createElement("div");
        gridBtn.id = "grid";
        //                 visibility: hidden;
        gridBtn.style =
            `
                display: grid;
                gap: 0px;
                top: 0px;
                left: 0px;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                `;
        GAME_CANVAS.appendChild(gridBtn);
        gridCanvas = gridBtn;
        reload = true;
    }

    if (gridCanvas) {
        let mosaicMenu = document.getElementById("Mosaic Enable");
        if (num !== mosaicMenu.grid || reload) {
            console.log("Generate Mosaic tiles");
            gridCanvas.innerHTML = "";
            mosaicMenu.grid = num;
            // cond = true;
            if (num !== 0) {
                gridCanvas.style.visibility = "";
                for (let i = 1; i < num + 1; i++) {
                    for (let ii = 1; ii < num + 1; ii++) {
                        let btn1 = document.createElement("Button");
                        btn1.style =
                            `grid-column: ${ii};
                            grid-row: ${i};
                         `;
                        btn1.classList.add("grid-btn");
                        if (num < 21 && mosaicMenu.label) {
                            btn1.innerHTML = `(${ii}, ${i})`;
                        }
                        btn1.addEventListener("click", () => {
                            btn1.style.visibility = "hidden";
                        });
                        if (mosaicMenu.color) {
                            btn1.style.background = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        }
                        gridCanvas.appendChild(btn1);
                    }
                }
                mosaicMenu.grid = num;
            }
            else {
                gridCanvas.style.visibility = "hidden";

            }

            for (let grid2 of document.getElementsByClassName("grid-size")) {
                grid2.style.background = "#ff69b4";
                if (parseInt(grid2.id.replace(/\D/g, '')) == mosaicMenu.grid) {
                    grid2.style.background = "#ff1493";
                }
            }
        }

        if (num !== 0) {
            gridCanvas.style.visibility = "";
            for (let grid1 of document.getElementsByClassName("grid-btn")) {
                grid1.style.visibility = "";
            }
            mosaicPre = true;
        }
        else {
            mosaicPre = false;
        }
    }
}


function GenBtnColor() {
    let timeMachineOlderBtn = document.getElementById("minus year");
    let timeMachineNewerBtn = document.getElementById("plus year");
    let timeMachineBtn = document.getElementById("Date Button");
    if (timeMachineBtn.index == timeMachineBtn.list.length - 1) {
        timeMachineNewerBtn.style.backgroundColor = "red";
        timeMachineNewerBtn.disabled = true;
    }
    else {
        timeMachineNewerBtn.style.backgroundColor = "#ba55d3";
        timeMachineNewerBtn.disabled = false;
    }
    if (timeMachineBtn.index == 0) {
        timeMachineOlderBtn.style.backgroundColor = "red";
        timeMachineOlderBtn.disabled = true;
    }
    else {
        timeMachineOlderBtn.style.backgroundColor = "#ba55d3";
        timeMachineOlderBtn.disabled = false;
    }
}

/**
 * Handle Keyboard inputs
 */

function kBoard() {
    document.addEventListener('keydown', logKey);
}

function logKey(e) {
    // console.log(e.code);
    let isGamePage2 = ["challenge", "results", "game", "battle-royale", "duels", "team-duels", "bullseye"].some(v => window.location.pathname.includes(v));
    if (isGamePage2) {
        let mainMenuBtn = document.getElementById("Show Buttons");
        if (e.code == "Space") {
            setHidden(true);
        }
        if (e.code == "Digit4") {
            document.getElementById("Teleport Forward").click();
        }
        if (e.code == "Digit3") {
            document.getElementById("Teleport Reverse").click();
        }
        else if (e.code == "Digit5") {
            document.getElementById("minus year").click();
        }
        else if (e.code == "Digit6") {
            document.getElementById("Date Button").click();
        }
        else if (e.code == "Digit7") {
            document.getElementById("plus year").click();
        }
        else if (e.code == "Digit8") {
            if (mainMenuBtn.style.visibility == "hidden") {
                mainMenuBtn.style.visibility = "";
            }
            else {
                mainMenuBtn.style.visibility = "hidden";
            }
        }
        else if (e.code == "Digit9") {
            document.getElementById("Restrict Bounds Main").maxDist = 100000000;
            document.getElementById("Increase Restrict Distance").click();
            if (!document.getElementById("Restrict Bounds Main").enabled) {
                document.getElementById("Restrict Bounds Enable").click();
            }
        }
    }
}


/**
 * Hide or reveal the buttons, and disable buttons if such feature is not available
 */

function setHidden(cond) {
    let teleportBtn = document.getElementById("Teleport Forward");
    let mainMenuBtn = document.getElementById("Show Buttons");
    if (mainMenuBtn != null) {
        mainMenuBtn.style.visibility = "";
        mainMenuBtn.hide = true;
        // console.log(["cache", mainMenuBtn.menuBtnCache]);
        if (cond) {
            if (teleportBtn != null) {
                for (let element of document.getElementsByClassName("unity-btn")) {
                    element.style.visibility = "hidden";
                }
            }
            let iframe = document.getElementById("i_container");
            if (iframe != null) {
                if (!isBattleRoyale) {
                    iframe.src = ""
                }
            }
            //                 else
            //                 {
            //                     // TODO
            //                 }
            //             }

        }
        else {
            for (let element of document.getElementsByClassName("unity-btn")) {
                if (element.id !== "Show Buttons" && !element.classList.contains("menu-btn")) {
                    element.style.visibility = "hidden";
                }
            }
        }
    }
}

function setDisable(cond) {
    let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn] = setButtons();
    let btnList = [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn];

    function setAll(cond1, cond2) {
        for (let btn of btnList) {
            btn.style.backgroundColor = cond1;
            btn.disabled = cond2;
        }
    }

    function setMapstyle(cond1, cond2) {
        for (let mapDiv of document.getElementsByClassName("preset-minimap")) {
            if (["Borders", "Satellite", "Terrain", "Hybrid", "Custom"].includes(mapDiv.id)) {
                mapDiv.style.backgroundColor = cond1;
                mapDiv.disabled = cond2;
            }
        }
        for (let mapDiv2 of document.getElementsByClassName("overlay-minimap")) {
            if (["Coverage", "Official", "OSM"].includes(mapDiv2.id)) {
                mapDiv2.style.backgroundColor = cond1;
                mapDiv2.disabled = cond2;
            }
        }
    }

    if (teleportBtn != null) {
        if (rtded) {
            setAll("red", true);
            setMapstyle("red", true);
        }
        else {
            setMapstyle("#ff69b4", false)
            if (cond === "NMPZ") {
                setAll("red", true);
                if (NZ) {
                    if (ms_radius > 5000) {
                        ms_radius = 5000;
                    }
                }
                if (NM) {
                    if (ms_radius > 2000) {
                        ms_radius = 2000;
                    }
                }
                if (NM && NP && NZ) {
                    if (ms_radius > 1000) {
                        ms_radius = 1000;
                    }
                }
            }
            setAll("#ba55d3", false);
        }
        timeMachineNewerBtn.style.backgroundColor = "red";
        timeMachineNewerBtn.disabled = true;
        timeMachineOlderBtn.style.backgroundColor = "red";
        timeMachineOlderBtn.disabled = true;
    }
}


/**
 * This observer stays alive while the script is running
 */



function launchObserver() {
    UnityInitiate();
    handleTeleport();
    kBoard();
    console.log("Main Observer");
    //     const OBSERVER = new MutationObserver((mutations, observer) => {
    //         detectGamePage();
    //     });
    //     OBSERVER.observe(document.head, { attributes: true, childList: true, subtree: true });
    let observer3 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (oldHref != document.location.href && allowDetect) {
                oldHref = document.location.href;
                detectGamePage();
            }
            if (mutation.removedNodes) {
                for (let m of mutation.removedNodes) {
                    if (m.classList) {
                        let sat = m.getElementsByTagName('sat-map');
                        if (sat.length !== 0) {
                            let sat0 = sat[0];
                            sat0.style.display = "none";
                            // console.log(sat0)
                            sat0.querySelector('.mapboxgl-map').classList.remove("inactive", "game-panorama_panorama__ncMwh", "game-panorama_panorama__IuPsO", "br-game-layout__panorama", "game-layout__panorama", "game-panorama_panorama__rdhFg")
                            document.body.appendChild(sat0);
                        }
                    }
                }
            }
            if (mutation.addedNodes) {
                for (let m of mutation.addedNodes) {
                    // console.log(m);
                    if (m.classList) {
                        // console.log(m)
                        // let sat3 = m.getElementsByClassName("tooltip_tooltip__CHe2s");
                        let PATHNAME = window.location.pathname;
                        // let sat4 = m.getElementsByClassName('fullscreen-spinner_square__mwMfl');
                        // console.log(m.classList.contains('round-starting_wrapper__1G_FC'));
                        if (m.classList.contains("game-layout__panorama-message")) {
                            console.log("Fail to load canvas message")
                            if (allowDetect) {
                                detectGamePage();
                            }
                        }
                        else if (m.getElementsByClassName("tooltip_tooltip__CHe2s").length !== 0) {
                            // console.log("detect setting")
                            let mainMenuBtn = document.getElementById("Show Buttons");
                            if (mainMenuBtn != null) {
                                // console.log("try to show show buttons")
                                mainMenuBtn.style.visibility = "";
                                if (mainMenuBtn.menuBtnCache) {
                                    for (let element of document.getElementsByClassName("menu-btn")) {
                                        element.style.visibility = "";
                                    }
                                }
                            }
                            detectGamePage();
                        }
                        else if ((PATHNAME.startsWith("/challenge/") || PATHNAME.startsWith("/results/") ||
                            PATHNAME.startsWith("/game/") || PATHNAME.startsWith("/battle-royale/") ||
                            PATHNAME.startsWith("/duels/") || PATHNAME.startsWith("/team-duels/") ||
                            PATHNAME.startsWith("/bullseye/")) && (m.getElementsByClassName('fullscreen-spinner_square__mwMfl').length !== 0)) {
                            // console.log("detect spinner")
                            if (allowDetect) {
                                detectGamePage();
                            }
                        }
                        else if ((PATHNAME.startsWith("/duels/") || PATHNAME.startsWith("/team-duels/")) && (m.classList.contains('new-round_roundInfo__UlMCc'))) {
                            // console.log("detect duel")
                            if (allowDetect) {
                                detectGamePage();
                            }
                        }
                        else if (PATHNAME.startsWith("/live-challenge/") && (m.classList.contains('round-starting_wrapper__1G_FC'))) {
                            // console.log("detect live challie")
                            if (allowDetect) {
                                detectGamePage();
                            }
                        }

                        let sat = m.getElementsByClassName('result-layout_bottom__qLPd2');

                        if (m.getElementsByClassName('result-layout_bottom__qLPd2').length !== 0) {
                            // console.log("Round middle Callback");
                            nextButtonCallback();
                        }

                        let sat2 = m.getElementsByClassName('guess-map__canvas-container');
                        if (sat2.length !== 0) {
                            // console.log("Minimap Callback");
                            handleMinimapCallback();
                        }
                    }
                }
            }
        })
    })
    observer3.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false })
}


/**
 * Once the Google Maps API was loaded we can do more stuff
 */

var oldHref = document.location.href;

window.addEventListener('DOMContentLoaded', (event) => {

    if (!document.getElementById("Show Buttons")) {
        injecter(() => {
            launchObserver();
        })
    }
});

const base62 = {
    charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .split(''),
    encode: integer => {
        if (integer === 0) {
            return 0;
        }
        let s = [];
        while (integer > 0) {
            s = [base62.charset[integer % 62], ...s];
            integer = Math.floor(integer / 62);
        }
        return s.join('');
    },
    decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
        prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};


/**
 * Check whether the current page is a game, if so which game mode
 */

function detectGamePage() {
    // console.log("detect game change");
    if (document.querySelector(FAIL_TO_LOAD_CANVAS) !== null && !one_reset) {
        one_reset = true;
        console.log("Hide fail to load panorama canvas");
        document.querySelector(FAIL_TO_LOAD_CANVAS).style.visibility = "hidden";
    }
    function loadModule() {
        // console.log("load module")
        waitLoad();
    }
    const PATHNAME = window.location.pathname;
    // console.log(PATHNAME)
    if (PATHNAME.startsWith("/game/") || PATHNAME.startsWith("/challenge/")) {
        // console.log("Game page");
        isBattleRoyale = false;
        isDuel = false;
        loadModule();
    }
    else if (PATHNAME.startsWith("/battle-royale/")) {
        if (document.querySelector(BR_LAYOUT) == null) {
            // console.log("Battle Royale Lobby");
            rstValues();
        }
        else {
            // console.log("Battle Royale");
            isBattleRoyale = true;
            isDuel = false;
            loadModule();
        }
    }
    else if (PATHNAME.startsWith("/duels/") || PATHNAME.startsWith("/team-duels/")) {
        if (document.querySelector(DUEL_LAYOUT) == null) {
            // console.log("Battle Royale Lobby");
            rstValues();
        }
        else {
            // console.log("Duels");
            isBattleRoyale = true;
            isDuel = true;
            loadModule();
        }
    }
    else if (PATHNAME.startsWith("/bullseye/")) {
        if (document.querySelector(".game_layout__0vAWj") == null) {
            //             console.log("Battle Royale Lobby");
            rstValues();
        }
        else {
            // console.log("bullseye");
            isBattleRoyale = true;
            isBullseye = true;
            // console.log(document.getElementById("player"));
            if (document.getElementById("player") == null) {
                loadModule();
            }
        }
    }
    else if (PATHNAME.startsWith("/live-challenge/")) {
        if (document.querySelector(".panorama-question_layout__wSP7g") == null) {
            // console.log("Battle Royale Lobby");
            rstValues();
        }
        else {
            //             console.log("bullseye");
            isLiveChallenge = true;
            isBattleRoyale = true;
            loadModule();
        }
    }
    else {
        rstValues();
        // console.log("Not a Game page");
    }
}

function rstValues() {
    ROUND = 0;
    nextPlayer = "Google";
    nextPlayer_save = "Google";
    global_lat = 0;
    global_lng = 0;
    global_panoID = null;
    global_cc = null;
    global_BDAh = null;
    global_BDBh = null;
    global_BDID = null;
    yId = null;
    yTime = null;
    yEnd = null;
    iId = null;

    COMPASS = null;
    eventListenerAttached = false;
    povListenerAttached = false;
    playerLoaded = false;
    handleBtwRoundsClear();
    setHidden(true);
    mmKey = 0;
    CURRENT_ROUND_DATA = null;
    ms_radius = 15000;

    isDuel = false;
    isBattleRoyale = false;
    isBullseye = false;
    isLiveChallenge = false;

    rtded = false;

    NM = false;
    NP = false;
    NZ = false;

    GAME_CANVAS = "";
    DUEL_CANVAS = "";
}

/**
 * Wait for various players to load
 */

function btnAll() {
    // console.log([document.querySelector(BULLSEYE_CANVAS), "???"])
    if (document.querySelector(".ticket-bar_root__H8RcX") != null) {
        if (document.querySelector(BR_CANVAS) != null) {
            AdjustBtnPos("-2em + 2px", "300px", true);
        }
        else if (document.querySelector(DUELS_CANVAS) != null) {
            AdjustBtnPos("6em", "0em", true);
        }
        else if (document.querySelector(BULLSEYE_CANVAS) != null) {
            AdjustBtnPos("5em", "18.5em", true);
        }
        else if (document.querySelector(LIVE_CANVAS) != null) {
            AdjustBtnPos("4em", "0em", true);
        }
        else {
            AdjustBtnPos("4em", "0em", true);
        }
    }
    else {
        if (document.querySelector(BR_CANVAS) != null) {
            AdjustBtnPos("-6em + 2px", "300px", true);
        }
        else if (document.querySelector(DUELS_CANVAS) != null) {
            AdjustBtnPos("2em", "0em", true);
        }
        else if (document.querySelector(BULLSEYE_CANVAS) != null) {
            AdjustBtnPos("1em", "18.5em", true);
        }
        else if (document.querySelector(LIVE_CANVAS) != null) {
            AdjustBtnPos("0em", "0em", true);
        }
        else {
            AdjustBtnPos("0em", "0em", true);
        }
    }
    if (menuLocCounter > 0) {
        for (let i = 0; i < menuLocCounter; i++) {
            AdjustBtnPos("-2em", "0em", false);
        }
    }
    else if (menuLocCounter < 0) {
        for (let i = 0; i < -menuLocCounter; i++) {
            AdjustBtnPos("2em", "0em", false);
        }
    }
}

function waitLoad() {
    btnAll();
    checkRound();
}

/**
 * Checks for round changes
 */

function checkRound() {
    //   console.log("Check Round");
    // let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn ] = setButtons();
    if (!isBattleRoyale) {
        // console.log("Check Round");
        let currentRound = getRoundFromPage();
        if (ROUND != currentRound) {
            // fire1 = true;
            console.log("New round");
            ROUND = currentRound;
            // NEW_ROUND_LOADED = true;
            COMPASS = null;
            handleBtwRoundsClear();
            getMapData();
            // nextButtonCallback();
        }
    }
    else {
        getMapData();
    }
}

/**
 * Add listeners if buttons have been created
 */

function finalDetail() {
    let target = document.querySelector("a[data-qa='play-same-map']");
    if (target) {
        var div = document.createElement("div");
        div.classList.add("buttons_buttons__0B3SB")
        document.querySelector('.result-layout_content__jAHfP').appendChild(div);
    }
    else {
        setTimeout(finalDetail, 500);
    }
}

function nextButtonCallback() {
    let nextButton = document.querySelector("button[data-qa='close-round-result']");
    nextButton.addEventListener("click", (e) => {

        if (ROUND == 5) {
            console.log("Game Finished")
        }
    })
}

function guessButtonCallback() {
    // let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn ] = setButtons();
    let guessButton = document.querySelector("button[data-qa='perform-guess']");
    let mainMenuBtn = document.getElementById("Show Buttons");
    if (guessButton != null) {

        guessButton.addEventListener("click", (e) => {
            if (mainMenuBtn != null) {
                console.log("try to hide show buttons")
                mainMenuBtn.style.visibility = "hidden";
                setHidden(true);
            }
        })
    }
    else {
        setTimeout(guessButtonCallback, 1000);
    }
}


function guaranteeUI() {
    // console.log("UI")
    if (document.getElementById("GH-ui") !== null) {
        document.getElementById("GH-ui").style.display = "block";
    }
    else {
        setTimeout(guaranteeUI, 500);
    }
}

/**
 * Handles Return to start and undo
 */

function handleReturnToStart() {
    let rtsButton = document.querySelector("button[data-qa='return-to-start']");
    // console.log("Handle Return to start");
    rtsButton.addEventListener("click", (e) => {
        if (nextPlayer !== "Baidu") {
            goToLocation(true);
        }
        else {
            document.getElementById("i_container").src = "https://map.baidu.com/?panotype=street&pid=" + global_BDID + "&panoid=" + global_BDID + "&from=api";
        }
        const elementClicked = e.target;
        elementClicked.setAttribute('listener', 'true');
        console.log("Return to start");
    });
    guessButtonCallback();
    // setTimeout(function () {goToLocation();}, 1000);
}

function handleUndo() {
    let undoButton = document.querySelector("button[data-qa='undo-move']");
    // console.log("Handle undo");
    undoButton.addEventListener("click", (e) => {
        if (locHistory.length > 0) {
            goToUndoMove();
            console.log("Undo Move");
        }
    })
}

/**
 * Load game information
 */

function satCallback() {
    if (typeof MapboxPlayer.flyTo !== typeof undefined) {
        goToLocation(false);
    }
    else {
        setTimeout(satCallback, 250);
    }
}

function modularget(data) {
    if (data) {
        locationCheck(data);
        goToLocation(true);
        // handleMinimapCallback();
        handleButtons();
    }
}

function getMapData() {
    // myHighlight("Seed data");

    getSeed().then((data) => {
        let mainMenuBtn = document.getElementById("Show Buttons")
        if (isBattleRoyale) {
            if (data.status == "Finished" || typeof data.gameId == typeof undefined) {
                // console.log("Battle Royale Lobby");
            }
            else {
                let origin = false;
                if (!CURRENT_ROUND_DATA) {
                    CURRENT_ROUND_DATA = data
                    origin = true;
                }

                if (origin || !(data.currentRoundNumber === CURRENT_ROUND_DATA.currentRoundNumber)) {
                    // NEW_ROUND_LOADED = true;
                    COMPASS = null;
                    handleBtwRoundsClear();
                    setHidden(false);
                    if (!origin) {
                        CURRENT_ROUND_DATA = data;
                    }
                    modularget(data);
                }
            }
        }
        else {
            modularget(data);
        }

    }).catch((error) => {
        console.log(error);
    });
}

function handleMinimapCallback() {
    // let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn ] = setButtons();
    let MinimapBtn = document.getElementById("Minimap Button");
    if (MinimapBtn) {
        let cur = MinimapBtn.current;
        // console.log(cur)
        for (let mapDiv of document.getElementsByClassName("preset-minimap")) {
            if (cur == mapDiv.id) {
                setTimeout(function () { mapDiv.click(); }, 500);
                setTimeout(function () { mapDiv.click(); }, 1000);
                setTimeout(function () { mapDiv.click(); }, 3000);
            }
        }
    }
    else {
        setTimeout(handleMinimapCallback, 1000);
    }
}

/**
 * Hide unnecessary buttons for non-Google coverages
 */

function handleButtons() {
    let CHECKPOINT = document.querySelector("button[data-qa='set-checkpoint']");
    let ZOOM_IN = document.querySelector("button[data-qa='pano-zoom-in']");
    let ZOOM_OUT = document.querySelector("button[data-qa='pano-zoom-out']");
    let UNDO_MOVE = document.querySelector("button[data-qa='undo-move']");
    let DEFAULT_COMPASS = document.querySelector(".compass");
    let NEW_COMPASS = document.querySelector(".panorama-compass_compassContainer__MEnh0");
    let RETURN_TO_START = document.querySelector("button[data-qa='return-to-start']");

    let C1 = (CHECKPOINT !== null);
    let C2 = (ZOOM_IN !== null);
    let C3 = (ZOOM_OUT !== null);
    let C4 = (UNDO_MOVE !== null);
    let C5 = (DEFAULT_COMPASS !== null);
    let C6 = (NEW_COMPASS !== null);
    let C7 = (RETURN_TO_START !== null);

    let waitCond = C5 || C6;
    let cpCond = true;
    let comCond = true;
    if (!NM) {
        cpCond = C1 && C4 && C7;
    }
    if (!NZ) {
        comCond = C2 && C3;
    }

    function moduleButtons(cond) {

        if (!NM) {
            CHECKPOINT.style.visibility = cond;
            UNDO_MOVE.style.visibility = cond;
        }
        if (!NZ) {
            ZOOM_IN.style.visibility = cond;
            ZOOM_OUT.style.visibility = cond;
        }
        if (C5) {
            DEFAULT_COMPASS.style.visibility = cond;
        }
        if (C6) {
            NEW_COMPASS.style.visibility = cond;
        }
    }

    if (waitCond && cpCond && comCond) {
        // console.log("Handle Buttons");
        moduleButtons("");
    }
    else {
        setTimeout(handleButtons, 250);
    }
}

/**
 * Check which player to use for the next location
 */

function locationCheck(data) {
    // let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn ] = setButtons();
    let round;
    let satelliteSwitchButton = document.getElementById("Satellite Switch");
    // console.log(data)

    if (isBattleRoyale) {
        if (isDuel || isBullseye) {
            round = data.rounds[data.currentRoundNumber - 1].panorama;
            global_cc = round.countryCode;
        }
        else if (isLiveChallenge) {
            round = data.rounds[data.currentRoundNumber - 1].question.panoramaQuestionPayload.panorama;
            global_cc = round.countryCode;
        }
        else {
            round = data.rounds[data.currentRoundNumber - 1];
            global_cc = "us"; // No field available
        }

    }
    else {
        round = data.rounds[data.round - 1];
        global_cc = round.streakLocationCode;
    }

    global_lat = round.lat;
    global_lng = round.lng;
    global_panoID = round.panoId;

    global_heading = round.heading;
    global_pitch = round.pitch;

    //     console.log(data);

    // console.log(global_panoID);

    nextPlayer = "Google";

    function runCheck() {
        console.log("Unnecessary runCheck");
        nextPlayer = "Google";
    }

    // Disable buttons if NM, NMPZ

    if (!isBattleRoyale) {
        NM = data.forbidMoving;
        NP = data.forbidRotating;
        NZ = data.forbidZooming;
    }
    else {
        // console.log(data)
        if (isBullseye || isLiveChallenge) {
            NM = data.options.movementOptions.forbidMoving;
            NP = data.options.movementOptions.forbidRotating;
            NZ = data.options.movementOptions.forbidZooming;
        }
        else {
            NM = data.movementOptions.forbidMoving;
            NP = data.movementOptions.forbidRotating;
            NZ = data.movementOptions.forbidZooming;
        }
    }
    if (NM || NP || NZ) {
        setDisable("NMPZ");
    }
    else {
        setDisable(nextPlayer);
    }

    nextPlayer_save = nextPlayer;


    // console.log("??")
    // console.log(sessionStorage.getItem('Satellite') == "T")
    // console.log(ms_sat_map)
    if (ms_sat_map || (sat_choice && nextPlayer !== "Baidu" && !rtded)) {
        nextPlayer = "Mapbox Satellite";
    }

    if (nextPlayer == "Mapbox Satellite") {
        let di3 = formatDist();
        satelliteSwitchButton.innerHTML = `Satellite (${di3})`;
    }
    else {
        satelliteSwitchButton.innerHTML = "Streetview mode";
    }
    console.log(nextPlayer_save + "," + nextPlayer);
    if (!rtded) {
        injectCanvas();
    }
    else {
        console.log("rated game, no canvas injection");
    }
}


/**
 * Hide or show players based on where the next location is
 */

function injectCanvas() {
    // TODO: is this needed? it seems to just affect the teleport button
    if (!isDuel) {
        Google();
    }
}

// for Battle Royale and classic (change visibility)

function gCanvas() {
    let GOOGLE_MAPS_CANVAS = ""
    if (isBattleRoyale) {
        if (isBullseye) {
            GOOGLE_MAPS_CANVAS = document.querySelector(BULLSEYE_CANVAS2);
        }
        else if (isLiveChallenge) {
            GOOGLE_MAPS_CANVAS = document.querySelector(LIVE_CANVAS2);
        }
        else if (isDuel) {
            GOOGLE_MAPS_CANVAS = document.getElementById("default_player");
        }
        else {
            GOOGLE_MAPS_CANVAS = document.querySelector(BR_CANVAS);
        }
    }
    else {
        GOOGLE_MAPS_CANVAS = document.querySelector(GENERAL_CANVAS);
    }
    return GOOGLE_MAPS_CANVAS;
}

function Google() {
    let teleportMenu = document.getElementById("Teleport Button");

    let GOOGLE_MAPS_CANVAS = gCanvas();

    if (GOOGLE_MAPS_CANVAS !== null) {
        if (nextPlayer === "Google") {
            GOOGLE_MAPS_CANVAS.style.visibility = "";
            teleportMenu.google = true;
        }
        else {
            GOOGLE_MAPS_CANVAS.style.visibility = "hidden";
            teleportMenu.google = false;
        }
    }
    else {
        setTimeout(Google, 250);
    }
}

/**
 * Adjust button placement
 */

function ZoomControls() {
    let style = `
	.ymaps-2-1-79-panorama-gotoymaps {display: none !important;}
	.ymaps-2-1-79-panorama-control__zoom {top: 2rem !important; left: 2rem !important; z-Index: 0}
    .mapillary-bearing-indicator-container {top: 2rem !important; left: 2rem !important;}
    .mapillary-zoom-container {top: 6rem !important; left: 2.20rem !important;}
    .NavBar_MapTypeButtonContainerWrapper {visibility: hidden !important;}
    .bm_LocateMeControl {visibility: hidden !important;}
    .NavBar_Container {top: -6rem !important; left: 2rem !important;}
    .streetsideToolPanel {top: 4rem !important; left: 2rem !important;}
    .NavBarButton_Container {visibility: hidden !important;}
    .mapboxgl-ctrl-top-left {z-Index: 999}
	`;

    //         let nav = document.querySelector('.NavBar_MapTypeButtonContainerWrapper');
    //     let locate = document.getElementById("LocateMeButton");
    //     let navAll = document.getElementById("MicrosoftNav");
    //     if (nav)
    //     {
    //         nav.style.visibility = "hidden";
    //     }
    //     if (locate)
    //     {
    //         locate.style.visibility = "hidden";
    //     }
    //     if (navAll)
    //     {
    //         navAll.style.top = "15em"
    //     }

    let style_element = document.createElement("style");
    style_element.innerHTML = style;
    document.body.appendChild(style_element);
    // document.getElementById("mapillary-bearing-indicator-container").style.top = "20em"
}

/**
 * Updates the compass to match Yandex Panorama facing
 */
function updateCompass() {
    if (!COMPASS) {
        let compass = document.querySelector("img.compass__indicator");
        if (compass != null) {
            COMPASS = compass;
            let direction = YandexPlayer.getDirection()[0] * -1;
            COMPASS.setAttribute("style", `transform: rotate(${direction}deg);`);
        }
    }
    else {
        let direction = YandexPlayer.getDirection()[0] * -1;
        COMPASS.setAttribute("style", `transform: rotate(${direction}deg);`);
    }
}

/**
 * Open next location in streetview player given next player and next coordinate
 */

function wiki(cc, iframe, teleportMenu) {
    let url = `https://${cc}.wikipedia.org/w/api.php`;
    let widthRight = 325;
    //     console.log(cc);
    //     if (cc == "fr")
    //     {
    //         widthRight = 1200;
    //     }

    let params = {
        action: "query",
        list: "geosearch",
        gscoord: `${global_lat}|${global_lng}`,
        gsradius: "10000",
        gslimit: "1",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
    let GOOGLE_MAPS_CANVAS = gCanvas();

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            // console.log(response)
            var pages = response.query.geosearch;
            if (pages.length !== 0) {
                GOOGLE_MAPS_CANVAS.style.visibility = "hidden";
                let pageId = pages[0].pageid;
                iframe.src = `https://${cc}.wikipedia.org/?curid=${pageId}`;
                wikiUrl = `https://${cc}.wikipedia.org/?curid=${pageId}`;
                iframe.style.visibility = "";
                iframe.style.right = `-${widthRight}px`;
                iframe.style.width = (window.innerWidth + widthRight) + 'px';

                // console.log(iframe.style.width);
                // iframe.style.visibility = "";
            }
            else {
                GOOGLE_MAPS_CANVAS.style.visibility = "";
                teleportMenu.google = true;
                iframe.style.right = '0px';
                iframe.style.width = window.innerWidth + 'px';
            }
        }).catch(function (error) { console.log(error); });
}

function handleSpecialColor() {
    document.getElementById("Circus Sky").style.background = skySpecial ? "#ff1493" : "#ff69b4";
    document.getElementById("Circus Soil").style.background = soilSpecial ? "#ff1493" : "#ff69b4";
    document.getElementById("Circus Skewed").style.background = skewedSpecial ? "#ff1493" : "#ff69b4";
    document.getElementById("Circus Zoom").style.background = zoomSpecial ? "#ff1493" : "#ff69b4";
    document.getElementById("Circus Random").style.background = randomSpecial ? "#ff1493" : "#ff69b4";
    document.getElementById("Circus NMPZ").style.background = nmpzSpecial ? "#ff1493" : "#ff69b4";
}


function goToLocation(cond) {
    let [teleportBtn, teleportReverse, teleportMenu, teleportMoreBtn, teleportLessBtn, teleportDistResetBtn, mainMenuBtn, timeMachineBtn, timeMachineOlderBtn, timeMachineNewerBtn, TeleportArisBtn, satelliteSwitchButton, RestrictBoundsBtn, RestrictBoundsDistBtn, RestrictMoreBtn, RestrictLessBtn, RestrictBoundsEnableBtn, RestrictResetBtn] = setButtons();
    console.log("Going to location");
    console.log(nextPlayer);

    let mosaicBtn = document.getElementById("Mosaic Enable");
    if (mosaicPre) {
        if (mosaicPre && mosaicBtn.grid == 0) {
            mosaicBtn.grid = 5;
            document.getElementById("Mosaic Menu").click();
        }
        else if (mosaicBtn.grid !== 0) {
            document.getElementById("Mosaic Menu").click();
        }
        loadGridBtn(mosaicBtn.grid);
    }

    if (restrictMovement) {
        //         if (teleportMenu.style.visibility == "hidden")
        //         {
        //             document.getElementById("Teleport Menu").click();
        //         }
        RestrictBoundsEnableBtn.innerHTML = "Disable Limit";
        if (RestrictBoundsBtn.innerHTML == "No Escape Mode Disabled") {
            RestrictBoundsBtn.innerHTML = "No Escape Mode Enabled";
        }
    }

    if (skySpecial || soilSpecial || skewedSpecial || zoomSpecial || randomSpecial || nmpzSpecial) {
        if (nmpzSpecial && !document.getElementById("specialNMPZ")) {
            loadNMPZ();
        }
        handleSpecialColor();
    }

    if (cond) {
        RestrictBoundsBtn.lat = global_lat;
        RestrictBoundsBtn.lng = global_lng;
    }

}


/**
 * Handle undo using the location history of the current round
 */

function goToUndoMove(data) {
    /*   console.log(global_lat);
      console.log(global_lng); */
    let teleportMenu = document.getElementById("Teleport Button");
    let options = {};
    let prevStep = null;
    if (locHistory.length === 1) {
        prevStep = locHistory[0];
    }
    else {
        prevStep = locHistory.pop();
    }
    // console.log(prevStep);
    // console.log(locHistory)
    if (nextPlayer === "Yandex") {
        defaultPanoIdChange = false;
        YandexPlayer.moveTo([prevStep[0], prevStep[1]], options);
        YandexPlayer.setDirection([prevStep[2], prevStep[3]]);
        YandexPlayer.setSpan([10, 67]);
    }
    else if (nextPlayer === "Kakao") {
        let btn = document.querySelector("button[data-qa='undo-move']");
        btn.disabled = false;
        btn.classList.remove('styles_disabled__2YdHD');
        defaultPanoIdChange = false;
        let position = new kakao.maps.LatLng(prevStep[0], prevStep[1]);
        KakaoPlayer.setPanoId(prevStep[2], position);
        teleportMenu.google = false;
        // console.log("Undo 1 step");
        // console.log(locHistory);
    }
    else if (nextPlayer === "Bing Streetside") {
        defaultPanoIdChange = false;
        // console.log(locHistory);
        MSStreetPlayer.setView({ center: new Microsoft.Maps.Location(prevStep[0], prevStep[1]), });
    }
    else if (nextPlayer === "Mapy") {
        defaultPanoIdChange = false;
        let mapyCords = SMap.Coords.fromWGS84(prevStep[1], prevStep[0]);
        SMap.Pano.getBest(mapyCords, 200).then(function (place) {
            MapyPlayer.show(place, {
                yaw: DegreesToRadians(prevStep[2]),
            });
        }, function () {
            alert("Panorama se nepodařilo zobrazit !");
        });
        // console.log(locHistory);
    }

}

function handleTeleport() {
    let teleportMenu = document.getElementById("Teleport Button");
    if (teleportMenu) {
        function tpt(direction) {
            if (!teleportMenu.google) {
                // console.log("non-Google Teleport");
                function forwardReverse(heading) {
                    if (direction) {
                        return heading;
                    }
                    else {
                        return (heading + 180) % 360;
                    }
                }

                let prevStep = null;
                if (locHistory.length === 1) {
                    prevStep = locHistory[0];
                }
                else {
                    prevStep = locHistory[locHistory.length - 1];
                }
                // console.log(locHistory);

                let options = {};
                let place, position, pID;
                if (nextPlayer === "Yandex") {

                    place = FindPointAtDistanceFrom(prevStep[0], prevStep[1], DegreesToRadians(forwardReverse(prevStep[2])), teleportMenu.distance * 0.001);
                    YandexPlayer.setDirection([prevStep[2], prevStep[3]]);
                    YandexPlayer.moveTo([place.lat, place.lng], options);
                    YandexPlayer.setSpan([10, 67]);
                }
                else if (nextPlayer === "Kakao") {
                    var roadviewClient = new kakao.maps.RoadviewClient();
                    place = FindPointAtDistanceFrom(prevStep[0], prevStep[1], DegreesToRadians(forwardReverse(prevStep[3])), teleportMenu.distance * 0.001);
                    position = new kakao.maps.LatLng(place.lat, place.lng);
                    roadviewClient.getNearestPanoId(position, 500, function (panoId) {
                        KakaoPlayer.setPanoId(panoId, position);
                    });
                }
                else if (nextPlayer === "Google") {
                    place = FindPointAtDistanceFrom(prevStep[0], prevStep[1], DegreesToRadians(forwardReverse(prevStep[2])), teleportMenu.distance * 0.001);
                }
                else if (nextPlayer === "Bing Streetside") {
                    //                     console.log("teleport")
                    //                     console.log(prevStep);
                    place = FindPointAtDistanceFrom(prevStep[0], prevStep[1], DegreesToRadians(forwardReverse(prevStep[2])), teleportMenu.distance * 0.001);
                    let bounds = new Microsoft.Maps.LocationRect(new Microsoft.Maps.Location(place.lat, place.lng), 1, 1);
                    Microsoft.Maps.Map.getClosestPanorama(bounds, onSuccess, onMissingCoverage);
                    function onSuccess(panoramaInfo) {
                        //                         console.log("Coverage")
                        //                         console.log([panoramaInfo.la, panoramaInfo.lo])
                        MSStreetPlayer.setView({
                            center: new Microsoft.Maps.Location(panoramaInfo.la, panoramaInfo.lo),
                        });
                    }
                    function onMissingCoverage() {
                        console.log("No Coverage")
                    }
                }
                else if (nextPlayer === "Mapy") {
                    place = FindPointAtDistanceFrom(MapyPlayer.getPlace()._data.mark.lat, MapyPlayer.getPlace()._data.mark.lon, MapyPlayer.getCamera().yaw, teleportMenu.distance * 0.001);
                    let mapyCords = SMap.Coords.fromWGS84(place.lng, place.lat);
                    SMap.Pano.getBest(mapyCords, 200).then(function (placeN) {
                        MapyPlayer.show(placeN, {
                            yaw: MapyPlayer.getCamera().yaw,
                        });
                    }, function () {
                        alert("Panorama se nepodařilo zobrazit !");
                    });
                }

                if (teleportMenu.distance > 150) {
                    teleportMenu.distance = 100;
                    teleportMenu.innerHTML = "Teleport: " + teleportMain.distance + " m";
                }
            }
        }
        document.getElementById("Teleport Forward").addEventListener("click", () => {
            tpt(true);

        });
        document.getElementById("Teleport Reverse").addEventListener("click", () => {
            tpt(false);

        });
    }
}


/**
 * Gets the seed data for the current game
 *
 * @returns Promise with seed data as object
 */
function getSeed() {
    console.log("get seed");
    // myHighlight("Get Seed");
    return new Promise((resolve, reject) => {
        let token = getToken();
        let URL;
        let cred = ""

        const PATHNAME = window.location.pathname;

        if (PATHNAME.startsWith("/game/")) {
            URL = `https://www.geoguessr.com/api/v3/games/${token}`;
        }
        else if (PATHNAME.startsWith("/challenge/")) {
            URL = `https://www.geoguessr.com/api/v3/challenges/${token}/game`;
        }
        else if (PATHNAME.startsWith("/battle-royale/")) {
            URL = `https://game-server.geoguessr.com/api/battle-royale/${token}`;
        }
        else if (PATHNAME.startsWith("/duels/") || PATHNAME.startsWith("/team-duels/")) {
            URL = `https://game-server.geoguessr.com/api/duels/${token}`;
        }
        else if (PATHNAME.startsWith("/bullseye/")) {
            URL = `https://game-server.geoguessr.com/api/bullseye/${token}`;
        }
        else if (PATHNAME.startsWith("/live-challenge/")) {
            URL = `https://game-server.geoguessr.com/api/live-challenge/${token}`;
        }
        if (isBattleRoyale) {
            fetch(URL, {
                // Include credentials to GET from the endpoint
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
        else {
            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

/**
 * Gets the token from the current URL
 *
 * @returns token
 */
function getToken() {
    const PATHNAME = window.location.pathname;
    if (PATHNAME.startsWith("/game/")) {
        return PATHNAME.replace("/game/", "");
    }
    else if (PATHNAME.startsWith("/challenge/")) {
        return PATHNAME.replace("/challenge/", "");
    }
    else if (PATHNAME.startsWith("/battle-royale/")) {
        return PATHNAME.replace("/battle-royale/", "");
    }
    else if (PATHNAME.startsWith("/duels/")) {
        return PATHNAME.replace("/duels/", "");
    }
    else if (PATHNAME.startsWith("/team-duels/")) {
        return PATHNAME.replace("/team-duels/", "");
    }
    else if (PATHNAME.startsWith("/bullseye/")) {
        return PATHNAME.replace("/bullseye/", "");
    }
    else if (PATHNAME.startsWith("/live-challenge/")) {
        return PATHNAME.replace("/live-challenge/", "");
    }
}

/**
 * Gets the round number from the ongoing game from the page itself
 *
 * @returns Round number
 */
function getRoundFromPage() {
    const roundData = document.querySelector("div[data-qa='round-number']");
    if (roundData) {
        let roundElement = roundData.querySelector("div:last-child");
        if (roundElement) {
            let round = parseInt(roundElement.innerText.charAt(0));
            if (!isNaN(round) && round >= 1 && round <= 5) {
                return round;
            }
        }
    }
    else {
        return ROUND;
    }
}


/**
 * Injects Yandex Script
 */
function injectYandexScript() {
    return new Promise((resolve, reject) => {
        if (!YANDEX_INJECTED) {
            if (YANDEX_API_KEY === "") {
                console.log("No Yandex Key")
                reject();
            }
            else {
                if (!partialCreateYandex) {
                    const SCRIPT = document.createElement("script");
                    SCRIPT.type = "text/javascript";
                    SCRIPT.async = true;
                    SCRIPT.src = `https://api-maps.yandex.ru/2.1/?lang=en_US&apikey=${YANDEX_API_KEY}`;
                    document.body.appendChild(SCRIPT);
                    SCRIPT.onload = () => {
                        ymaps.ready(() => {
                            YANDEX_INJECTED = true;
                            myHighlight("Yandex API Loaded");
                            resolve();
                        });
                    }
                }
                else {
                    YANDEX_INJECTED = true;
                    resolve();
                }
            }
        }
        else {
            resolve();
        }
    });
}

/**
 * Injects Yandex Player and calls handleReturnToStart
 */
function injectYandexPlayer() {
    let lat = 41.321861;
    let lng = 69.212920;

    let options = {
        "direction": [0, 16],
        "span": [10, 67],
        "controls": ["zoomControl"]
    };
    ymaps.panorama.createPlayer("player", [lat, lng], options)
        .done((player) => {
            YandexPlayer = player;
            YandexPlayer.events.add("directionchange", (e) => {
                updateCompass();
                let pov = YandexPlayer.getDirection();
                if (locHistory.length > 0 && nextPlayer == "Yandex") {
                    locHistory[locHistory.length - 1][2] = pov[0];
                    locHistory[locHistory.length - 1][3] = pov[1];
                }
            });
            YandexPlayer.events.add("panoramachange", (e) => {
                if (defaultPanoIdChange) {
                    let num = YandexPlayer.getPanorama().getPosition();
                    let pov = YandexPlayer.getDirection();
                    // console.log(num);
                    // console.log(pov);
                    if (nextPlayer == "Yandex") {
                        locHistory.push([num[0], num[1], pov[0], pov[1]]);
                    }
                    let btn = document.querySelector("button[data-qa='undo-move']");
                    if (locHistory.length > 1) {
                        btn.disabled = false;
                        btn.classList.remove('styles_disabled__2YdHD');
                    }
                    // console.log(locHistory);
                }
                defaultPanoIdChange = true;

            });
            console.log("Yandex Player injected");
        });

}


/**
 * Injects Baidu script
 */

function reportWindowSize() {
    // console.log("report window size");
    let iframeC = document.getElementById("i_container");
    if (iframeC) {
        if (nextPlayer == "Baidu") {
            iframeC.style.top = '-60px';
            iframeC.style.height = (window.innerHeight + 200) + 'px';
            // TODO
            iframeC.style.right = '-55px';
            iframeC.style.width = (window.innerWidth + 55) + 'px';
        }
        else if (nextPlayer == "Image" || nextPlayer === "Minecraft") {
            iframeC.style.top = '0px';
            iframeC.style.height = (window.innerHeight) + 'px';
            iframeC.style.right = '0px';
            iframeC.style.width = (window.innerWidth) + 'px';
        }
        else if (nextPlayer === "Wikipedia") {
            iframeC.style.top = '0px';
            iframeC.style.height = (window.innerHeight) + 'px';
            iframeC.style.right = '-325px';
            iframeC.style.width = (window.innerWidth + 325) + 'px';
        }
        else if (nextPlayer === "Carte") {
            // console.log([window.innerHeight, window.innerWidth])
            iframeC.style.bottom = '190px';
            if ((1.14 * window.innerHeight) >= window.innerWidth) {
                iframeC.style.top = '-100px';
                iframeC.style.height = (window.innerHeight + 290) + 'px';
            }
            else {
                iframeC.style.top = '-60px';
                iframeC.style.height = (window.innerHeight + 250) + 'px';
            }
            iframeC.style.left = '-20px';
            iframeC.style.right = '20px';
            iframeC.style.width = (window.innerWidth + 40) + 'px';
            iframeC.style.visibility = "";
            iframeC.src = carteCity;
        }


    }
}

window.onresize = reportWindowSize;



function injectContainer() {
    myHighlight("iframe container loaded")
    const iframe = document.createElement('iframe');
    iframe.style.position = "absolute";
    iframe.id = "i_container";
    if (isBattleRoyale) {
        if (isDuel) {
            iframe.className = "inactive";
        }
        else if (isBullseye) {
            iframe.className = "game-panorama_panorama__ncMwh";
        }
        else if (isLiveChallenge) {
            iframe.className = "game-panorama_panorama__IuPsO";
        }
        else {
            iframe.className = "br-game-layout__panorama";
        }
    }
    else {
        iframe.className = "game-layout__panorama";
    }
    var div = document.getElementById("player");
    if (div) {
        div.style.overflow = "hidden";
        if (isBullseye || isLiveChallenge) {
            div.prepend(iframe);
        }
        else {
            div.appendChild(iframe);
        }
    }

}

/**
 * Injects Kakao script
 */

function injectKakaoScript() {
    return new Promise((resolve, reject) => {
        if (!KAKAO_INJECTED) {
            if (KAKAO_API_KEY === "") {
                console.log("No Kakao Key")
            }
            else {

                let canvas = document.createElement("kmap");
                if (isBattleRoyale) {
                    if (isDuel) {
                        canvas.innerHTML = `
                 <div id="roadview" class="inactive" style="zIndex: 99999,position: "absolute", top: 0, left: 0, width: '100%', height: '100%',"> </div>
            `;
                    }
                    else if (isBullseye) {
                        canvas.innerHTML = `
                 <div id="roadview" class="game-panorama_panorama__ncMwh" style="zIndex: 99999,position: "absolute", top: 0, left: 0, width: '100%', height: '100%',"> </div>
            `;
                    }
                    else if (isLiveChallenge) {
                        canvas.innerHTML = `
                 <div id="roadview" class="game-panorama_panorama__IuPsO" style="zIndex: 99999,position: "absolute", top: 0, left: 0, width: '100%', height: '100%',"> </div>
            `;
                    }
                    else {
                        canvas.innerHTML = `
                 <div id="roadview" class="br-game-layout__panorama" style="zIndex: 99999,position: "absolute", top: 0, left: 0, width: '100%', height: '100%',"> </div>
            `;
                    }
                }
                else {
                    canvas.innerHTML = `
                 <div id="roadview" class="game-layout__panorama" style="zIndex: 99999,position: "absolute", top: 0, left: 0, width: '100%', height: '100%',"> </div>
            `;
                }


                var div = document.getElementById("player");
                if (isBullseye || isLiveChallenge) {
                    div.prepend(canvas);
                }
                else {
                    div.appendChild(canvas);
                }

                let SCRIPT;
                if (!partialCreateKakao) {
                    SCRIPT = document.createElement("script");
                    SCRIPT.async = true;
                    // SCRIPT.type = "text/javascript";
                    SCRIPT.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
                    document.body.appendChild(SCRIPT);
                }

                function drawmapKakao() {
                    kakao.maps.load(function () {
                        var position = new kakao.maps.LatLng(33.450701, 126.560667);
                        let roadviewContainer = document.getElementById('roadview');
                        KakaoPlayer = new kakao.maps.Roadview(roadviewContainer);
                        var panoId = 1023434522;
                        KakaoPlayer.setPanoId(panoId, position);
                        KAKAO_INJECTED = true;
                        // Remove the compass from Kakao
                        kakao.maps.event.addListener(KakaoPlayer, 'init', () => {
                            const compassContainer = roadviewContainer.querySelector('div[id*="_box_util_"]');
                            if (compassContainer) compassContainer.style.display = 'none';
                        });
                        kakao.maps.event.addListener(KakaoPlayer, 'panoid_changed', function () {
                            if (defaultPanoIdChange && KakaoPlayer) {
                                let latlng = KakaoPlayer.getPosition();
                                let lat = latlng.getLat();
                                let lng = latlng.getLng();
                                let pID = KakaoPlayer.getViewpointWithPanoId();
                                if (nextPlayer == "Kakao" && lat != 33.45047613915499) {
                                    // console.log("push");
                                    locHistory.push([lat, lng, pID.panoId, pID.pan]);
                                }
                                let btn = document.querySelector("button[data-qa='undo-move']");
                                if (locHistory.length > 1 && (btn != null)) {
                                    btn.disabled = false;
                                    btn.classList.remove('styles_disabled__2YdHD');
                                }
                                // console.log(locHistory);
                            }
                            defaultPanoIdChange = true;
                        });
                        kakao.maps.event.addListener(KakaoPlayer, 'viewpoint_changed', function () {
                            // console.log("pov_listener attached");
                            let pID = KakaoPlayer.getViewpointWithPanoId();
                            if (locHistory.length > 0 && nextPlayer == "Kakao") {
                                locHistory[locHistory.length - 1][3] = pID.pan;
                            }
                            if (GooglePlayer) {
                                const { heading, pitch } = GooglePlayer.getPov()
                                if ((!almostEqual(pID.pan, heading) || !almostEqual(pID.tilt, pitch)) && nextPlayer == "Kakao") {
                                    // Updating the google street view POV will update the compass
                                    GooglePlayer.setPov({ heading: pID.pan, pitch: pID.tilt })
                                }
                            }
                            // console.log(locHistory);
                        })
                    });
                }

                if (partialCreateKakao) {
                    drawmapKakao();
                }
                else {
                    SCRIPT.onload = () => {
                        drawmapKakao();
                        myHighlight("Kakao API Loaded");
                        resolve();
                    };
                }

            }
        }
        else {
            resolve();
        }
    });
}


function injectMSPlayer() {
    return new Promise((resolve, reject) => {
        if (!MS_INJECTED) {
            if (MS_API_KEY === "") {
                let canvas = document.getElementById("player");
                console.log("No MS Key")
            }
            else {

                let SCRIPT;
                if (!partialCreateMS) {
                    SCRIPT = document.createElement("script");
                    SCRIPT.type = "text/javascript";
                    SCRIPT.async = true;
                    SCRIPT.src = `https://www.bing.com/api/maps/mapcontrol?key=${MS_API_KEY}`;
                    document.body.appendChild(SCRIPT);
                }
                let canvas = document.createElement("msmap");
                if (isBattleRoyale) {
                    if (isDuel) {
                        canvas.innerHTML = `<div id="ms-player" class="inactive" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else if (isBullseye) {
                        canvas.innerHTML = `<div id="ms-player" class="game-panorama_panorama__ncMwh" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else if (isLiveChallenge) {
                        canvas.innerHTML = `<div id="ms-player" class="game-panorama_panorama__IuPsO" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else {
                        canvas.innerHTML = `<div id="ms-player" class="br-game-layout__panorama" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                }
                else {
                    canvas.innerHTML = `<div id="ms-player" class="game-layout__panorama" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                }

                var div = document.getElementById("player");
                if (isBullseye || isLiveChallenge) {
                    div.prepend(canvas);
                }
                else {
                    div.appendChild(canvas);
                }
                function drawmapMS() {
                    try {
                        MSStreetPlayer = new Microsoft.Maps.Map(document.getElementById('ms-player'), { disableStreetsideAutoCoverage: true, allowHidingLabelsOfRoad: true });
                        MS_INJECTED = true;
                        //                     MSStreetPlayer.setOptions({
                        //                         minZoom: 13
                        //                     });
                        Microsoft.Maps.Events.addHandler(MSStreetPlayer, 'viewchangeend', function () { updateView(MSStreetPlayer); });
                        function updateView(map) {
                            let ctrm = map.getCenter();
                        }
                    }
                    catch (error) {
                        console.log(error);
                        alert("Bing Maps API Loading Failed, please refresh");
                        // setTimeout(drawmapMS(), 1000);
                    }

                }

                if (partialCreateMS) {
                    // drawmapMS();
                    if (isBullseye) {
                        setTimeout(drawmapMS(), 1000);
                    }
                    else {
                        drawmapMS();
                    }
                    resolve();
                }
                else {
                    SCRIPT.addEventListener('load', () => {
                        myHighlight("Bing Maps API loaded");
                        let timeout = 0;
                        let interval = setInterval(() => {
                            // console.log(timeout);
                            if (timeout >= 40) {
                                reject();
                                clearInterval(interval);
                            }
                            if (document.getElementById('ms-player') !== null && Microsoft.Maps.Map !== typeof undefined) {
                                drawmapMS();
                                resolve();
                                clearInterval(interval);
                            }
                            timeout += 1;
                        }, 1000);
                    })
                }
            }
        }
        else {
            resolve();
        }
    });
}


function changeInnerHTML(canvas1, init) {
    canvas1.style.display = "";
    var div = document.getElementById("player");
    if (isBullseye || isLiveChallenge) {
        div.prepend(canvas1);
    }
    else {
        div.appendChild(canvas1);
    }

    let canvas;
    if (init) {
        canvas = document.createElement("div");
        canvas.id = "mapbox-player";
        canvas.style = `zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'`;
        canvas1.appendChild(canvas);
    }
    else {
        document.getElementById("mapbox-player").classList.remove("inactive", "game-panorama_panorama__ncMwh", "game-panorama_panorama__IuPsO", "br-game-layout__panorama", "game-layout__panorama", "game-panorama_panorama__rdhFg");
    }
    canvas = document.getElementById("mapbox-player");
    if (isBattleRoyale) {
        if (isDuel) {
            canvas.classList.add("inactive");
        }
        else if (isBullseye) {
            canvas.classList.add("game-panorama_panorama__ncMwh");
        }
        else if (isLiveChallenge) {
            canvas.classList.add("game-panorama_panorama__IuPsO");
        }
        else {
            canvas.classList.add("br-game-layout__panorama");
        }
    }
    else {
        canvas.classList.add("game-layout__panorama");
    }
    if (rainLayer) {
        MapboxPlayer.resize();
    }
    // console.log(canvas);

}

function updateSunPosition(sunPos) {
    MapboxPlayer.setPaintProperty('sky', 'sky-atmosphere-sun', sunPos);
}

function getSunPosition(date) {
    const center = MapboxPlayer.getCenter();
    const sunPos = SunCalc.getPosition(
        date || Date.now(),
        center.lat,
        center.lng
    );
    const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
    const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
}

// function handleRainLayer()
// {
//     if (typeof RainLayer !== typeof undefined)
//     {

//         MapboxPlayer.addLayer(rainLayer);

//         console.log("Rain Layer loaded");
//     }
//     else
//     {
//         setTimeout(handleRainLayer, 1000);
//     }
// }

function skyLayer(reset, time, style) {
    try {
        if (reset.includes("reset")) {
            if (time == "") {
                time = [360, 30];
            }
            MapboxPlayer.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        0,
                        0,
                        5,
                        0.3,
                        8,
                        1
                    ],
                    // set up the sky layer for atmospheric scattering
                    'sky-type': 'atmosphere',
                    // explicitly set the position of the sun rather than allowing the sun to be attached to the main light source
                    'sky-atmosphere-sun': time,
                    // set the intensity of the sun as a light source (0-100 with higher values corresponding to brighter skies)
                    'sky-atmosphere-sun-intensity': 5
                }
            });

            // handleRainLayer();


            // Reset Fog
        }
        let percentage;
        // console.log(time);

        if (time[1] <= 75) {
            percentage = 0;
        }
        else if (time[1] > 75 && time[1] <= 90) {
            percentage = (90 - time[1]) / 20;
        }
        else {
            percentage = 1;
        }

        // console.log(MapboxPlayer.getStyle());

        if (style) {
            MapboxPlayer.setPaintProperty(
                'heatmap',
                'heatmap-opacity',
                percentage * 0.35
            );
            MapboxPlayer.setPaintProperty(
                'satellite',
                'raster-brightness-max',
                0.25 + (1 - percentage) * 0.75
            );
            MapboxPlayer.setPaintProperty(
                'road-simple',
                'line-opacity',
                percentage * 0.25
            );
            MapboxPlayer.setPaintProperty(
                'bridge-case-simple',
                'line-opacity',
                percentage * 0.25
            );
            MapboxPlayer.setPaintProperty(
                'bridge-simple',
                'line-opacity',
                percentage * 0.25
            );
        }
        let fogVal = 100 - percentage * 100;
        // console.log(`rgba(${parseInt(fogVal)}, ${parseInt(fogVal)}, ${parseInt(fogVal)}, 1.0)`)
        let val = [0, 5, 0.1];
        if (ms_radius < 10000) {
            val[1] = ms_radius / 10000 * 4 + 1;
        }
        MapboxPlayer.setFog({ 'color': `hsl(0, 0, ${fogVal}%)`, 'range': [val[0], val[1]], 'horizon-blend': val[2] });
        // console.log(MapboxPlayer.getStyle());
    }
    catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}


// function fetchTime(lat, lng)
// {
//     return new Promise((resolve, reject) => {
//         fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=D95ISGQ041BQ&format=json&by=position&lat=${lat}&lng=${lng}`)
//             .then((response) => {resolve(response.json())})
//             .catch((error) => {console.log(error);});
//     });
// }
// fetchTime(global_lat, global_lng).then((data) => {

function styleMapboxAll(changeAttr, attrVal) {
    let satelliteStyleBtn = document.getElementById("Satellite Type Button");
    const sunPositions = SunCalc.getTimes(
        Date.now(),
        global_lat,
        global_lng
    );

    if (changeAttr === "Dimension" || changeAttr === "All") {
        if (changeAttr === "All") {
            attrVal = Dimension;
        }
        // console.log(["arrval", attrVal]);

        let tempRadius;
        if (attrVal) {
            tempRadius = ms_radius * 0.5;
        }
        else {
            tempRadius = ms_radius;
        }
        let loc_centre = { lat: global_lat, lng: global_lng };
        let latlngBounds = getBBox2(loc_centre, tempRadius);
        // console.log([latlngBounds[0], latlngBounds[1]], [latlngBounds[2], latlngBounds[3]])
        let mpBounds = [
            [latlngBounds[1], latlngBounds[2]], // Southwest coordinates
            [latlngBounds[3], latlngBounds[0]] // Northeast coordinates
        ];
        MapboxPlayer.flyTo({ center: [global_lng, global_lat], zoom: 9 });
        MapboxMarker.setLngLat([global_lng, global_lat]);
        MapboxPlayer.setMaxBounds(mpBounds);
        if (attrVal) {
            MapboxPlayer.dragRotate.enable();
            MapboxPlayer.touchZoomRotate.enableRotation();
        }
        else {
            MapboxPlayer.setPitch(0);
            MapboxPlayer.dragRotate.disable();
            MapboxPlayer.touchZoomRotate.disableRotation();
        }
    }
    if (changeAttr === "SunPos") {
        //         if (changeAttr === "All")
        //         {
        //             attrVal = satelliteStyleBtn.currentTime;
        //         }
        let sunPos = getSunPosition(sunPositions[attrVal]);
        updateSunPosition(sunPos);
        skyLayer("", sunPos, mapSty);
    }
    if (changeAttr === "mapSty") {
        if (attrVal) {
            MapboxPlayer.setStyle("mapbox://styles/jupaoqq/cl0xjs63k003a15ml3essawbk");
        }
        else {
            MapboxPlayer.setStyle("mapbox://styles/jupaoqq/cl0ro0tm0001l14nyi17a91rs");
        }

        // MapboxPlayer.addLayer(rainLayer);
        setTimeout(() => {
            skyLayer("reset", getSunPosition(sunPositions[satelliteStyleBtn.currentTime]), mapSty);
            if (!MapboxPlayer.getSource('mapbox-dem')) {
                MapboxPlayer.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
                // add the DEM source as a terrain layer with exaggerated height
                MapboxPlayer.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
            }
            MapboxPlayer.addLayer(rainLayer);
        }, 1000);
    }
    if (changeAttr === "Building" || changeAttr === "All") {
        if (changeAttr === "All") {
            attrVal = Building;
            console.log("building")
        }
        if (attrVal) {
            MapboxPlayer.setPaintProperty(
                'building-extrusion',
                'fill-extrusion-opacity',
                0.8
            );
        }
        else {
            MapboxPlayer.setPaintProperty(
                'building-extrusion',
                'fill-extrusion-opacity',
                0
            );
        }

    }
    if (changeAttr === "Weather" || changeAttr === "All") {
        if (changeAttr === "All") {
            attrVal = Weather;
        }
        if (attrVal) {
            rainLayer.setMeshOpacity(0.1);
            rainLayer.setRainColor("rgba(204, 204, 255, 1)");
        }
        else {
            rainLayer.setMeshOpacity(0);
            rainLayer.setRainColor("rgba(204, 204, 255, 0)");
        }
    }
}

function injectMapboxPlayer() {
    return new Promise((resolve, reject) => {
        if (!MAPBOX_INJECTED) {
            if (MAPBOX_API_KEY === "") {
                let canvas = document.getElementById("player");
                console.log("No Mapbox Key")
            }
            else {
                let canvas = document.createElement("sat-map");
                canvas.id = "sat_map";
                canvas.classList.add("sat_map");
                changeInnerHTML(canvas, true);


                // mapbox://styles/jupaoqq/cl0rnlwp9001914mz2vpinynt
                // mapbox://styles/jupaoqq/cl0ro0tm0001l14nyi17a91rs

                let SCRIPT;
                if (!partialCreateMapbox) {
                    const SCRIPT2 = document.createElement("script");
                    SCRIPT2.type = "text/javascript";
                    SCRIPT2.async = true;
                    SCRIPT2.src = `https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.8.0/suncalc.min.js`;
                    document.body.appendChild(SCRIPT2);

                    SCRIPT = document.createElement("script");
                    SCRIPT.type = "text/javascript";
                    SCRIPT.async = true;
                    SCRIPT.src = `https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js`;
                    document.body.appendChild(SCRIPT);
                    document.querySelector('head').innerHTML += '<link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet"/>';
                    handleSatColor(true, true);
                    SCRIPT.addEventListener('load', () => {
                        const SCRIPT3 = document.createElement("script");
                        SCRIPT3.type = "text/javascript";
                        SCRIPT3.async = true;
                        SCRIPT3.src = `https://cdn.jsdelivr.net/npm/mapbox-gl-rain-layer@latest/dist/mapbox-gl-rain-layer.min.js`;
                        document.body.appendChild(SCRIPT3);
                        SCRIPT3.addEventListener('load', () => {
                            myHighlight("Mapbox API and Rainlayer Loaded");
                            // resolve(BMap);
                            mapboxgl.accessToken = MAPBOX_API_KEY;
                            MapboxPlayer = new mapboxgl.Map({
                                container: 'mapbox-player', // container ID
                                style: 'mapbox://styles/jupaoqq/cl0xjs63k003a15ml3essawbk', // style URL
                                center: [0, 0], // starting position [lng, lat]
                                zoom: 15, // starting zoom
                                pitch: 0
                            });
                            console.log("New Mapbox API Call");
                            MapboxMarker = new mapboxgl.Marker()
                                .setLngLat([0, 0])
                                .addTo(MapboxPlayer);
                            MapboxPlayer.addControl(new mapboxgl.NavigationControl(), 'top-left');
                            MapboxPlayer.addControl(new mapboxgl.ScaleControl({}));
                            MapboxPlayer.on('load', () => {
                                MapboxPlayer.addSource('mapbox-dem', {
                                    'type': 'raster-dem',
                                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                                    'tileSize': 512,
                                    'maxzoom': 14
                                });
                                // add the DEM source as a terrain layer with exaggerated height
                                MapboxPlayer.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
                                rainLayer = new RainLayer({
                                    id: 'rain',
                                    source: 'rainviewer',
                                    scale: 'noaa'
                                });
                                MapboxPlayer.addLayer(rainLayer);
                                // TODO
                                // MapboxPlayer.setFog({'range': [-1, 1.5], 'color': `rgba(255, 255, 255, 1.0)`,'horizon-blend': 0.1});
                                styleMapboxAll("All", true);
                                skyLayer("reset", "", true);




                            });

                        });
                    });


                    MAPBOX_INJECTED = true;
                    resolve();

                }
                else {
                    resolve();
                }
            }
        }
        else {
            resolve();
        }
    });
}



function handleMapillary(latlng, options) {
    console.log("handleMapillary")
}

function handleMapillaryHelper(latlng, options) {
    return new Promise((resolve, reject) => {
        // console.log("1")
        let bbox = getBBox(latlng, options.meters);
        let URL = "https://graph.mapillary.com/images?access_token={0}&fields=id,computed_geometry&bbox={1}&limit={2}".replace('{0}', MAPILLARY_API_KEY).replace('{1}', bbox).replace('{2}', options.limit)
        // console.log(URL)
        fetch(URL)
            .then((response) => { resolve(response.json()) })
            .catch((error) => { console.log(error); });
    });
}

function injectMapyPlayer() {
    return new Promise((resolve, reject) => {
        if (!MAPY_INJECTED) {
            if (MAPY_API_KEY === "") {
                let canvas = document.getElementById("player");
                MAPY_INJECTED = true;
                console.log("No Mapy Key")
            }
            else {

                let SCRIPT;
                if (!partialCreateMapy) {
                    SCRIPT = document.createElement("script");
                    SCRIPT.type = "text/javascript";
                    SCRIPT.async = true;
                    SCRIPT.src = `https://api.mapy.cz/loader.js`;
                    document.body.appendChild(SCRIPT);
                }
                let canvas = document.createElement("czmap");
                if (isBattleRoyale) {
                    if (isDuel) {

                        canvas.innerHTML = `<div id="mapy-player" class="inactive" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else if (isBullseye) {
                        canvas.innerHTML = `<div id="mapy-player" class="game-panorama_panorama__ncMwh" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else if (isLiveChallenge) {
                        canvas.innerHTML = `<div id="mapy-player" class="game-panorama_panorama__IuPsO" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                    else {
                        canvas.innerHTML = `<div id="mapy-player" class="br-game-layout__panorama" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                    }
                }
                else {
                    canvas.innerHTML = `<div id="mapy-player" class="game-layout__panorama" style="zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'"></div>`;
                }

                var div = document.getElementById("player");
                if (isBullseye || isLiveChallenge) {
                    div.prepend(canvas);
                    // setTimeout(drawmapMS(), 1000);
                }
                else {
                    div.appendChild(canvas);
                }

                var mapyPanoChange = function (signal) {
                    if (defaultPanoIdChange) {
                        let mapyLat = MapyPlayer.getPlace()._data.mark.lat;
                        let mapyLng = MapyPlayer.getPlace()._data.mark.lon;
                        let mapyHeading = toDegrees(MapyPlayer.getCamera().yaw);

                        if (locHistory.length > 0) {
                            let toPush = true;
                            for (let locHy of locHistory) {
                                if (mapyLat === locHy[0] && mapyLng === locHy[1]) {
                                    toPush = false;
                                }
                            }
                            if (toPush) {
                                locHistory.push([mapyLat, mapyLng, mapyHeading]);
                            }
                        }
                        else {
                            locHistory.push([mapyLat, mapyLng, mapyHeading]);
                        }
                        let btn = document.querySelector("button[data-qa='undo-move']");
                        if (locHistory.length > 1 && btn) {
                            btn.disabled = false;
                            btn.classList.remove('styles_disabled__2YdHD');
                        }
                    }
                    else {
                        defaultPanoIdChange = true;
                    }
                }

                function crMap() {
                    MapyPlayer = new SMap.Pano.Scene(document.getElementById("mapy-player"));
                    var signals = MapyPlayer.getSignals();
                    signals.addListener(window, "pano-change", mapyPanoChange);
                }
                if (partialCreateMapy) {
                    crMap();
                    MAPY_INJECTED = true;
                }
                else {
                    SCRIPT.addEventListener('load', () => {
                        myHighlight("Mapy API Loaded");
                        MAPY_INJECTED = true;
                        Loader.async = true;
                        Loader.load(null, { pano: true }, crMap);
                        resolve();
                    })
                }
            }
        }
        else {
            resolve();
        }
    });
}


/**
 * Minimap presets
 */

let water_name_only =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]
let country_name_only =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

let no_label_or_terrain =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

let no_label =
    [
        {
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

let blank =

    [
        {
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

let thick_border =

    [
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "weight": 1.5
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "weight": 3.5
                }
            ]
        }
    ]

let Indonesia =
    [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

let dark = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]

let default_preset = []

let presetMinimap = [
    [default_preset, "Default"],
    [no_label, "Labelless"],
    [dark, "Dark Mode"],
    [thick_border, "Borders"],
    [default_preset, "Satellite"],
    [default_preset, "Terrain"],
    [default_preset, "Hybrid"],
]

let GEOJSON_INVISIBLE =
{
    strokeOpacity: 0,
    fillOpacity: 0,
    clickable: false,
}

let presetOverlay = [
    ["Clear", ""],
    ["Coverage", ""],
    ["Official", ""],
    ["OSM", ""],
    ["City Lights", ""],
    ["Watercolor", ""],
    ["Toner", ""],
    ["Fire", ""],
    ["Longitude", "https://raw.githubusercontent.com/Jupaoqq/Jupaoqq.github.io/main/lonl.json"],
    ["Latitude", "https://raw.githubusercontent.com/Jupaoqq/Jupaoqq.github.io/main/latl.json"],
    ["US County", "https://raw.githubusercontent.com/CodeForCary/CountyDataUSA5m/master/cb_2017_us_county_5m.json"],
    ["France", "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"],
    ["Time Zone", "https://raw.githubusercontent.com/treyerl/timezones/master/timezones_wVVG8.geojson"],
    ["UK Parliament", "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/electoral/gb/wpc.json"],
    ["Custom", YOUR_URL]
]


let langDict = {
    "sn": ["fr"],
    "za": ["af"],
    "mg": ["mg", "fr"],
    "tn": ["ar"],
    "bd": ["bn"],
    "kh": ["km"],
    "in": ["hi"],
    "cn": ["zh"],
    "hk": ["zh"],
    "id": ["id"],
    "ir": ["fa"],
    "il": ["he"],
    "jp": ["ja"],
    "jo": ["ar"],
    "ky": ["ru", "ky"],
    "la": ["lo"],
    "my": ["ms"],
    "mn": ["mn"],
    "np": ["ne"],
    "ru": ["ru"],
    "sg": ["zh"],
    "kr": ["ko"],
    "lk": ["ta"],
    "tw": ["zh"],
    "th": ["th"],
    "ae": ["ar"],
    "vn": ["vi"],
    "al": ["sq"],
    "ad": ["es", "fr"],
    "at": ["de"],
    "be": ["nl", "fr"],
    "bg": ["bg"],
    "hr": ["hr"],
    "cy": ["el"],
    "cz": ["cs"],
    "dk": ["da"],
    "ee": ["et"],
    "fo": ["fo"],
    "fi": ["fi"],
    "fr": ["fr"],
    "de": ["de"],
    "gr": ["el"],
    "hu": ["hu"],
    "is": ["is"],
    "ie": ["ga"],
    "it": ["it"],
    "lv": ["lv"],
    "lt": ["lt"],
    "lu": ["lb", "fr", "de"],
    "mc": ["fr"],
    "nl": ["nl"],
    "mk": ["mk"],
    "no": ["no"],
    "pl": ["pl"],
    "pt": ["pt"],
    "ro": ["ro"],
    "sm": ["it"],
    "rs": ["sr"],
    "sk": ["sk"],
    "si": ["sl"],
    "es": ["es"],
    "se": ["sv"],
    "ch": ["de", "fr"],
    "tr": ["tr"],
    "ua": ["uk"],
    "cw": ["nl"],
    "do": ["es"],
    "gt": ["es"],
    "mx": ["es"],
    "pr": ["es"],
    "ar": ["es"],
    "bo": ["es"],
    "br": ["pt"],
    "cl": ["es"],
    "ec": ["es"],
    "pe": ["es"],
    "uy": ["es"]
};

// ch, lu, be, ad

let carteDict = {
    "AG": "agadir",
    "AS": "asilah",
    "CA": "casablanca",
    "ER": "errachidia",
    "ES": "essaouira",
    "FE": "fes",
    "IR": "ifrane",
    "MA": "marrakech",
    "ME": "meknes",
    "RA": "rabat",
};

let satType = [["Weather", "Weather: On", "Weather: Off"],
["Building", "Building: On", "Building: Off"],
["Dimension", "3D", "2D"],
["mapSty", "Satellite", "Road"]];

let satStyle = [["solarNoon", "Noon"],
["sunriseEnd", "Sunrise"],
["goldenHourEnd", "Morning"],
["goldenHour", "Evening"],
["sunsetStart", "Sunset"],
["nadir", "Midnight"],
["getlocal", "Local Time"],
];
