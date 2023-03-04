import {
  appendCards,
  applyFilter,
  getAllProducts,
  cardEventListner,
} from "../script/filter.js";

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
    appendCards(productsData);
    appendCardsBestSellers(productsData);
    return productsData;
  })
  .then(function (productsData) {
    /****************Filter Button***************** */
    applyFilter(productsData);
    /**********All Button******* ***************** */
    getAllProducts(productsData);
    /*************Products Cart******************************* */
    cardEventListner();
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

export { productsData };
