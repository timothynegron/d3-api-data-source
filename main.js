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