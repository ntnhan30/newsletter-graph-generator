// JavaScript Document
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

'use strict';

(function(){

	/* canvas setup */
	var c = document.getElementById('canvas3');
	var ctx = c.getContext('2d');

	/*variables and parameters */
	var labels = {
			label1 : 'IDEAL',
			label2 : 'TOP 3',
		},
		rows = 8,
		color = {
			primary: '#54BAD1',
			secondary: '#d70f64'
		},
		posX = 280,
		posY = 5,
		spaceY = 10,
		data = [
			{ 
				text : 'be easy to use when placing an order',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
			{ 
				text : 'offer a big variety',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
			{ 
				text : 'offer the best price',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
			{
				text : 'be reliable (I know what I will get)',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},	
			{
				text : 'offer good quality restaurants',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},	
			{
				text : 'have delivery time guarantee',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
			{
				text : 'offer the best customer service',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
			{
				text : 'offer the best deals and discounts',
				value1 : getRandomInt(100),
				value2 : getRandomInt(100),
				value3 : getRandomInt(100),
				value4 : getRandomInt(100),
			},
		];


	/********** functions ***********/
	
	function genForm(n){
		for(var i=1; i < n+1; i++){
			var thisValue = 'value'+i,
				line = '<div id="line'+i+'">'+
				'<span class="selector-title">text'+i+': </span>'+
				'<input type="text'+i+'" name="text'+i+'" id="text'+i+'" class="text"/>'+
				'<span class="selector-title"> values: </span>'+
				' 1<input type="text" name="'+thisValue+'1" id="'+thisValue+'1" class="input"/>'+
				' 2<input type="text" name="'+thisValue+'2" id="'+thisValue+'2" class="input"/>'+
				' 3<input type="text" name="'+thisValue+'3" id="'+thisValue+'3" class="input"/>'+
				' 4<input type="text" name="'+thisValue+'4" id="'+thisValue+'4" class="input"/>'+
				'</div>';

			document.getElementById("form1").insertAdjacentHTML('beforeend', line)
		}
	}

	function drawTriangle(x,y,type){
		switch(type){
			case 'blue':
				ctx.beginPath();
				ctx.moveTo(0+x, 0+y);
				ctx.lineTo(0+x, 14+y);
				ctx.lineTo(14+x, 7+y);
				ctx.closePath();
				ctx.strokeStyle = '#54BAD1';
				ctx.stroke();
				break
			case 'green':
				ctx.beginPath();
				ctx.moveTo(7+x, 0+y);
				ctx.lineTo(0+x, 14+y);
				ctx.lineTo(14+x, 14+y);
				ctx.closePath();
				ctx.fillStyle = green;
				ctx.fill();	
				break
			case 'red':
				ctx.beginPath();
				ctx.moveTo(0+x, 0+y);
				ctx.lineTo(14+x, 0+y);
				ctx.lineTo(7+x, 14+y);
				ctx.closePath();
				ctx.fillStyle = yellow;
				ctx.fill();
				break
		}
	} 

	
	function genLabels(){
		/*label1*/
		ctx.beginPath();
		ctx.rect(posX+30, posY+10, 140, 25);
		ctx.fillStyle = color.secondary;
		ctx.fill();
		
		/*label2*/
		ctx.beginPath();
		ctx.rect(posX+180, posY+10, 140, 25);
		ctx.fillStyle = color.primary;
		ctx.fill();

		/*text1*/
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '15px Avenir';
		ctx.fillText(labels.label1, posX+100, posY+28);	

		/*text2*/
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.font = '15px Avenir';
		ctx.fillText(labels.label2,posX+250, posY+28);
	}

	function fetchInputs(){
			switch(globalColors.value){
				case 'pink':
					color.primary = '#54BAD1';
					color.secondary = '#d70f64';

				break
				case 'red':
					color.primary = '#83828A';
					color.secondary = '#D61F26';
				break
				case 'orange':
					color.primary = '#FF6F00';
					color.secondary = '#141E73';
				break
			}
		
		for(var i=1; i < rows+1; i++){
			if(document.getElementById("text"+i).value){
				data[i-1].text = document.getElementById("text"+i).value;
			}
			if(document.getElementById("value"+i+"1").value){
				data[i-1].value1 = Number(document.getElementById("value"+i+"1").value);
			}	
			if(document.getElementById("value"+i+"2").value){
				data[i-1].value2 = Number(document.getElementById("value"+i+"2").value);
				
			}	
			if(document.getElementById("value"+i+"3").value){
				data[i-1].value3 = Number(document.getElementById("value"+i+"3").value);
			}	
			if(document.getElementById("value"+i+"4").value){
				data[i-1].value4 = Number(document.getElementById("value"+i+"4").value);
			}
		}
	}

	function genText(){
		spaceY = 10;

		for(var i = 0; i < data.length; i++ ){
			spaceY +=30;
			var line = 20+spaceY;

			/*text */
			ctx.fillStyle = 'black';
			ctx.font = '14px Avenir';
			ctx.textAlign = 'right';
			ctx.fillText(data[i].text, posX, posY+line);

			/*value 1*/
			ctx.fillStyle = color.secondary;
			ctx.font = '800 18px Avenir';
			ctx.textAlign = 'center';
			ctx.fillText(data[i].value1+'%', posX+60, posY+2+line);

			/* triangle */
			var triangleColor;
			if (data[i].value1 <= data[i].value2+2 && data[i].value1 >= data[i].value2-2){triangleColor = 'blue'}
			else if (data[i].value1 < data[i].value2){triangleColor ='red'}
			else{triangleColor = 'green'}
			drawTriangle(posX+95,posY+9+spaceY, triangleColor);

			/* value 2*/
			ctx.fillStyle = color.secondary;
			ctx.font = '200 18px Avenir';
			ctx.textAlign = 'center';
			ctx.fillText('('+ data[i].value2 + '%)', posX+146, posY+2+line);

			/*value 3*/
			ctx.fillStyle = color.primary;
			ctx.font = '800 18px Avenir';
			ctx.textAlign = 'center';
			ctx.fillText(data[i].value3+'%', posX+205, posY+2+line);

			/* triangle */
			if (data[i].value3 <= data[i].value4+2 && data[i].value3 >= data[i].value4-2){triangleColor = 'blue'}
			else if (data[i].value3 < data[i].value4){triangleColor ='red'}
			else{triangleColor = 'green'}
			drawTriangle(posX+242,posY+9+spaceY, triangleColor);

			/* value 4*/
			ctx.fillStyle = color.primary;
			ctx.font = '200 18px Avenir';
			ctx.textAlign = 'center';
			ctx.fillText('('+ data[i].value4 + '%)',posX+293, posY+2+line);
		}
	}

	function clearAll(){
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.rect(0, 0, c.width, c.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	function genCanvas(){
		
		fetchInputs();
		clearAll(),
		genLabels(),
		genText();
		console.log(color.primary);
	}

	/** run **/
	
	genForm(rows);
	document.getElementById('generateBtn').addEventListener('click', function(){
		genCanvas();
	});
	genCanvas();
})()
