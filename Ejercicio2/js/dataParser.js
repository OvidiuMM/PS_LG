/* stages:
    * fetch data files
    * store in objects (JSON)
    * uniformize data
    * use graph library to display */

let url_data = ['http://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'http://s3.amazonaws.com/logtrust-static/test/test/data2.json',
  'http://s3.amazonaws.com/logtrust-static/test/test/data3.json'];
var myArticle = document.getElementById('toReplaceWithGraphs');
var data1 = []

/*{"myDate":"2015-06-02","categ":"CAT 1","val":46.300059172697175}
{"d":1435708800000,"cat":"Cat 1","value":832.803815816826}
{"raw":"CHCZfl8dVb iAF1sqI 2015-06-03 rM0dh Rqh kNfs1H Z0LR3K6 xZqfc 2C359d
foLx LB6c #CAT 2#","val":6.400865852071913}*/
var category_class = {
    "myDate":"2015-06-02",
    "categ":"CAT 1",
    "val":46.300059172697175
};


//Fetch data files and store it
function obtainJSON(){


    for (let url_to_get of url_data){
      fetch(url_to_get
      //  , {mode: 'no-cors' // 'cors' by default}
    )
      .then(function(response) {
         if (response.status >= 200 && response.status < 300) {
           return response.text().
           then(function(text) {
             toReplaceWithGraphs.innerHTML = text;
             if (url_to_get.indexOf("data1") !== -1){
               data1 = JSON.parse(text);
             }
             else if (url_to_get.indexOf("data2") !== -1){
               data2 = JSON.parse(text);
             }
             else {
               data3 = JSON.parse(text);
             }
              // console.log('Text to json', array);
             });
         }
         else {
           return new Error(response.statusText)
         }

    }).catch(function(error) {
      console.log('Request failed', error);
    });
    }
    console.log('Text to json', data1);
  }
