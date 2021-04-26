# d3-api-data-source

### References

1. [Data.gov](data.gov)
2. [API used in this project](https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json)
3. [API Repo](https://github.com/bsullins/d3js-resources)
4. [Window.atob()](https://www.w3schools.com/jsref/met_win_atob.asp)

### Getting Data From Web APIs with D3

* Web APIs are generally also known as a REST APIs
* APIs are ways to get data, ways to interface with other programs, other pieces of software or libraries
* Interacting with other programs
* Example: .NET can talk to PHP through APIs

**USING REST APIs**
1. Send in a URL request for data
2. Sends back result
3. Parse Data

### Steps Used In This Project

### `Step 1`

Reference external file by calling API to get data

```javascript
const apiUrl = "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json"

d3.json(apiUrl, function(error, data){
    console.log(data);
});
```

### `Step 2`

Decode data

```javascript
d3.json(apiUrl, function(error, data){
    console.log(data);

    // Decode Data
    const decodedData = JSON.parse(window.atob(data.content));
    console.log(decodedData.contents[0].monthlySales[0]);
    console.log(decodedData.contents[1]);
});
```

### `Step 3`

Build graph

```javascript
d3.json(apiUrl, function(error, data){
    console.log(data);

    // Decode Data
    const decodedData = JSON.parse(window.atob(data.content));
    console.log(decodedData.contents[0].monthlySales[0]);
    console.log(decodedData.contents[1]);

    // Build Graph
    decodedData.contents.forEach(function(ds){
        showHeader(ds);
        buildJSONLine(ds);
    })
});
```

### `Notes`


**Same Origin Policy**
* A policy built into web browsers and web servers
* When you try to access something thats external, you could be injecting or opening up your code for hacks and malicious attacks
* External: not hosted on your own domain or your own server
* *Usually* when something is labeled API, it has protocols built in to support same origin policy

![alt same origin policy image](images/same-origin-policy.png)

**About data.gov APIs**
* data.gov has simple and interesting datasets to use
* How to use: data.gov -> developer -> api -> API documentation

BLOB: binary large object
* A bit of data you want to retrieve