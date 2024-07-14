// ==UserScript==
// @name          GeoRando Support Script
// @description   Enables the changes to GeoGuessr used in the GeoRando Archipelago randomizer.
// @version       0.1
// @author        arborelia
// @match         https://www.geoguessr.com/*
// @run-at        document-start
// @license       MIT
// @grant         unsafeWindow
// ==/UserScript==


// could be "hybrid" or "terrain" if you enable those
let map_style = "hybrid";
//let active_style_mod = null;
let active_style_mod = "labelless";

console.log("GeoRando script by arborelia");

/**
 * Check whether the current page is in a standard game (not a duel or something)
 */
function isInGame() {
    return window.location.pathname.startsWith("/game/");
}


let style_mods = {
    "labelless": [
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
}

var oldHref = document.location.href;

function installMapMod() {
    console.log("installMapMod");
    const google = window.google;
    google.maps.Map = class extends google.maps.Map {
        constructor(...args) {
            super(...args);
            console.log("google constructor");
            console.log("Setting map style to", map_style);
            this.setMapTypeId(map_style);
            if (active_style_mod) {
                this.set("styles", style_mods[active_style_mod]);
            }
        }
    }
}

function modifyPage() {
}


// utilities to modify google maps

function overrideOnLoad(googleScript, observer, overrider) {
    const oldOnload = googleScript.onload
    googleScript.onload = (event) => {
        const google = window.google;
        console.log("googleScript =", googleScript);
        console.log("google =", google);
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


function launchObserver() {
    console.log("Main Observer");
    installMapMod();
    let observer3 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                modifyPage();
            }
        });
    });
    observer3.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false })
}


window.addEventListener('DOMContentLoaded', (event) => {
    injecter(() => {
        launchObserver();
    })
});


// GeoNoCar script - https://openuserjs.org/meta/drparse/GeoNoCar.meta.js
function injected() {
    const OPTIONS = {
        colorR: 0.5,
        colorG: 0.5,
        colorB: 0.5,
    };

    // If the script breaks, search devtools for "BINTULU" and replace these lines with the new one
    const vertexOld = "const float f=3.1415926;varying vec3 a;uniform vec4 b;attribute vec3 c;attribute vec2 d;uniform mat4 e;void main(){vec4 g=vec4(c,1);gl_Position=e*g;a=vec3(d.xy*b.xy+b.zw,1);a*=length(c);}";
    const fragOld = "precision highp float;const float h=3.1415926;varying vec3 a;uniform vec4 b;uniform float f;uniform sampler2D g;void main(){vec4 i=vec4(texture2DProj(g,a).rgb,f);gl_FragColor=i;}";

    const vertexNew = `
const float f=3.1415926;
varying vec3 a;
varying vec3 potato;
uniform vec4 b;
attribute vec3 c;
attribute vec2 d;
uniform mat4 e;
void main(){
    vec4 g=vec4(c,1);
    gl_Position=e*g;
    a = vec3(d.xy * b.xy + b.zw,1);
    a *= length(c);

    potato = vec3(d.xy, 1.0) * length(c);
}`;
    const fragNew = `precision highp float;
const float h=3.1415926;
varying vec3 a;
varying vec3 potato;
uniform vec4 b;
uniform float f;
uniform sampler2D g;
void main(){

vec2 aD = potato.xy / a.z;
float thetaD = aD.y;

float thresholdD1 = 0.6;
float thresholdD2 = 0.7;

float x = aD.x;
float y = abs(4.0*x - 2.0);
float phiD = smoothstep(0.0, 1.0, y > 1.0 ? 2.0 - y : y);

vec4 i = vec4(
  thetaD > mix(thresholdD1, thresholdD2, phiD)
  ? vec3(float(${OPTIONS.colorR}), float(${OPTIONS.colorG}), float(${OPTIONS.colorB})) // texture2DProj(g,a).rgb * 0.25
  : texture2DProj(g,a).rgb
,f);
gl_FragColor=i;
}`;

    function installShaderSource(ctx) {
        const g = ctx.shaderSource;
        function shaderSource() {
            if (typeof arguments[1] === 'string') {
                let glsl = arguments[1];
                console.log('BINTULU shader', glsl);
                if (glsl === vertexOld) glsl = vertexNew;
                else if (glsl === fragOld) glsl = fragNew;
                return g.call(this, arguments[0], glsl);
            }
            return g.apply(this, arguments);
        }
        shaderSource.bestcity = 'bintulu';
        ctx.shaderSource = shaderSource;
    }
    function installGetContext(el) {
        const g = el.getContext;
        el.getContext = function () {
            if (arguments[0] === 'webgl' || arguments[0] === 'webgl2') {
                const ctx = g.apply(this, arguments);
                if (ctx && ctx.shaderSource && ctx.shaderSource.bestcity !== 'bintulu') {
                    installShaderSource(ctx);
                }
                return ctx;
            }
            return g.apply(this, arguments);
        };
    }
    const f = document.createElement;
    document.createElement = function () {
        if (arguments[0] === 'canvas' || arguments[0] === 'CANVAS') {
            const el = f.apply(this, arguments);
            installGetContext(el);
            return el;
        }
        return f.apply(this, arguments);
    };
    function addCompassStyle() {
        let style = document.createElement('style');
        style.id = 'bintulu_nocompass';
        style.innerHTML = '.compass { display: none } .game-layout__compass { display: none }';
        document.head.appendChild(style);
    }
    addCompassStyle();
    document.addEventListener('keydown', (evt) => {
        if (!evt.repeat && evt.code === 'KeyK' && evt.shiftKey && !evt.altKey && !evt.ctrlKey && !evt.metaKey) {
            let style = document.getElementById('bintulu_nocompass');
            if (!style) {
                addCompassStyle();
            } else {
                style.remove();
            }
        }
    });
}

unsafeWindow.eval(`(${injected.toString()})()`);
