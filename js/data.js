// JavaScript Document
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

"use strict";

// getting and filter data

// getting input
let inputValue = [];
function getInput() {
  inputValue = document.getElementById("rowsInput").value.split(",");
  console.log(inputValue);
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

let filterData = [];

function modifyData() {
  // modify data to an array of objects
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
  //adding UnaidedAwarenessVariation and TopOfMindVariation
  let previousRow = null;
  modifiedData.map(row => {
    previousRow = modifiedData.filter(
      e =>
        e.Market === row.Market &&
        e.Brand === row.Brand &&
        e.Wave === "W0" + (row.Wave.split("")[2] - 1)
    );
    row["UnaidedAwarenessVariation"] = previousRow[0];
    row["TopOfMindVariation"] = previousRow[0];
    row["AidedAwarenessVariation"] = previousRow[0];
    row["ConsiderationVariation"] = previousRow[0];
    row["UsageVariation"] = previousRow[0];
    row["PreferenceVariation"] = previousRow[0];

    // console.log("row", row)
    //console.log("previousRow",previousRow[0])

    if (row.UnaidedAwarenessVariation) {
      row.UnaidedAwarenessVariation =
        parseInt(previousRow[0]["UA - Unaided Awareness"].slice(0, -1)) -
        parseInt(row["UA - Unaided Awareness"].slice(0, -1));
      row.TopOfMindVariation =
        parseInt(previousRow[0]["ToM - Top of Mind"].slice(0, -1)) -
        parseInt(row["ToM - Top of Mind"].slice(0, -1));
      row.AidedAwarenessVariation =
        parseInt(previousRow[0]["BF_1 - Aided brand awareness"].slice(0, -1)) -
        parseInt(row["BF_1 - Aided brand awareness"].slice(0, -1));
        row.ConsiderationVariation =
        parseInt(previousRow[0]["BF_2 - Brand consideration"].slice(0, -1)) -
        parseInt(row["BF_2 - Brand consideration"].slice(0, -1));
        row.UsageVariation =
        parseInt(previousRow[0]["BF_3 - Brand usage"].slice(0, -1)) -
        parseInt(row["BF_3 - Brand usage"].slice(0, -1));
        row.PreferenceVariation =
        parseInt(previousRow[0]["BF_4 - Brand preference"].slice(0, -1)) -
        parseInt(row["BF_4 - Brand preference"].slice(0, -1));
    }
  });
  console.log(modifiedData);
  // filter data based on user input
  filterData = [];
  inputValue.map(value => {
    modifiedData.map(row => {
      if (row["Row#"] === value) {
        filterData.push(row);
      }
    });
  });

  console.log(filterData);
  //return filterData;
}

document.getElementById("getDataButton").addEventListener("click", function() {
  getInput();
  modifyData();
});

export { filterData };
