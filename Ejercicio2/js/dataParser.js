/* stages:
* fetch data files
* store in objects (JSON)
* uniformize data
* use graph library to display */
var myArticle = document.getElementById('toReplaceWithGraphs');
var processedData = []
var fileCounter = 0;

//process and store first file data
function processData1(result){
  //parse data set 1
  for (dataField of result){
    //for each filed store cat, date and val (with proper format)
    var seconds_d = dataField.d.toString();
    seconds_d = seconds_d.slice(0, -3);
    let thenum = dataField.cat.match(/\d+/)[0];
    let category = "CAT " + thenum;
    function toDateTime(secs) {
      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(secs);
      month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : '' + (t.getMonth() + 1);
      day = t.getDate() < 10 ? '0' + t.getDate(): '' + t.getDate();
      return t.getFullYear() + "-" + month  + "-" + day ;
    }
    let processedDataField = { "date": toDateTime(parseInt(seconds_d)), "category": "CAT " + thenum,
    "value": parseFloat(dataField.value).toFixed(2)
  }
  function findIndex(element) {
    return element.category == processedDataField.category
    && element.date == processedDataField.date;
  }
  let posFound = processedData.findIndex(findIndex);
  if (posFound != -1){
    processedData[posFound].value = parseFloat(processedData[posFound].value)
    + parseFloat(processedDataField.value);
  }
  else{
    processedData.push(processedDataField);
  }
}
fileCounter++;
graphingData();
}

//process and store second file data
function processData2(result){
  //parse data set 2
  for (dataField of result){
    //for each filed store cat, date and val (with proper format)
    let thenum = dataField.categ.match(/\d+/)[0];
    let category = "CAT " + thenum;
    let processedDataField = { "date": dataField.myDate, "category": "CAT " + thenum,
    "value": parseFloat(dataField.val).toFixed(2)
  }
  function findIndex(element) {
    return element.category == processedDataField.category
    && element.date == processedDataField.date;
  }
  let posFound = processedData.findIndex(findIndex);

  if (posFound != -1){
    processedData[posFound].value = parseFloat(processedData[posFound].value)
    + parseFloat(processedDataField.value);
  }
  else{
    processedData.push(processedDataField);
  }
}
fileCounter++;
graphingData();
}

//process and store third file data
function processData3(result){
  //parse data set 3
  //  {"raw":"CHCZfl8dVb iAF1sqI 2015-06-03 rM0dh Rqh kNfs1H Z0LR3K6 xZqfc 2C359d
  //  foLx LB6c #CAT 2#","val":6.400865852071913}
  if (debugMode){
    console.log("Process Data 3 function");
  }
  for (dataField of result){
    //  console.log("field:", dataField);
    let thenum = dataField.raw.match(/#CAT \d+/)[0];
    thenum = thenum.match(/\d+/)[0];
    let dateField = dataField.raw.match(/\d{4}\-\d{2}\-\d{2}/)[0];
    let category = "CAT " + thenum;
    let processedDataField = { "date": dateField, "category": "CAT " + thenum,
    "value": parseFloat(dataField.val).toFixed(2)
  }
  function findIndex(element) {
    return element.category == processedDataField.category
    && element.date == processedDataField.date;
  }
  let posFound = processedData.findIndex(findIndex);
  if (posFound != -1){
    processedData[posFound].value = parseFloat(processedData[posFound].value)
    + parseFloat(processedDataField.value);
  }
  else{
    processedData.push(processedDataField);
  }
}
fileCounter++;
graphingData();
}

//if the 3 files are processed then draw graphs
function graphingData(){
  if (fileCounter == 3){
    toReplaceWithGraphs.innerHTML = "Data retrieved <br> Processing data files... <br> Graphing data...";
    makeGraphs(processedData);
  }
}

//promise function for data fetch
function getDataFromURL(url){
  return fetch(url).then(resp => resp.json())
}

//process triger
function obtainJSON(){
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data1.json')
  .then(processData1)
  .catch(function(error) {
    console.log('Request failed', error);
  });
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data2.json')
  .then(processData2)
  .catch(function(error) {
    console.log('Request failed', error);
  });
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data3.json')
  .then(processData3)
  .catch(function(error) {
    console.log('Request failed', error);
  });
}
