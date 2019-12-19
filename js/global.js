// JavaScript Document
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var globalColors = document.getElementById('globalbrand');
var yellow = '#FFD100';
var green = '#6DD400';

globalColors.addEventListener("change", function(){
	console.log(globalColors.value)
});

