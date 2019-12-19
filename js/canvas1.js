// JavaScript Document
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

"use strict";

(function() {
  /* canvas setup */
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");

  /*variables and parameters */
  var rows = 8,
    ystart = 130,
    xstart = 80,
    xnudge = 65,
    size = 2,
    brands = [
      "foodpanda",
      "uber",
      "mc donalds",
      "pizza hut",
      "bee",
      "kfc",
      "dominos",
      "deliveroo"
    ],
    colors = ["#E97BAE", "#d70f64", "#B1E0EA", "#54BAD1"],
    textColor = "black",
    data = [
      {
        brand: "foodpanda",
        values: [100, 80],
        variations: [5, -12]
      },
      {
        brand: "uber",
        values: [65, 30],
        variations: [14, -12]
      },
      {
        brand: "mc donalds",
        values: [55, 20],
        variations: [-5, -12]
      },
      {
        brand: "pizza hut",
        values: [32, 8],
        variations: [37, 0]
      },
      {
        brand: "bee",
        values: [17, 10],
        variations: [5, 12]
      },
      {
        brand: "kfc",
        values: [8, 4],
        variations: [-5, -12]
      },
      {
        brand: "dominos",
        values: [5, 5],
        variations: [5, 12]
      },
      {
        brand: "deliveroo",
        values: [2, 0],
        variations: [-5, -12]
      }
    ];

  /* functions */
  function genForm(n) {
    for (var i = 1; i < n + 1; i++) {
      var thisValue = "cvalue" + i,
        thisVariation = "cvariation" + i,
        thisColor = "color" + i,
        line =
          '<div id="line' +
          i +
          '">' +
          '<span class="selector-title">Brand ' +
          i +
          ": </span>" +
          '<input type="brand3' +
          i +
          '" name="brand3' +
          i +
          '" id="brand3' +
          i +
          '" class="text"/>' +
          ' Unaided Awareness: <input type="text" name="' +
          thisValue +
          '1" id="' +
          thisValue +
          '1" class="input"/>' +
          ' (variation): <input type="text" name="' +
          thisVariation +
          '1" id="' +
          thisVariation +
          '1" class="input"/>' +
          ' Top of mind: <input type="text" name="' +
          thisValue +
          '2" id="' +
          thisValue +
          '2" class="input"/>' +
          ' (variation): <input type="text" name="' +
          thisVariation +
          '2" id="' +
          thisVariation +
          '2" class="input"/>' +
          ' Brand color? <input type="checkbox" name="' +
          thisValue +
          'check" id="' +
          thisColor +
          '" class="checkbox"/>' +
          "</div>";

      document.getElementById("form3").insertAdjacentHTML("beforeend", line);
    }
  }

  function fetchInputs() {
    switch (globalColors.value) {
      case "pink":
        colors = ["#E97BAE", "#d70f64", "#B1E0EA", "#54BAD1"];

        break;
      case "red":
        colors = ["#E67979", "#D61F20", "#B7B5BA", "#83828A"];
        break;
      case "orange":
        (colors = ["#9DA1C4", "#495092", "#FFB983", "#FF6F00"]),
          (textColor = "black");
        break;
    }

    for (var j = 1; j < rows + 1; j++) {
      for (var i = 1; i < 3; i++) {
        if (document.getElementById("cvalue" + j + i).value) {
          data[j - 1].values[i - 1] = Number(
            document.getElementById("cvalue" + j + i).value
          );
        }
        if (document.getElementById("cvariation" + j + i).value) {
          data[j - 1].variations[i - 1] = Number(
            document.getElementById("cvariation" + j + i).value
          );
        }
      }
    }
  }

  function arrow(x, y, value) {
    ctx.beginPath();
    if (value > 0) {
      ctx.moveTo(20 + x, 0 + y);
      ctx.lineTo(38 + x, 10 + y);
      ctx.lineTo(38 + x, 20 + y);
      ctx.lineTo(2 + x, 20 + y);
      ctx.lineTo(2 + x, 10 + y);
      ctx.lineTo(20 + x, 0 + y);
      ctx.fillStyle = green;
      value = "+" + value;
    } else {
      ctx.moveTo(2 + x, 4 + y);
      ctx.lineTo(38 + x, 4 + y);
      ctx.lineTo(38 + x, 14 + y);
      ctx.lineTo(20 + x, 24 + y);
      ctx.lineTo(2 + x, 14 + y);
      ctx.lineTo(2 + x, 4 + y);
      ctx.fillStyle = yellow;
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    if (value <= 0) {
      ctx.fillStyle = "black";
    }
    ctx.textAlign = "center";
    ctx.font = "12px Avenir";
    ctx.fillText(value, 20 + x, 16 + y);
  }

  function genColumn(j, x) {
    var img = new Image();
    img.src = "img/" + data[j].brand + ".png";

    img.onload = function() {
      var y = ystart;
      ctx.drawImage(img, 0 + x, 0 + y + 110, 48, 48);
    };
  }

  function genGraph(j, x) {
    var color = [],
      colored = document.getElementById("color" + (j + 1));

    if (colored.checked) {
      color[0] = colors[0];
      color[1] = colors[1];
    } else {
      color[0] = colors[2];
      color[1] = colors[3];
    }

    for (var i = 0; i < data[j].values.length; i++) {
      var startpoint = ystart + 90,
        length = data[j].values[i] * size;

      if (length < 1) {
        length = 1;
      }

      ctx.beginPath();
      ctx.rect(0 + x, 0 + startpoint, 48, -length);
      ctx.fillStyle = color[i];
      ctx.fill();
    }
  }

  function genLabels() {
    ctx.fillStyle = colors[0];
    ctx.textAlign = "center";
    ctx.font = "800 15px Avenir";
    ctx.fillText("UA", xstart - 40, ystart - 90);

    ctx.fillStyle = colors[1];
    ctx.textAlign = "center";
    ctx.font = "800 15px Avenir";
    ctx.fillText("TOM", xstart - 40, ystart + 80);
  }

  function genVariations(j, x) {
    var spacer = -15,
      val1 = data[j].values[0],
      val2 = data[j].values[1];

    if (val1 <= val2 + 14) {
      spacer = val1 - val2 - 30;
    }

    for (var i = 0; i < data[j].values.length; i++) {
      var variation = data[j].variations[i],
        startpoint = ystart + 90,
        length = data[j].values[i] * size,
        textspacer = -15,
        varspacer = textspacer;

      if (length < 1) {
        length = 1;
      }
      if (data[j].variations[0] && data[j].variations[1] && i == 0) {
        varspacer = spacer;
        textspacer = spacer;
      }
      if (i == 0) {
        textspacer = spacer;
      }

      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.font = "400 13px Avenir";
      ctx.fillText(
        data[j].values[i] + "%",
        3 + x,
        startpoint - length + 28 + textspacer
      );

      if (variation)
        arrow(24 + x, 0 + startpoint - length + varspacer, variation);
    }
  }

  function genTab() {
    var x = xstart,
      nudge = xnudge;

    for (var i = 0; i < data.length; i++) {
      genColumn(i, x);
      genGraph(i, x);
      //genTexts(i,x);
      genVariations(i, x);
      x += nudge;
    }
  }

  function clearAll() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.fill();
  }
  // fecth data from google sheet and save to dataJson
  const Http = new XMLHttpRequest();
  const url =
    " https://sheets.googleapis.com/v4/spreadsheets/1ZyLacbzNQbWVSobdNdrJTu88fa_i9xGO1NzMnWBl4jw/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyDXPBhFrqEyFJ8X4eqPvATMpTCtvwAelH4";
  Http.open("GET", url);
  Http.send();
  let dataJson = [];
  Http.onreadystatechange = e => {
    dataJson = JSON.parse(Http.responseText).valueRanges[0].values;
  };

  function modifyData() {
    // modify data
    let rows = [];
    for (var i = 1; i < dataJson.length; i++) {
      var rowObject = {};
      for (var j = 0; j < dataJson[i].length; j++) {
        rowObject[dataJson[0][j]] = dataJson[i][j];
      }
      rows.push(rowObject);
    }
    // clean up data, keep only valid rows
    let modifiedData = rows.filter(row => row.Wave);
    let previousRow = null;
    modifiedData.map(row => {
      previousRow = modifiedData.filter(
        e =>
          e.Market === row.Market &&
          e.Brand === row.Brand &&
          e.Wave === "W0" + (row.Wave.split("")[2] - 1)
      );
      row["UnaidedAwarenessvAriation"] = previousRow[0];

      // console.log("row", row)
      //console.log("previousRow",previousRow[0])

      if (row.UnaidedAwarenessvAriation) {
        row.UnaidedAwarenessvAriation =
          parseInt(
            previousRow[0]["BF_1 - Aided brand awareness"].slice(0, -1)
          ) - parseInt(row["BF_1 - Aided brand awareness"].slice(0, -1));
          row.TopOfMindAriation =
          parseInt(
            previousRow[0]["ToM - Top of Mind"].slice(0, -1)
          ) - parseInt(row["ToM - Top of Mind"].slice(0, -1));
      }
    });
    console.log(modifiedData);
    return modifiedData;
  }

  function genCanvas() {
    fetchInputs();
    clearAll();
    genLabels();
    genTab();
    modifyData();
  }

  /** run **/
  genForm(rows);
  document.getElementById("generateBtn3").addEventListener("click", function() {
    genCanvas();
  });
  genCanvas();
})();
