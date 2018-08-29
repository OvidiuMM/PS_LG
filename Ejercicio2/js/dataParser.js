/* stages:
    * fetch data files
    * store in objects (JSON)
    * uniformize data
    * use graph library to display */

let url_data = ['http://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'http://s3.amazonaws.com/logtrust-static/test/test/data2.json',
  'http://s3.amazonaws.com/logtrust-static/test/test/data3.json'];
var myArticle = document.getElementById('toReplaceWithGraphs');
/*{"myDate":"2015-06-02","categ":"CAT 1","val":46.300059172697175}
{"d":1435708800000,"cat":"Cat 1","value":832.803815816826}
{"raw":"CHCZfl8dVb iAF1sqI 2015-06-03 rM0dh Rqh kNfs1H Z0LR3K6 xZqfc 2C359d
foLx LB6c #CAT 2#","val":6.400865852071913}*/

const date_name = 'date';
const category_name = 'category';
const value_name = 'value';
var processed_data = []
function process_data(result,data_set){

  if (data_set === 0){
  //parse data set 1
    for (data_field of result){
      //console.log("field:", data_field);
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
      if (processed_data.indexOf(processed_data_field) != -1)
      {processed_data.push(processed_data_field);
          console.log("value find",processed_data_field);
    }
    else{
      console.log("value not found",processed_data_field);
    }}
    console.log("list: ", processed_data);
  }
  else if (data_set === 1){
    //parse data set 2
    for (data_field of result){
      //for each filed store cat, date and val (with proper format)
        let thenum = data_field.categ.match(/\d+/)[0];
        let category = "CAT " + thenum;
        let processed_data_field = { "date": data_field.myDate, "category": "CAT " + thenum,
        "value": parseFloat(data_field.val).toFixed(2)
      };
      if (processed_data.find( item=>item.category==processed_data_field.category
        & item=>item.date==processed_data_field.date))
        {
          processed_data.push(processed_data_field);
            console.log("value find",processed_data_field);
      }
      else{
        console.log("value not found",processed_data_field);
      }
    }
  }
  else {
  //parse data set 3
//  {"raw":"CHCZfl8dVb iAF1sqI 2015-06-03 rM0dh Rqh kNfs1H Z0LR3K6 xZqfc 2C359d
//  foLx LB6c #CAT 2#","val":6.400865852071913}

    for (data_field of result){
      //  console.log("field:", data_field);
      let thenum = data_field.raw.match(/#CAT \d+/)[0];
      thenum = thenum.match(/\d+/)[0];
      let date_field = data_field.raw.match(/\d{4}\-\d{2}\-\d{2}/)[0];
;

      let category = "CAT " + thenum;
      let processed_data_field = { "date": date_field, "category": "CAT " + thenum,
      "value": parseFloat(data_field.val).toFixed(2)
    }
      if (processed_data.indexOf(processed_data_field) != -1)
      {processed_data.push(processed_data_field);
          console.log("value find",processed_data_field);
    }
    else{
      console.log("value not found",processed_data_field);
    }
    }
  }

}
//Fetch data files and store it
function obtainJSON(url_to_get, data_set){
    var result_data = [];
    fetch(url_to_get
    //, {mode: 'no-cors'} // 'cors' by default}
    )
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text()
        .then(function(text) {
          toReplaceWithGraphs.innerHTML = "Data retrieved";
          //  console.log('Data retrieved2: ', text);
            process_data(JSON.parse(text), data_set);
          });
      }
      else {
        return new Error(response.statusText)
      }

    }).catch(function(error) {
      console.log('Request failed', error);
    });

  }



  function startGraphRoutine(){
    // * fetch data files and store in objects (JSON)


    var i = 0;
    // and…
    Promise.all([obtainJSON(url_data[0],0),
    obtainJSON(url_data[1],1), obtainJSON(url_data[2],2)])
    .then(function() {
        console.log('Got the result');
      // all loaded
    }, function() {
      console.log('ERROR');
      // one or more failed
    });

    // * uniformize data
    // * use graph library to display
  }
