// https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json
// This data is encoded using base64
// Window.atob() decodes a string of data which has been encoded using bases-64 encoding

const height = 100;
const width = 400;
const apiUrl = "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json"

// ┌─────────────────────────┐
// │   Build Line Function   │	
// └─────────────────────────┘

function buildJSONLine(ds){

    // Line function
    const lineFun = d3.svg.line()
    .x(function(d){return (d.month-20130001)/3.25})
    .y(function(d){return (height-d.sales);})
    .interpolate("linear");

    // Append svg to tag
    const svg = d3.select("#api")
            .append("svg")
            .attr({
            width: width,
            height: height
    });

    // Append visuals to svg
    const viz = svg.append("path")
                .attr({
                d: lineFun(ds.monthlySales),
                    "stroke": "purple",
                    "stroke-width": 2,
                    "fill": "none"
                });
}

// ┌──────────────────────────┐
// │   Show Header Function   │	
// └──────────────────────────┘

function showHeader(ds) {
    d3.select("#api").append("h1")
                    .text(ds.category + " Sales (2013)");
}

// ┌───────────────────────────┐
// │   Read Data then Append   │	
// └───────────────────────────┘

d3.json(apiUrl, function(error, data){

    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

    const decodedData = JSON.parse(window.atob(data.content));
    console.log(decodedData.contents[0].monthlySales[0]);
    console.log(decodedData.contents[1]);

    decodedData.contents.forEach(function(ds){
        showHeader(ds);
        buildJSONLine(ds);
    })
});


///////////////////////////////////////////////////////////////
// Scaling: Helps create responsive data visualizations
///////////////////////////////////////////////////////////////

const height2 = 200;
const width2 = 500;
const apiUrl2 = "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json"
const padding = 50;

// ┌──────────────────────┐
// │   getDate Function   │	
// └──────────────────────┘

function getDate(d){

    //20130101
    const strDate = new String(d);

    const year = strDate.substr(0, 4);
    const month = strDate.substr(4,2) - 1;
    const day = strDate.substr(6,2);

    return new Date(year, month, day);
}

// ┌─────────────────────────┐
// │   Build Line Function   │	
// └─────────────────────────┘

function buildJSONLine2(ds){

    const minDate = getDate(ds.monthlySales[0]['month']);
    const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

    // X axis domain and range
    const xScale = d3.time.scale()
                    .domain([minDate, maxDate])
                    .range([padding + 5, width2 - padding]);
    
    // Y axis domain and range
    const yScale = d3.scale.linear()
                    .domain([0, d3.max(ds.monthlySales, function(d){return d.sales;})])
                    .range([height2 - padding, 10]);

    const xAxisGen = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.time.format("%b"));
    const yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

    // Line function
    const lineFun = d3.svg.line()
    .x(function(d){return xScale(getDate(d.month));})
    .y(function(d){return yScale(d.sales);})
    .interpolate("linear");

    // Append svg to tag
    const svg = d3.select("#scaling")
            .append("svg")
            .attr({
            width: width2,
            height: height2
    });

    const yAxis = svg.append("g").call(yAxisGen)
                    .attr("class", "axis")
                    .attr("transform", "translate(" + padding + ", 0)");

    const xAxis =  svg.append("g").call(xAxisGen)
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (height2-padding) + ")");

    // Append visuals to svg
    const viz = svg.append("path")
                .attr({
                d: lineFun(ds.monthlySales),
                    "stroke": "purple",
                    "stroke-width": 2,
                    "fill": "none"
                });
}

// ┌──────────────────────────┐
// │   Show Header Function   │	
// └──────────────────────────┘

function showHeader2(ds) {
    d3.select("#scaling").append("h1")
                    .text(ds.category + " Sales (2013)");
}

// ┌───────────────────────────┐
// │   Read Data then Append   │	
// └───────────────────────────┘

d3.json(apiUrl2, function(error, data){

    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

    const decodedData = JSON.parse(window.atob(data.content));
    console.log(decodedData.contents[0].monthlySales[0]);
    console.log(decodedData.contents[1]);

    decodedData.contents.forEach(function(ds){
        showHeader2(ds);
        buildJSONLine2(ds);
    })
});