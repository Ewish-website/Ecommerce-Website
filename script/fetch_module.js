import {
  appendCards,
  applyFilter,
  getAllProducts,
  cardEventListner,
} from "../script/filter.js";

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
    return productsData;
  })
  .then(function (productsData) {
    /****************Filter Button***************** */
    applyFilter(productsData);
    /**********All Button******* ***************** */
    getAllProducts(productsData);
    /*************Products Details******************************* */
    cardEventListner(productsData);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

export { productsData };
