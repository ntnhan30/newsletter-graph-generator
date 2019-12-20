// JavaScript Document
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

'use strict';
import { filterData } from "./data.js";

(function(){
	
	/* canvas setup */
	var c = document.getElementById('canvas2');
	var ctx = c.getContext('2d');

	/*variables and parameters */
	var rows = 8,
		ystart = 110,
		xstart = 175,
		xnudge = 56,
		ynudge = 68,
		brands = [
			'foodpanda',
			'uber',
			'mc donalds',
			'pizza hut',
			'bee',
			'kfc',
			'dominos',
			'deliveroo'
		],
		colors= [
			'#d70f64',
			'#E97BAE',
			'#F4BDD6',
			'#54BAD1',
		],
		
		data = [
			{
				brand: 'foodpanda',
				values: [
					12,
					36,
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					getRandomInt(-100),
					getRandomInt(100),
					0,
					0,
				],
			},
			{
				brand: 'uber',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
			{
				brand: 'mc donalds',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
			{
				brand: 'pizza hut',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},	
			{
				brand: 'bee',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
			{
				brand: 'kfc',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
			{
				brand: 'dominos',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
			{
				brand: 'deliveroo',
				values: [
					10,
					getRandomInt(100),
					getRandomInt(100),
					getRandomInt(100),
				],
				variations:[
					0,
					0,
					0,
					0,
				],
			},
		];

	
	/* functions */
	// update data array from filterData
	function dataUpdate() {
		data = [];
		filterData.map(row => {
		  data.push({
			brand: row.Brand,
			values: [
			  parseInt(row["BF_1 - Aided brand awareness"].slice(0, -1)),
			  parseInt(row["BF_2 - Brand consideration"].slice(0, -1)),
			  parseInt(row["BF_3 - Brand usage"].slice(0, -1)),
			  parseInt(row["BF_4 - Brand preference"].slice(0, -1)),
			],
			variations: [row["AidedAwarenessVariation"], 
			row["ConsiderationVariation"],
			row["UsageVariation"],
			row["PreferenceVariation"],
		]
		  });
		});
	
		rows = filterData.length;
		console.log(data);
	  }

	function genForm(n){
		for(var i=1; i < n+1; i++){
			var thisValue = 'bvalue'+i,
				thisVariation = 'variation'+i,
				line = '<div id="line'+i+'">'+
			'<span class="selector-title">Brand '+i+': </span>'+
			'<input type="text" name="brand2'+i+'" id="brand2'+i+'" class="text"/>'+
			' Aided Awareness: <input type="text" name="'+thisValue+'1" id="'+thisValue+'1" class="input"/>'+
			' (variation): <input type="text" name="'+thisVariation+'1" id="'+thisVariation+'1" class="input"/>'+	
			' Consideration: <input type="text" name="'+thisValue+'2" id="'+thisValue+'2" class="input"/>'+
			' (variation): <input type="text" name="'+thisVariation+'2" id="'+thisVariation+'2" class="input"/>'+	
			' Usage: <input type="text" name="'+thisValue+'3" id="'+thisValue+'3" class="input"/>'+
			' (variation): <input type="text" name="'+thisVariation+'3" id="'+thisVariation+'3" class="input"/>'+	
			' Preference: <input type="text" name="'+thisValue+'4" id="'+thisValue+'4" class="input"/>'+
			' (variation): <input type="text" name="'+thisVariation+'4" id="'+thisVariation+'4" class="input"/>'+
			'</div>';

			document.getElementById("form2").insertAdjacentHTML('beforeend', line)
		}
	}
	
	function fetchInputs(){
		switch(globalColors.value){
			case 'pink':
				colors= [
					'#d70f64',
					'#E97BAE',
					'#F4BDD6',
					'#54BAD1',
				];

			break
			case 'red':
				colors= [
					'#D61F20',
					'#e67979',
					'#F2BBBC',
					'#83828A',
				];
			break
			case 'orange':
				colors= [
					'#FF6F00',
					'#FF9B4E',
					'#FFBD89',
					'#495092',
					
				]
				
		}
		for(var j=1; j<rows+1; j++){
			for(var i=1; i<5; i++){
				if(document.getElementById('bvalue'+j+i).value){
					data[j-1].values[i-1] = Number(document.getElementById('bvalue'+j+i).value);
				}				
				if(document.getElementById('variation'+j+i).value){
					data[j-1].variations[i-1] = Number(document.getElementById('variation'+j+i).value);
				}
			}
		}
	}
	
	function genLabels(){
		
		var nudge = 0;
		var width = 150;
		var texts = [
			'aided awareness',
			'consideration',
			'usage',
			'preference',
		]
		for(var i=0; i<4; i++){
			
			var y = ystart;
			var x = xstart;
			
			ctx.beginPath();
			ctx.rect(x-width, y+nudge, width, 48);
			var grd = ctx.createLinearGradient(0, 0, width+30, 0);
			grd.addColorStop(0, colors[i]);
			grd.addColorStop(1, 'white');
			ctx.fillStyle = grd;
			ctx.fill();	

			/*text1*/
			ctx.fillStyle = 'black';
			ctx.textAlign = 'left';
			ctx.font = '400 15px Avenir';
			ctx.fillText(texts[i], x-width+10, y+30+nudge);
			
			nudge += ynudge;
		}
	}
	
	function arrow(x,y, value){
		ctx.beginPath();
		if(value>0){	
			ctx.moveTo(25+x, 0+y);
			ctx.lineTo(43+x, 10+y);
			ctx.lineTo(43+x, 20+y);
			ctx.lineTo(7+x, 20+y);
			ctx.lineTo(7+x, 10+y);
			ctx.lineTo(25+x, 0+y);
			ctx.fillStyle = green;
			value ='+'+value;
		}else{
			ctx.moveTo(7+x, 4+y);
			ctx.lineTo(43+x, 4+y);
			ctx.lineTo(43+x, 14+y);
			ctx.lineTo(25+x, 24+y);
			ctx.lineTo(7+x, 14+y);
			ctx.lineTo(7+x, 4+y);
			ctx.fillStyle = yellow;
		}
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = 'white';
		if(value<=0){ctx.fillStyle = 'black';}
		ctx.font = '12px Avenir';
		ctx.fillText(value, 25+x, 16+y);
	}
	
	function roundedRect(x,y,c,t){
		var rectX = x,
			rectY = y,
			rectWidth = 48,
			rectHeight = 48,
			cornerRadius = 20,
			text = t;

		ctx.lineJoin = 'round';
		ctx.lineWidth = cornerRadius;

		ctx.strokeStyle = c;
		ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
		ctx.fillStyle = c;
		ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
		
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '100 20px Avenir';
		if(Number.isInteger(t)){
			ctx.fillText(text+'%', x+24, y+32);
		}
	}

	function genColumn(j,x){
		var y = ystart,
			nudge = ynudge,
			isBrand = document.getElementById('brand2'+(j+1)).value,
			img = new Image();
			console.log(isBrand);
			img.src = (isBrand)? 'img/'+isBrand +'.png':'img/'+data[j].brand +'.png';
		
		roundedRect(0+x,0+y-70,colors[3], '');
		
		img.onload = function(){
			
			ctx.drawImage(img,0+x,0+y-70, 48, 48);

			for(var i=0; i<data[j].values.length; i++){

				var variation = data[j].variations[i];

				roundedRect(0+x,0+y,colors[i], data[j].values[i]);
				if(variation)arrow(0+x,0+y-15, variation);
				y += nudge;	
			}
		}
		
		img.onerror = function(){

			for(var i=0; i<data[j].values.length; i++){

				var variation = data[j].variations[i];

				roundedRect(0+x,0+y,colors[i], data[j].values[i]);
				if(variation)arrow(0+x,0+y-15, variation);
				y += nudge;	
			}
		}
	}
	
	function genTab(){
		var x = xstart,
			nudge = xnudge;
		
		for(var i=0; i<data.length; i++){
			genColumn(i, x);
			x += nudge;
		}
	}
	
	function clearAll(){
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.rect(0, 0, c.width, c.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	function genCanvas(){
		dataUpdate();
		fetchInputs();
		clearAll();
		genLabels();
		genTab();
	}

	/** run **/
	genForm(rows);
	document.getElementById('generateBtn2').addEventListener('click', function(){
		genCanvas();
	});
	genCanvas()
	
})()