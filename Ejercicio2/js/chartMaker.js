/* stages:
    * adapt data
    * draw graph */
function makeGraphs(dataSet){
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {packages: ['corechart', 'line']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChartPie);
      google.charts.setOnLoadCallback(drawCrosshairs);


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
             console.log("elemnt at position",posFound);
             console.log("elemnt",element);

             console.log("total",categoryProportion[posFound]);
          }
          else{
            categoryProportion.push([element.category, element.value])
          }
        }
        console.log("elemnts",categoryProportion);
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
                       'width':400,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
      }

      function getValues(){
        let formatedDataSet = [];
      /*  for (element of dataSet){
          //check that date exists
            //if yes add category's value to it's position
            //else insert date to first smaller date


        }*/

        date1 = returnDate("02-06-2015");
        date2 = returnDate("03-06-2015");
        date3 = returnDate("04-06-2015");
        date4 = returnDate("05-06-2015");

        return [[date1, 0, 0, 0, 0],    [date2,1, 10, 5, 100],  [date3, 2, 11, 6, 112],
            [date4, 3, 13, 7, 13]];
      }

      function returnDate(stringToDate){
        var parts =stringToDate.split('-');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }

      function drawCrosshairs() {
        console.log("inside line chart");
        var data = new google.visualization.DataTable();
        console.log("proportions: ", getProportions());
          data.addColumn('date', 'X');
        for (columnTag of getProportions())
          {
              data.addColumn('number', columnTag[0]);
          }


        data.addRows(getValues());

        var options = {
          hAxis: {
            title: 'Time'
          },
          vAxis: {
            title: 'Value'
          },
        //  colors: ['#a52714', '#097138'],
          crosshair: {
            color: '#000',
            trigger: 'selection'
          },
          'width':800,
          'height':300
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));

        chart.draw(data, options);
      //  chart.setSelection([{row: 38, column: 1}]);

      }    }
