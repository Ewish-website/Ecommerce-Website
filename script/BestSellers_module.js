import {
      appendCardsBestSellers
  } from "../script/productHome.js"
  
  
  var productsData; //All data in the json file
  fetch("../script/products.json")
    .then(function (response) {
      let jsonData = response.json();
      //console.log(jsonData);
      return jsonData;
    })
    .then(function (jsonData) {
      productsData = jsonData.products;
      appendCardsBestSellers(productsData);
      return productsData;
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  
  export { productsData };