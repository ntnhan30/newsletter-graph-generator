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
        row.PreviousTop1Reliable = parseInt(previousRow[0]["Top1_IDS 1 - … reliable"].slice(0, -1))
        row.PreviousTop1Discounts = parseInt(previousRow[0]["Top1_IDS 2 - … deals_discounts"].slice(0, -1))
        row.PreviousTop1Service = parseInt(previousRow[0]["Top1_IDS 3 - … best customer service"].slice(0, -1))
        row.PreviousTop1Variety = parseInt(previousRow[0]["Top1_IDS 4 - … big variety"].slice(0, -1))
        row.PreviousTop1EasyToUse = parseInt(previousRow[0]["Top1_IDS 5 - … easy to use"].slice(0, -1))
        row.PreviousTop1Payment = parseInt(previousRow[0]["Top1_IDS 6 - … convenient payment"].slice(0, -1))
        row.PreviousTop1Delivery = parseInt(previousRow[0]["Top1_IDS 7 - … fastest delivery"].slice(0, -1))
        row.PreviousTop1Restaurants = parseInt(previousRow[0]["Top1_IDS 8 - … good quality restaurants"].slice(0, -1))
        row.PreviousTop1Trust = parseInt(previousRow[0]["Top1_IDS 9 - … brand I can trust"].slice(0, -1))
        row.PreviousTop1FoodChain = parseInt(previousRow[0]["Top1_IDS 11 - … big food chains"].slice(0, -1))
        row.PreviousTop1Brand = parseInt(previousRow[0]["Top1_IDS 12 - … #1 brand"].slice(0, -1))
        row.PreviousTop1Time = parseInt(previousRow[0]["Top1_IDS 13 - … time guarantee"].slice(0, -1))
        row.PreviousTop1HealthyFood = parseInt(previousRow[0]["Top1_IDS 14 - … big variety of healthy food"].slice(0, -1))
        row.PreviousTop1Price = parseInt(previousRow[0]["Top1_IDS 15 - … best price"].slice(0, -1))
        row.PreviousTop1LoyalProgramme = parseInt(previousRow[0]["Top1_IDS 16 - … loyalty programme"].slice(0, -1))
        row.PreviousTop1Delivery30Mins = parseInt(previousRow[0]["Top1_IDS 17 - … 30 minutes delivery"].slice(0, -1))

        row.PreviousTop3Reliable = parseInt(previousRow[0]["Top3_IDS 1 - … reliable"].slice(0, -1))
        row.PreviousTop3Discounts = parseInt(previousRow[0]["Top3_IDS 2 - … deals_discounts"].slice(0, -1))
        row.PreviousTop3Service = parseInt(previousRow[0]["Top3_IDS 3 - … best customer service"].slice(0, -1))
        row.PreviousTop3Variety = parseInt(previousRow[0]["Top3_IDS 4 - … big variety"].slice(0, -1))
        row.PreviousTop3EasyToUse = parseInt(previousRow[0]["Top3_IDS 5 - … easy to use"].slice(0, -1))
        row.PreviousTop3Payment = parseInt(previousRow[0]["Top3_IDS 6 - … convenient payment"].slice(0, -1))
        row.PreviousTop3Delivery = parseInt(previousRow[0]["Top3_IDS 7 - … fastest delivery"].slice(0, -1))
        row.PreviousTop3Restaurants = parseInt(previousRow[0]["Top3_IDS 8 - … good quality restaurants"].slice(0, -1))
        row.PreviousTop3Trust = parseInt(previousRow[0]["Top3_IDS 9 - … brand I can trust"].slice(0, -1))
        row.PreviousTop3FoodChain = parseInt(previousRow[0]["Top3_IDS 11 - … big food chains"].slice(0, -1))
        row.PreviousTop3Brand = parseInt(previousRow[0]["Top3_IDS 12 - … #1 brand"].slice(0, -1))
        row.PreviousTop3Time = parseInt(previousRow[0]["Top3_IDS 13 - … time guarantee"].slice(0, -1))
        row.PreviousTop3HealthyFood = parseInt(previousRow[0]["Top3_IDS 14 - … big variety of healthy food"].slice(0, -1))
        row.PreviousTop3Price = parseInt(previousRow[0]["Top3_IDS 15 - … best price"].slice(0, -1))
        row.PreviousTop3LoyalProgramme = parseInt(previousRow[0]["Top3_IDS 16 - … loyalty programme"].slice(0, -1))
        row.PreviousTop3Delivery30Mins = parseInt(previousRow[0]["Top3_IDS 17 - … 30 minutes delivery"].slice(0, -1))
        
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
