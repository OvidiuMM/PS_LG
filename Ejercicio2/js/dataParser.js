/* stages:
    * fetch data files
    * store in objects (JSON)
    * uniformize data
    * use graph library to display */

var myArticle = document.getElementById('toReplaceWithGraphs');
var processed_data = []

function process_data1(result){
  //parse data set 1
    for (data_field of result){
      //for each filed store cat, date and val (with proper format)
        var seconds_d = data_field.d.toString();
        seconds_d = seconds_d.slice(0, -3);
        let thenum = data_field.cat.match(/\d+/)[0];
        let category = "CAT " + thenum;
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1); // Epoch
          t.setSeconds(secs);
          month = t.getMonth() < 10 ? '0' + t.getMonth() : '' + t.getMonth();
          day = t.getDate() < 10 ? '0' + t.getDate(): '' + t.getDate();
          return t.getFullYear() + "-" + month  + "-" + day ;
        }
        let processed_data_field = { "date": toDateTime(parseInt(seconds_d)), "category": "CAT " + thenum,
        "value": parseFloat(data_field.value).toFixed(2)
      }
      processed_data.push(processed_data_field);
    }

  }

  function process_data2(result){
    //parse data set 2
    for (data_field of result){
      //for each filed store cat, date and val (with proper format)
        let thenum = data_field.categ.match(/\d+/)[0];
        let category = "CAT " + thenum;
        let processed_data_field = { "date": data_field.myDate, "category": "CAT " + thenum,
        "value": parseFloat(data_field.val).toFixed(2)};
        processed_data.push(processed_data_field);
    }
  }

  function process_data3(result){

  //parse data set 3
//  {"raw":"CHCZfl8dVb iAF1sqI 2015-06-03 rM0dh Rqh kNfs1H Z0LR3K6 xZqfc 2C359d
//  foLx LB6c #CAT 2#","val":6.400865852071913}

    for (data_field of result){
      //  console.log("field:", data_field);
      let thenum = data_field.raw.match(/#CAT \d+/)[0];
      thenum = thenum.match(/\d+/)[0];
      let date_field = data_field.raw.match(/\d{4}\-\d{2}\-\d{2}/)[0];
      let category = "CAT " + thenum;
      let processed_data_field = { "date": date_field, "category": "CAT " + thenum,
      "value": parseFloat(data_field.val).toFixed(2)

    }
    processed_data.push(processed_data_field);
    }

  console.log("data proces list:",processed_data);
  graphingData();
}

function graphingData(){
    console.log('Graphing data...');
    toReplaceWithGraphs.innerHTML = "Data retrieved <br> Processing data files... <br> Graphing data...";
}

function getDataFromURL(url){
return fetch(url).then(resp => resp.json())
}

function obtainJSON(){
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data1.json')
  .then(process_data1)
  .catch(function(error) {
    console.log('Request failed', error);
  });
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data3.json')
  .then(process_data3)
  .catch(function(error) {
    console.log('Request failed', error);
  });
  getDataFromURL('https://s3.amazonaws.com/logtrust-static/test/test/data2.json')
  .then(process_data2)
  .catch(function(error) {
    console.log('Request failed', error);
  });
}
