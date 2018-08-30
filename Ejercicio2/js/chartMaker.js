/* stages:
* adapt data
* draw graph */

var debugMode = false;
function makeGraphs(dataSet){
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {packages: ['corechart', 'line']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChartPie);
  google.charts.setOnLoadCallback(drawCrosshairs);

  //Return % for each category
  function getProportions(){
    let categoryProportion = [];
    for (element of dataSet){
      function findIndex(itemPosition) {
        return itemPosition[0] == element.category ;
      }
      let posFound = categoryProportion.findIndex(findIndex);
      if (posFound != -1){
        categoryProportion[posFound][1] = parseFloat(categoryProportion[posFound][1])
        + parseFloat(element.value);
      }
      else{
        categoryProportion.push([element.category, element.value])
      }
    }
    return categoryProportion;
  }

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChartPie() {
    document.getElementById('toReplaceWithGraphs').style.display = "none";

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Categories');
    data.addColumn('number', 'Values');
    data.addRows(getProportions());

    // Set chart options
    var options = {'title':'Categories proportions',
    'width':900,
    'height':900};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }

  //Numbers of categories
  function getDataSetNumber(){
    let numberSets = [];
    for (element of dataSet)
    {
      function findIndex(itemPosition) {
        return itemPosition ==  element.category ;
      }
      let posFound = numberSets.findIndex(findIndex);
      if(posFound == -1){
        numberSets.push(element.category);
      }
    }
    return numberSets.length + 1;
  }

  //For each element in data set store it's value for each date or 0 if
  //there is no value
  function getValues(){
    let formatedDataSet = [];
    let limit = getDataSetNumber();
    for (element of dataSet){
      //check that date exists
      //if yes add category's value to it's position
      //else insert date
      //set to 0 the rest of categories
      function findIndex(itemPosition) {
        return itemPosition[0].getTime() == new Date(element.date).getTime();//returnDate(element.date) ;
      }
      positionInsertion = element.category.match(/\d+/)[0];
      let posFound = formatedDataSet.findIndex(findIndex);
      if (posFound != -1){

        if (positionInsertion != -1){
          formatedDataSet[posFound][positionInsertion] = parseFloat(element.value);
        }
        else{
            console.error("Data found doesn't correspond with any category",element);
        }
      }
      else{
        let formatedElement = []
        for (var counter = 0; counter < limit; counter++){
          if (formatedElement.length > 0){
            formatedElement.push(0);
          }
          else{
            formatedElement.push(new Date(element.date));//returnDate(element.date));
          }
        }
        formatedDataSet.push(formatedElement);
      }
    }
    return formatedDataSet;
  }

//Callback that creates and populates a data table,
// instantiates the line chart, passes in the data and
// draws it.
function drawCrosshairs() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'X');
  for (columnTag of getProportions())
  {
    data.addColumn('number', columnTag[0]);
  }
  let dataToInsert = getValues();
  data.addRows(dataToInsert);
  data.sort({column: 0, asc: true});
  var options = {
    hAxis: {
      title: 'DATE'
    },
    vAxis: {
      title: 'AMOUNT'
    },
    //  colors: ['#a52714', '#097138'],
    crosshair: {
      color: '#000',
      trigger: 'selection'
    },
    'width':900,
    'height':300
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}
}
